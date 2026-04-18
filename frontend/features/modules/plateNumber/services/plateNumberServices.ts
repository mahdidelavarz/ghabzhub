import { API } from "@/config/api";
import { http } from "@/lib/http";
import { PNEIdentifierPayload } from "../types/plateNumberTypes";

export const PNEIdentifierService = async (data: PNEIdentifierPayload, orderId: string): Promise<any> => {
  const res = await http.post(API.PNE.PNE_RESULT(orderId), data);
  return res.data;
};

export const getPriceService = async (): Promise<{ price: number }> => {
  const res = await http.post(API.PNE.GET_PRICE, {
    service_name: "pelak_codeMeli"
  });
  return res.data;
};

export const getPaymentUrlService = async (): Promise<{ payment_url: string }> => {
  // Construct URL with query parameters
  const url = `${API.PNE.GET_PAYMENT_URL}?service_name=pelak_codeMeli&payment_method=gateway`;
  const res = await http.post(url);
  return res.data;
};