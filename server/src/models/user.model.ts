import { Schema, model } from "mongoose"

const schema = new Schema({
    id: { type: String, required: true },
    user_id: { type: String, required: true },
    name: String,
    family: String,
    phone: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        default: null
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin', 'administrator'],
    },
    is_active: {
        type: Boolean,
        default: true
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

export default model("User", schema)