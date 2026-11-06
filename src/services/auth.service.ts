import {ADMIN_TOKEN,ADMIN_USER,verifyAdminCredentials,normalizePhone,sessionUser} from "./role-policy";
import {accountService} from "./account.service";
import { setAuthToken } from "@/lib/api";
import {
  AuthResponse,
  LoginDto,
  OtpRequestDto,
  OtpResponse,
  OtpVerifyDto,
  OtpVerifyResponse,
  RegisterDto,
  User,
} from "@/types";

const MOCK_USER: User = {
  id: "1",
  name: "هم‌سفر گیلانه",
  phone: "+989123456789",
  role: "user",
  avatar:
    "/images/avatar.jpg",
};

const MOCK_TOKEN = "mock_token_12345";

function rememberUser(user: User) {
  accountService.remember(user);
  sessionStorage.setItem("gilaneh-mock-user", JSON.stringify(user));
  return user;
}

// In-memory OTP store (mock backend). In production, this lives on the server.
let currentOtpCode: string | null = null;
let currentOtpPhone: string | null = null;
let otpExpiresAt=0;
let verifiedPhone:string|null=null;

// Helper: generate a random 6-digit code
function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export const authService = {
  validateCredentials: async (dto: LoginDto, action:'login'|'register'='login'):Promise<void> => {
    const phone=normalizePhone(dto.phone);
    if(phone===ADMIN_USER.phone){
      if(action==='register')throw Error("این شماره حساب مدیریت است؛ از صفحه ورود استفاده کنید.");
      if(!verifyAdminCredentials(phone,dto.password))throw Error("شماره موبایل یا رمز عبور درست نیست.");
    }else accountService.assertActive(phone);
  },
  login: async (dto: LoginDto): Promise<AuthResponse> => {
    const phone=normalizePhone(dto.phone);
    await authService.validateCredentials({...dto,phone});
    if(phone===ADMIN_USER.phone){
      if(verifiedPhone!==phone||Date.now()>otpExpiresAt)throw Error("ابتدا کد تأیید شماره موبایل را وارد کنید.");
      verifiedPhone=null;currentOtpCode=null;
      const user=rememberUser({...ADMIN_USER});setAuthToken(ADMIN_TOKEN);return {user,token:ADMIN_TOKEN};
    }
    const existing=accountService.list().find(user=>user.phone===phone);
    const user=rememberUser({...MOCK_USER,...existing,phone,role:'user'});
    setAuthToken(MOCK_TOKEN);return {user,token:MOCK_TOKEN};
  },
  register: async (dto: RegisterDto): Promise<AuthResponse> => {
    dto={...dto,phone:normalizePhone(dto.phone)};
    if(dto.phone===ADMIN_USER.phone)throw Error("این شماره حساب مدیریت است؛ از صفحه ورود استفاده کنید.");
    accountService.assertActive(dto.phone);
    const user=rememberUser({...MOCK_USER,id:dto.phone,phone:dto.phone,name:dto.name,role:'user'});
    setAuthToken(MOCK_TOKEN);return {user,token:MOCK_TOKEN};
  },

  sendOtp: async (dto: OtpRequestDto): Promise<OtpResponse> => {
    dto={...dto,phone:normalizePhone(dto.phone)};
    if(dto.phone!==ADMIN_USER.phone)accountService.assertActive(dto.phone);
    verifiedPhone=null;
    return new Promise((resolve) => {
      setTimeout(() => {
        const code = generateOtp();
        currentOtpCode = code;
        currentOtpPhone = dto.phone;
        otpExpiresAt=Date.now()+5*60*1000;

        // In mock mode we include the code so the UI can auto-fill it for testing.
        // In production this field would be omitted by the API.
        resolve({
          code,
          message: "کد تأیید 6 رقمی به شماره‌ی همراه شما ارسال شد.",
        });
      }, 800);
    });
  },

  verifyOtp: async (dto: OtpVerifyDto): Promise<OtpVerifyResponse> => {
    dto={...dto,phone:normalizePhone(dto.phone)};
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check that an OTP was requested for this phone
        if (currentOtpPhone !== dto.phone||Date.now()>otpExpiresAt) {
          reject(new Error("کد تأیید برای این شماره درخواست نشده است. لطفاً مجدداً درخواست کنید."));
          return;
        }

        // Verify the code
        if (dto.code !== currentOtpCode) {
          reject(new Error("کد تأیید نامعتبر است. لطفاً دوباره تلاش کنید."));
          return;
        }

        verifiedPhone=currentOtpPhone;
        resolve({
          verified: true,
          message: "کد تأیید با موفقیت تأیید شد.",
        });
      }, 600);
    });
  },

  forgotPassword: async (phone: string): Promise<{ message: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          message: "کد تأیید به شماره‌ی شما ارسال شد",
        });
      }, 600);
    });
  },

  logout: async (): Promise<void> => {
    verifiedPhone=null;currentOtpCode=null;currentOtpPhone=null;
    sessionStorage.removeItem("gilaneh-mock-user");
    setAuthToken(null);
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 300);
    });
  },

  me: async (): Promise<User> => {
    const user=sessionUser();if(!user)throw Error("نشست ورود معتبر نیست.");
    if(user.role!=='admin')accountService.assertActive(user.phone);
    return user;
  },
};
