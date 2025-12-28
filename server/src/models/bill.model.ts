import { Schema, Types, model } from "mongoose";

const itemsSchema = new Schema({
    id: String,
    bill_id: {
        type: String,
        required: true
    },
    payment_id: {
        type: String,
        required: true
    },
    service: String,
    details: {
        type: Schema.Types.Mixed,
        default: {}
    },
    label: String,
    amount: String,
    paid: {
        type: Boolean,
        default: false
    },
    saved_at: Date,
    paid_at: Date,
})
const schema = new Schema({
    id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    items: {
        type: [itemsSchema],
        default: [] 
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

export default model("Bill", schema)