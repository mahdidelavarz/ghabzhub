import { API } from "@/config/api";
import { http } from "@/lib/http";
import { PNEIdentifierPayload } from "../types/plateNumberTypes";

export const PNEIdentifierService = async (data: PNEIdentifierPayload): Promise<any> => {
  const res = await http.post(API.PNE.PNE_IDENTIFIER, data);
  return res.data;
};