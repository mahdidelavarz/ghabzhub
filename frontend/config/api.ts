const API_BASE = process.env.NEXT_PUBLIC_URL;

if (!API_BASE) {
  throw new Error('NEXT_PUBLIC_URL is not defined in .env.local');
}

export const API = {
  BASE: API_BASE,

  AUTH: {
    REGISTER: `${API_BASE}/auth/register`,
    LOGIN: `${API_BASE}/auth/login`,
    VERIFY_OTP: `${API_BASE}/auth/verify-otp`,
    SEND_OTP: `${API_BASE}/auth/send-otp`,
    COMPLETE_PROFILE: `${API_BASE}/profile`,
    LOGOUT: `${API_BASE}/auth/logout`,
    PROFILE: `${API_BASE}/me`,
  },
  PNE: {
    GET_PRICE: `${API_BASE}/prices`,
    GET_PAYMENT_URL: `${API_BASE}/ipg/create?service_name=pelak_codeMeli&payment_method=gateway`,
    PNE_RESULT: (orderId: string) => `${API_BASE}/order/${orderId}/result`
  }
};