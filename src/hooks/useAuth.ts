"use client";

import { useState, useCallback, useEffect } from "react";
import { User, LoginDto, RegisterDto } from "@/types";
import { authService } from "@/services/auth.service";
import { setAuthToken, getAuthToken } from "@/lib/api";

export type OtpAction = "login" | "register";

interface OtpFlowState {
  isActive: boolean;
  phone: string;
  action: OtpAction;
  credentials: LoginDto | RegisterDto;
  otpCode?: string; // mock-only: returned from sendOtp so UI can auto-fill for testing
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [otpFlow, setOtpFlow] = useState<OtpFlowState | null>(null);

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      authService
        .me()
        .then(setUser)
        .catch(() => setAuthToken(null))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // --- Direct login (no OTP) — kept for backwards compatibility ---

  const login = useCallback(async (phone: string, password: string) => {
    setLoading(true);
    try {
      const { user } = await authService.login({ phone, password });
      setUser(user);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(
    async (data: {
      name: string;
      phone: string;
      password: string;
      password_confirmation: string;
    }) => {
      setLoading(true);
      try {
        const { user } = await authService.register(data);
        setUser(user);
        return { success: true };
      } catch (error: any) {
        return { success: false, error: error.message };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // --- OTP flow ---

  const sendOtp = useCallback(
    async (
      phone: string,
      action: OtpAction,
      credentials: LoginDto | RegisterDto
    ) => {
      setLoading(true);
      try {
        const response = await authService.sendOtp({ phone });
        setOtpFlow({
          isActive: true,
          phone,
          action,
          credentials,
          otpCode: response.code, // mock-only
        });
        return { success: true, message: response.message };
      } catch (error: any) {
        return { success: false, error: error.message };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const verifyOtp = useCallback(
    async (code: string) => {
      if (!otpFlow) {
        return { success: false, error: "هیچ جریان OTP فعالی یافت نشد." };
      }
      setLoading(true);
      try {
        await authService.verifyOtp({ phone: otpFlow.phone, code });

        // OTP verified — now perform the actual login/register
        if (otpFlow.action === "login") {
          const { user } = await authService.login(
            otpFlow.credentials as LoginDto
          );
          setUser(user);
        } else {
          const { user } = await authService.register(
            otpFlow.credentials as RegisterDto
          );
          setUser(user);
        }

        // Clean up OTP flow
        setOtpFlow(null);
        return { success: true };
      } catch (error: any) {
        return { success: false, error: error.message };
      } finally {
        setLoading(false);
      }
    },
    [otpFlow]
  );

  const cancelOtp = useCallback(() => {
    setOtpFlow(null);
  }, []);

  // --- Other methods ---

  const forgotPassword = useCallback(async (phone: string) => {
    setLoading(true);
    try {
      await authService.forgotPassword(phone);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
      setOtpFlow(null);
      return { success: true };
    } catch (error: any) {
      setUser(null);
      setOtpFlow(null);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    loading,
    isAuthenticated: !!user,
    otpFlow,
    sendOtp,
    verifyOtp,
    cancelOtp,
    login,
    register,
    forgotPassword,
    logout,
  };
}