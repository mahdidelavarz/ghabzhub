import * as mongoose from "mongoose"

export const connect = async (): Promise<void> => {
    try {
        const { MONGO_HOST, MONGO_PORT,MONGO_DB_NAME, MONGO_URI } = process.env,
            uri = `${MONGO_URI}${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}`
            // connect
            await mongoose.connect(uri , {})
            console.log(`✅ database connected ${MONGO_DB_NAME}`)
    } catch(err) {
        throw err
    }
}