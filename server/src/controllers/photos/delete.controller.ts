import { Response, NextFunction } from "express";
import { PartialRequest } from "../../types/request";
import { createResponse } from "../../utils/response.util";
import { deleteFile } from "../../services/media.service";
import photosModel from "../../models/photos.model";
async function removeFile (req: PartialRequest, res: Response, next: NextFunction) {
    try {
        const id = req.params.id
        // delete file
        await deleteFile(String(id), photosModel)
        res.status(201).json(
            createResponse(
                {code: 201, text: 'DELETED'},
                'فایل حذف شد'
            )
        )
    } catch(err) {
        next(err)
    }
}

export default removeFile