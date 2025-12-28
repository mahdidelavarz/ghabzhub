import type { NextFunction, Response } from "express";
import type { PartialRequest } from "../../types/request";
import blogModel from "../../models/blog.model";
import { createError, createResponse } from "../../utils/response.util";
import { blogPostValidatation } from "../../services/blog.service";
import { BlogPost } from "../../types/blog";

async function updateBlogPost(req: PartialRequest, res: Response, next: NextFunction) {
    try {
        const blogId = req.params.id,
            body: BlogPost = req.body;

        // validation
        blogPostValidatation(body)
        const post = await blogModel.findOne({ blog_id: blogId })
        if (!post) {
            createError(404, 'پستی یافت نشد', {
                statusText: 'bad-request'
            })
        }
        // update post
        await blogModel.findOneAndUpdate(
            { blog_id: blogId },
            {
                $set: {
                    ...body
                }
            }
        )

        res.status(201).json(
            createResponse({ code: 201, text: 'UPDATED' }, 'به روز رسانی انجام شد', {})
        )
    } catch (err) {
        next(err)
    }
}

export default updateBlogPost