// features/auth/services/authServices.ts

import { http } from "@/lib/http";


export async function logoutApi() {
  await http.post("/auth/logout"); // backend endpoint
}