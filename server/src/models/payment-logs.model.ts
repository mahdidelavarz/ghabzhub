import { Schema, model } from "mongoose";
const schema = new Schema({
    id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    amount: {type: String, required: true},
    status: {
        type: String,
        required: true,
        enum: ['pending', 'success', 'failed']
    },
    trackId: {
        type: String,
        required: true
    },
    reference_id: {
        type: String,
        required: true
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

export default model("Payment-Log", schema)