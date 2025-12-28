import { Schema, model } from "mongoose";
import uuid from "uuid"

const schema = new Schema({
    id: {
        type: String,
        required: true
    },
    path: String,
    dir: Array
})

schema.pre('save', function () {
    this.id = uuid.v4()
})

export default model("Media-Photos" , schema)