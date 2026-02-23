// features/auth/services/authServices.ts
import { http } from "@/lib/http";
import { API } from "@/config/api";
import { isAxiosError } from "axios";

export type CompleteProfileData = {
  name: string;
  family_name: string;
  mobile_number?: string;
};

export async function getProfileApi() {
  const { data } = await http.get(API.AUTH.PROFILE);
  return data;
}

export async function completeProfileApi(payload: CompleteProfileData) {
  try {
    const { data } = await http.put(API.AUTH.COMPLETE_PROFILE, payload);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 405) {
      const { data } = await http.patch(API.AUTH.COMPLETE_PROFILE, payload);
      return data;
    }
    throw error;
  }
}
