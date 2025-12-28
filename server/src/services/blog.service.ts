import Joi, { ValidationError, ValidationResult } from "joi"
import blogCategoryModel from "../models/blog-category.model"
import type { BlogPost } from "../types/blog"
import { createError } from "../utils/response.util"
import blogModel from "../models/blog.model"
import shortid from "shortid"

export const existsCategory = async (id: string) => {
    const category = await blogCategoryModel.findOne({ category_id: id })
    if (!category) {
        createError(404, 'دسته بندی پیدا نشد', { statusText: 'not-found' })
    }
}

export const createBlogPost = async (userId: string, post: BlogPost) => {
    await blogModel.create({
        blog_id: shortid.generate(),
        author_id: userId,
        ...post
    })
}

export const blogPostValidatation = (body: BlogPost): ValidationResult => {
    const validate = Joi.object({
        title: Joi.string().required().empty().messages({
            'string.empty': 'عنوان پست را وارد کنید',
            'any.required': 'عنوان پست را وارد کنید'
        }),
        status: Joi.string().required().empty().valid('published', 'draft', 'disable').messages({
            'any.required': 'وضعیت پست را وارد کنید',
            'any.only': 'وضعیت پست به درستی درج شود',
            'string.empty': 'وضعیت پست را وارد کنید'
        }),
        category: Joi.string().required().empty().messages({
            'any.required': 'دسته بندی پست را وارد کنید',
            'string.empty': 'دسته بندی پست را وارد کنید'
        }),
        description: Joi.string().required().messages({
            'any.required': 'توضیحات کوتاه مقاله را وارد کنید',
            'string.empty': 'توضیحات کوتاه مقاله را وارد کنید'
        }),
        body: Joi.string().required().messages({
            'any.required': 'محتوای اصلی مقاله را وارد کنید',
            'string.empty': 'محتوای اصلی مقاله را وارد کنید'
        })
    }).validate(body, { abortEarly: true, allowUnknown: false })


    if (validate.error) {
        if (validate.error.details.length > 0) {
            createError(400, 'خطای اعتبار سنجی', {
                statusText: 'bad-request',
                data: {
                    errors: validate.error.details
                }
            })
        }
    }

    return validate
} 