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
  name: "مدیر سیستم",
  phone: "+989123456789",
  role: "admin",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
};

const MOCK_TOKEN = "mock_token_12345";

// In-memory OTP store (mock backend). In production, this lives on the server.
let currentOtpCode: string | null = null;
let currentOtpPhone: string | null = null;

// Helper: generate a random 6-digit code
function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export const authService = {
  login: async (dto: LoginDto): Promise<AuthResponse> => {
    // Mock: always succeeds
    return new Promise((resolve) => {
      setTimeout(() => {
        setAuthToken(MOCK_TOKEN);
        resolve({
          user: MOCK_USER,
          token: MOCK_TOKEN,
        });
      }, 600);
    });
  },

  register: async (dto: RegisterDto): Promise<AuthResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setAuthToken(MOCK_TOKEN);
        resolve({
          user: { ...MOCK_USER, phone: dto.phone, name: dto.name },
          token: MOCK_TOKEN,
        });
      }, 600);
    });
  },

  sendOtp: async (dto: OtpRequestDto): Promise<OtpResponse> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate occasional failure ~10% of the time
        if (Math.random() < 0.1) {
          reject(new Error("خطا در ارسال کد تأیید. لطفاً دوباره تلاش کنید."));
          return;
        }
        const code = generateOtp();
        currentOtpCode = code;
        currentOtpPhone = dto.phone;

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
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check that an OTP was requested for this phone
        if (currentOtpPhone !== dto.phone) {
          reject(new Error("کد تأیید برای این شماره درخواست نشده است. لطفاً مجدداً درخواست کنید."));
          return;
        }

        // Verify the code
        if (dto.code !== currentOtpCode) {
          reject(new Error("کد تأیید نامعتبر است. لطفاً دوباره تلاش کنید."));
          return;
        }

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
    setAuthToken(null);
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 300);
    });
  },

  me: async (): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_USER), 400);
    });
  },
};