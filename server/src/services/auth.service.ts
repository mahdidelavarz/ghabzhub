import { AdminBody } from "../types/auth";
import Joi, { ValidationError, ValidationResult } from "joi"
export const validateAdminBody = (body: AdminBody): ValidationResult => {
    return Joi.object({
        name: Joi.string().required().empty().messages({
            'string.empty': 'نام ادمین الزامی است',
            'any.required': 'نام الزامی است'
        }),
        family: Joi.string().required().empty().messages({
            'string.empty': 'فامیلی خود را وارد کنید',
            'any.required': 'فامیلی الزامی است'
        }),
        username: Joi.string()
            .required()
            .min(3)
            .max(30)
            .pattern(new RegExp(/^[a-zA-Z0-9_.-]+$/))
            .messages({
                'any.required': 'نام کاربری اجباری است.',
                'string.empty': 'نام کاربری نمی‌تواند خالی باشد.',
                'string.min': 'نام کاربری حداقل باید {{#limit}} کاراکتر باشد.',
                'string.max': 'نام کاربری حداکثر می‌تواند {{#limit}} کاراکتر باشد.',
                'string.pattern.base': 'نام کاربری فقط می‌تواند شامل حروف انگلیسی، اعداد، زیرخط (_) و خط تیره (-) باشد.'
            }),
        email: Joi.string().required().empty().email().messages({
            'string.empty': 'ایمیل الزامی است',
            'string.email': 'ایمیل را به درستی وارد کنید',
            'any.required': 'ایمیل الزامی است'
        }),
        password: Joi.string().required().empty().min(8).messages({
            'string.empty': 'رمز عبور را وارد کنید',
            'string.min': 'رمز عبور نباید کمتر از 8 کاراکتر باشد',
            'any.required': 'رمز عبور الزامی است'
        }),
        role: Joi.string().required().empty().valid('admin', 'super-admin').messages({
            'any.only': 'نقش مدیر را به درستی بین مدیر و مدیر کل انتخاب کنید',
            'string.empty': 'نقش مدیر را وارد کنید',
            'any.required': 'نقش مدیر الزامی است'
        }),
        accessLevel: Joi.string().required().empty().valid('finance', 'content-management', 'biling', 'general', 'support').messages({
            'string.empty': 'دسترسی و نقش مستقیم را برای مدیر تعیین کنید',
            'any.only': 'نقش های معتبر را وارد کنید',
            'any.required': 'سطح دسترسی الزامی است'
        })
    }).validate(body, { abortEarly: true, allowUnknown: false })
}