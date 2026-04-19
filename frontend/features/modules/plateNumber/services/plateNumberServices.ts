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

export const getPaymentUrlService = async (amount: number): Promise<{ payment_url: string; order_id: number }> => {
  const res = await http.post(API.PNE.GET_PAYMENT_URL, {
    service_name: "pelak_codeMeli",
    payment_method: "gateway",
    input_data: {
      amount: amount,
      currency: "USD"
    }
  });
  return res.data;
};