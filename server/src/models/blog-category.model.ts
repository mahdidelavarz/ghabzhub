import { Schema, model } from "mongoose";

const schema = new Schema({
    category_id: {
        type: String, // short id
        required: true
    },
    label: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})

export default model("Blog-Category" , schema)