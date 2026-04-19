import { API } from "@/config/api";
import { http } from "@/lib/http";
import { 
  RegisterPayload, 
  RegisterResponse, 
  VerifyOtpResponse,
  LoginPayload,
  LoginResponse,
  CompleteProfilePayload,
  CompleteProfileResponse
} from "../types/authTypes";
import { isAxiosError } from "axios";

export const registerService = async (data: RegisterPayload): Promise<RegisterResponse> => {
  const res = await http.post(API.AUTH.REGISTER, data);
  return res.data;
};

export const verifyOtpService = async (mobile_number: string, code: string): Promise<VerifyOtpResponse> => {
  const res = await http.post(`${API.AUTH.VERIFY_OTP}?mobile_number=${mobile_number}&code=${code}`);
  return res.data;
};

export const resendOtpService = async (mobile_number: string): Promise<{ detail: string }> => {
  const res = await http.post(API.AUTH.SEND_OTP, { mobile_number });
  return res.data;
};

export const loginService = async (data: LoginPayload): Promise<LoginResponse> => {
  const res = await http.post(API.AUTH.LOGIN, data);
  return res.data;
};

export const getProfileService = async () => {
  const res = await http.get(API.AUTH.PROFILE);
  return res.data;
};

export const completeProfileService = async (payload: CompleteProfilePayload): Promise<CompleteProfileResponse> => {
  try {
    const res = await http.put(API.AUTH.COMPLETE_PROFILE, payload);
    return res.data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 405) {
      const res = await http.patch(API.AUTH.COMPLETE_PROFILE, payload);
      return res.data;
    }
    throw error;
  }
};

export async function logoutApi() {
  await http.get("auth/logout");
}