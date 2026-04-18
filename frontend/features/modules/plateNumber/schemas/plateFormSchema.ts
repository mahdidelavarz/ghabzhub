import { z } from "zod";

export const plateFormSchema = z.object({
  nationalNumber: z
    .string()
    .min(10, "کد ملی باید 10 رقم باشد")
    .max(10, "کد ملی باید 10 رقم باشد")
    .regex(/^\d+$/, "کد ملی باید فقط شامل اعداد باشد"),
  phoneNumber: z
    .string()
    .min(11, "شماره موبایل باید 11 رقم باشد")
    .max(11, "شماره موبایل باید 11 رقم باشد")
    .regex(/^09\d{9}$/, "شماره موبایل نامعتبر است"),
});

export type PlateFormData = z.infer<typeof plateFormSchema>;