// features/auth/services/loginService.ts
import { http } from "@/lib/http";
import { API } from "@/config/api";

export type LoginPayload = {
  mobile_number: string;
  password: string;
};

export type LoginUser = {
  id: number;
  name: string;
  family_name: string;
  mobile_number?: string;
  mobile?: string;
};

type LoginResponse = {
  access_token: string;
  user?: LoginUser;
};

export const loginApi = async (data: LoginPayload): Promise<LoginResponse> => {
  const res = await http.post(API.AUTH.LOGIN, data);
  return res.data;
};
