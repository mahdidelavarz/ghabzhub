import { API } from "@/config/api";
import { http } from "@/lib/http";

export const PNEResultService = async (orderId: string): Promise<any> => {
  const res = await http.get(API.PNE.PNE_RESULT(orderId));
  console.log(res.data.result , 'result in service')
  return res.data;
};

export const getPriceService = async (): Promise<{ price: number }> => {
  const res = await http.post(API.PNE.GET_PRICE, {
    service_name: "pelak_codeMeli"
  });
  return res.data;
};

export const getPaymentUrlService = async (nationalCode: string): Promise<{ payment_url: string; order_id: number }> => {
  const res = await http.post(API.PNE.GET_PAYMENT_URL, {
    service_name: "pelak_codeMeli",
    payment_method: "gateway",
    input_data: {
      meliCode: nationalCode,
    }
  });
  return res.data;
};
