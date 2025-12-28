import sharp from "sharp"
import fs from "fs"
import { UploadFile } from "../types/media"
import { createError } from "../utils/response.util"
import shortid from "shortid"
import photosModel from "../models/photos.model"

export const checkFileExtentions = (allowExt: string[], ext: string) => {
    if (!allowExt.includes(ext)) {
        createError(400, 'از فایل های مجاز و توصیه شده استفاده کنید', {})
    }
}

export const checkFileSize = (fileSize: number, targetSize: number) => {
    if (fileSize > targetSize) {
        createError(400, `حجم فایل وارد شده نباید از ${targetSize / 1_000_000} Mb باشد`, {})
    }
}

export const createImageCollection = async (src: string, path: string[]) => {
    await photosModel.create({
        id: shortid.generate(),
        path: src,
        dir: path
    })
}
export const uploadF = async (file: UploadFile, folder: string) => {
    if (!fs.existsSync(`./public/${folder}`)) {
        fs.mkdirSync(`./public/${folder}`)
    }
    if (['image/png', 'image/jpeg', 'image/webp'].includes(file.mimetype)) {
        const imageName = `${shortid.generate()}.${file.mimetype.split('/')[1]}`
        switch (file.mimetype) {
            case 'image/png':
                await sharp(file.data, {}).png({ quality: 60 }).toFile(`./public/${folder}/${imageName}`)
                break;
            case 'image/jpeg':
                await sharp(file.data, {}).jpeg({ quality: 80 }).toFile(`./public/${folder}/${imageName}`)
                break;
            case 'image/webp':
                await sharp(file.data, {}).webp({ quality: 50 }).toFile(`./public/${folder}/${imageName}`)
                break;
        }
        await createImageCollection(`${process.env.URL}/${folder}/${imageName}`, `public/${folder}/${imageName}`.split('/'))
    } else {
        // other files
    }
}

export const deleteFile = async (id: string, collection: any) => {
    const file = await collection.findOne({ id })
    if (!file) {
        createError(404, 'فایلی پیدا نشد', {
            statusText: "not-found"
        })
    }
    
    const path = `./${file?.dir.join("/")}`
    if (!fs.existsSync(path)) {
        createError(404, 'فایلی در مسیر مشخص شده یافت نشد', {
            statusText: "not-found"
        })
    }

    fs.unlink(path, async (err) => {
        if (err)
            createError(404 ,'فایلی پیدا نشد', {})

        await collection.findOneAndDelete({ id })
    })
}