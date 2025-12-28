import { Schema, model } from "mongoose";
const schema = new Schema({
    id: {
        type: String,
        required: true
    },
    wallet_id: {
        type: String,
        required: true
    },
    details: {
        type: Schema.Types.Array,
        default: []
    },
    trackId: {
        type: String,
        default: null
    },
    amount: {type: String, required: true},
    type: {
        type: String,
        enum: ['withdraw', 'deposit']
    },
    bill: String,
    reference_id: {
        type: String,
        default: null
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

export default model("Wallet-Transaction", schema)