import { Response, NextFunction } from "express";
import { PartialRequest } from "../../types/request";
import { createError, createResponse } from "../../utils/response.util";
import { UploadFile } from "../../types/media";
import { checkFileExtentions, checkFileSize, uploadF } from "../../services/media.service";

async function uploadPhotos (req: PartialRequest, res: Response, next: NextFunction) {
    try {
        const image = req.files?.image as UploadFile
        
        if (!image) {
            createError(400, 'یک عکس را برای بارگذاری انتخاب کنید ', {})
        }
        // check file mimetype
        checkFileExtentions(['image/png', 'image/jpeg' ,'image/webp'], image.mimetype)
        checkFileSize(image.size, 2_500_000)
        await uploadF(image, 'photos')

        res.status(201).json(
            createResponse(
                {code: 201, text: "CREATED"},
                'بارگذاری شد'
            )
        )

    } catch(err) {
        next(err)
    }
}

export default uploadPhotos