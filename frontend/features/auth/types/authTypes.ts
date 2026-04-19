export interface RegisterPayload {
  mobile_number: string;
  password: string;
}

export interface RegisterResponse {
  requires_verification: boolean;
  detail?: string;
}

export interface VerifyOtpPayload {
  mobile_number: string;
  code: string;
}

export interface VerifyOtpResponse {
  detail: string;
}

export interface LoginPayload {
  mobile_number: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user?: {
    id: number;
    name: string;
    family_name: string;
    mobile_number?: string;
    mobile?: string;
  };
}

export interface CompleteProfilePayload {
  name: string;
  family_name: string;
  mobile_number?: string;
}

export interface CompleteProfileResponse {
  id: number;
  name: string;
  family_name: string;
  mobile_number: string;
}