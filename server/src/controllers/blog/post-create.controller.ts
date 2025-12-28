import { Response, NextFunction } from "express";
import { PartialRequest } from "../../types/request";
import { BlogPost } from "../../types/blog";
import { blogPostValidatation, createBlogPost } from "../../services/blog.service";
import Joi from "joi"
import { createError, createResponse } from "../../utils/response.util";

async function createPost(req: PartialRequest, res: Response, next: NextFunction) {
    try {
        const body: BlogPost = req.body;
        // validation
        blogPostValidatation(body)
        await createBlogPost(req.userId, body)
        res.status(201).json(
            createResponse(
                { code: 201, text: 'CREATED' },
                `یک پست با موفقیت ساخته شد`
            )
        )
    } catch (err) {
        next(err)
    }
}

export default createPost