import type { Response, NextFunction } from "express";
import type { PartialRequest } from "../../types/request";
import { createError, createResponse } from "../../utils/response.util";
import blogCategoryModel from "../../models/blog-category.model"
import shortid from "shortid";
import { existsCategory } from "../../services/blog.service";
import { getCollection } from "../../services/collection.service";

export const createCategory = async (req: PartialRequest, res: Response, next: NextFunction) => {
    try {
        const label = req.body?.label
        if (!label) {
            createError(400, 'یک عنوان برای دسته بندی خود قرار دهید', { statusText: "bad-request" })
        }

        await blogCategoryModel.create({
            category_id: shortid.generate(),
            label
        })
        res.status(201).json(
            createResponse(
                { code: 201, text: 'CREATED' },
                `دسته بندی با عنوان ${label} ایجاد شد`
            )
        )
    } catch (err) {
        next(err)
    }
}

export const editCategory = async (req: PartialRequest, res: Response, next: NextFunction) => {
    try {
        const label = req.body.label,
            id = req.params.id
        if (!label) {
            createError(400, 'یک عنوان برای دسته بندی خود قرار دهید', { statusText: "bad-request" })
        }
        await existsCategory(String(id))
        await blogCategoryModel.findOneAndUpdate({ category_id: id }, { $set: { label } })
        res.status(201).json(
            createResponse(
                { code: 201, text: 'UPDATED' },
                'دسته بندی به روز رسانی شد'
            )
        )
    } catch (err) {
        next(err)
    }
}

export const getCategories = async (req: PartialRequest, res: Response, next: NextFunction) => {
    try {
        const sort = req.query.sort === 'asc' ? 1 : -1,
            page = req.query.page || 1,
            limit = req.query.limit || 0;

        const categories = await getCollection(blogCategoryModel, +limit, +page, sort)
        res.status(201).json(
            createResponse(
                { code: 201, text: "GET" },
                'دسته بندی ها',
                {
                    categories
                }
            )
        )
    } catch (err) {
        next(err)
    }
}

export const deleteCategory = async (req: PartialRequest, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        await existsCategory(String(id))
        const deletedCategory = await blogCategoryModel.findOneAndDelete({ category_id: id }, {new: true})
        res.status(201).json(
            createResponse(
                { code: 201, text: 'DELETED' },
                `دسته بندی با عنوان ${deletedCategory?.label} حذف شد`
            )
        )
    } catch (err) {
        next(err)
    }
}