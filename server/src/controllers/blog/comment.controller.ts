import type { Response, NextFunction } from "express"
import type { PartialRequest } from "../../types/request"
import { createError, createResponse } from "../../utils/response.util"
import blogModel from "../../models/blog.model"
import shortid from "shortid"
import { stat } from "fs"

export const createComment = async (req: PartialRequest, res: Response, next: NextFunction) => {
    try {
        const body: {
            message: string
        } = req.body || { message: '' },
            id = req.params.id;

        if (!body.message) {
            createError(
                400,
                'نظر خود را وارد کنید',
                {
                    statusText: "bad-request"
                }
            )
        }

        const post = await blogModel.findOne({ blog_id: id })
        if (!post) {
            createError(404, 'نظرات خود را در پست مربوطه قرار دهید', { statusText: 'not-found' })
        }
        // create comment
        await blogModel.findOneAndUpdate(
            { blog_id: id },
            {
                $push: {
                    comments: {
                        message_id: shortid.generate(),
                        message: body.message
                    }
                }
            }
        )
        res.status(201).json(
            createResponse(
                { code: 201, text: 'UPDATED' },
                'نظر شما با موفقیت ثبت شد'
            )
        )
    } catch (err) {
        next(err)
    }
}

export const changeBlogCommentStatus = async (req: PartialRequest, res: Response, next: NextFunction) => {
    try {
        const postId = req.params.postId,
            commentId = req.params.commentId,
            status = req.body.status,
            post = await blogModel.findOne({
                blog_id: postId
            })

            if (!status && ![1,0].includes(status)) {
                createError(400, 'وضعیت را وارد کنید', {})
            }

        if (!post) {
            createError(404, 'نظرات خود را در پست مربوطه قرار دهید', { statusText: 'not-found' })
        }
        await blogModel.findOneAndUpdate(
            { blog_id: postId, 'comments.message_id': commentId },
            {
                $set: {
                    'comments.$.confirm': status === 1 ? true : false
                }
            }
        )

        res.status(201).json(
            createResponse(
                {code: 201, text: 'UPDATED'},
                'وضعیت کامنت تغییر کرد'
            )
        )
    } catch (err) {
        next(err)
    }
}