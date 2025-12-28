import { Schema, model } from "mongoose"

const commentSchema = new Schema({
    message_id: { type: String, required: true },
    message: String,
    replay: String,
    replay_id: String,
    confirm: {
        type: Boolean,
        default: true
    }
})
const schema = new Schema({
    blog_id: {
        type: String,
        required: true
    },
    title: String,
    category: {
        type: String,
        required: true
    },
    author_id: {
        type: String,
        required: true
    },
    comments: {
        type: [commentSchema],
        default: []
    },
    body: String,
    description: String,
    status: {
        type: String,
        required: true,
        enum: ['published', 'draft', 'disable']
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    }
})

export default model("Post", schema)