import { z } from "zod";

export const registerSchema = z.object({
  mobile_number: z
    .string()
    .min(11, "شماره موبایل باید 11 رقم باشد")
    .max(11, "شماره موبایل باید 11 رقم باشد")
    .regex(/^09\d{9}$/, "شماره موبایل نامعتبر است"),
  password: z
    .string()
    .min(6, "رمز عبور باید حداقل 6 کاراکتر باشد")
    .max(20, "رمز عبور باید حداکثر 20 کاراکتر باشد"),
});

export const loginSchema = z.object({
  mobile_number: z
    .string()
    .min(11, "شماره موبایل باید 11 رقم باشد")
    .max(11, "شماره موبایل باید 11 رقم باشد")
    .regex(/^09\d{9}$/, "شماره موبایل نامعتبر است"),
  password: z
    .string()
    .min(6, "رمز عبور باید حداقل 6 کاراکتر باشد")
    .max(20, "رمز عبور باید حداکثر 20 کاراکتر باشد"),
});

export const completeProfileSchema = z.object({
  name: z
    .string()
    .min(2, "نام باید حداقل 2 کاراکتر باشد")
    .max(50, "نام باید حداکثر 50 کاراکتر باشد")
    .regex(/^[آ-یa-zA-Z\s]+$/, "نام باید فقط شامل حروف باشد"),
  family_name: z
    .string()
    .min(2, "نام خانوادگی باید حداقل 2 کاراکتر باشد")
    .max(50, "نام خانوادگی باید حداکثر 50 کاراکتر باشد")
    .regex(/^[آ-یa-zA-Z\s]+$/, "نام خانوادگی باید فقط شامل حروف باشد"),
});

export const verifyOtpSchema = z.object({
  code: z
    .string()
    .length(6, "کد تایید باید 6 رقم باشد")
    .regex(/^\d+$/, "کد تایید باید فقط شامل اعداد باشد"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type CompleteProfileFormData = z.infer<typeof completeProfileSchema>;
export type VerifyOtpFormData = z.infer<typeof verifyOtpSchema>;