import {Schema, model} from "mongoose"
const schama = new Schema({
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    family: String,
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        sparse: true,
    },
    password: {
        type: String,
        required: true
    },
    access_level: String, // finance - content-management - billing - general - support
    role: {
        type: String,
        enum: ['admin'],
        default: 'admin'
    },
    is_active: {
        type: Boolean,
        default: true
    },
    created_by_admin_id: String,
    updated_by_admin_id: String,
} ,{timestamps: true})

export default model("Admin-User", schama)