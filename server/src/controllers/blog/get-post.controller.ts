import type { Response, NextFunction } from "express";
import { PartialRequest } from "../../types/request";
import blogModel from "../../models/blog.model";
import { getCollection } from "../../services/collection.service";
import { createError, createResponse } from "../../utils/response.util";

export const getAllPosts = async (req: PartialRequest, res: Response, next: NextFunction) => {
    try {
        const sort = req.query.sort === 'asc' ? 1 : -1,
            page = req.query.page || 1,
            limit = req.query.limit || 0,
            posts = await getCollection(blogModel, +limit, +page, sort, {})

        res.status(201).json(
            createResponse(
                { code: 201, text: 'GET' },
                'پست های موجود',
                {
                    posts
                }
            )
        )
    } catch (err) {

    }
}
export const getPublishedPosts = async (req: PartialRequest, res: Response, next: NextFunction) => {
    try {
        const category = req.params.category_id,
            sort = req.query.sort === 'asc' ? 1 : -1,
            page = req.query.page || 1,
            limit = req.query.limit || 0;

        const posts =
            category ?
                await getCollection(blogModel, +limit, +page, sort, { enable: true, byRecord: { category, status: 'published' } })
                : await getCollection(blogModel, +limit, +page, sort, {enable: true, byRecord: {status: 'published'}})

                res.status(201).json(
                    createResponse(
                        {code: 201, text: 'GET'},
                        'بلاگ',
                        {
                            posts
                        }
                    )
                )
    } catch (err) {

    }
}
export const getSinglePost = async (req: PartialRequest, res: Response, next: NextFunction) => {
    try {
        const blogId = req.params.id,
            post = await getCollection(blogModel, 0, 1, 1, {
                enable: true,
                byRecord: {blog_id: blogId}
            })
            
            if (!post[0]) {
                createError(
                    404,
                    'پستی یافت نشد',
                    {statusText: 'not-found'}
                )
            }
            res.status(201).json(
                createResponse(
                    {code: 201, text: 'GET'},
                    `عنوان پست: ${post[0].title}`,
                    {post: post[0]}
                )
            )
    } catch (err) {

    }
}