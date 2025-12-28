import { Schema, model } from "mongoose";
const schema = new Schema({
    id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: String
    },
    balance: {
        type: Number, // Rial currency
        default: 0
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

export default model("Wallet", schema)