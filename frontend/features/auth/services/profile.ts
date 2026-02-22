// features/auth/services/authServices.ts
import { http } from "@/lib/http";
import { API } from "@/config/api";

export type CompleteProfileData = {
  name: string;
  family_name: string;
  mobile_number: string;
};

export async function getProfileApi() {
  const { data } = await http.get(API.AUTH.PROFILE);
  return data;
}

export async function completeProfileApi(payload: CompleteProfileData) {
  const { data } = await http.put(API.AUTH.COMPLETE_PROFILE, payload);
  return data;
}