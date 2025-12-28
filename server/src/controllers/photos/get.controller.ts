import { Response, NextFunction } from "express";
import { PartialRequest } from "../../types/request";
import { getCollection } from "../../services/collection.service";
import photosModel from "../../models/photos.model";
import { createResponse } from "../../utils/response.util";

export const getPhotos = async (req: PartialRequest, res: Response, next: NextFunction) => {
    try {
        const sort = req.query.sort === 'asc' ? 1 : -1,
            page = req.query.page || 1,
            limit = req.query.limit || 0;

        const photos = await getCollection(photosModel, +limit, +page, sort)
        res.status(201).json(
            createResponse(
                { code: 201, text: 'GET' },
                'لیست تصاویر',
                {
                    photos
                }
            )
        )
    } catch (err) {
        next(err)
    }
}