import { model, Query, Schema, UpdateQuery } from "mongoose";
import uuid from "uuid"
import type { BillCartItem, BillCartDocument } from "../types/cart";
const billItemsSchema = new Schema({
    cart_id: {
        type: String,
        required: true
    },
    details: {
        type: Schema.Types.Mixed,
        default: {}
    },
    amount: {
        type: Number,
        required: true
    },
    externalStatus: {
        type: String,
        default: 'unpaid',
        enum: ['paid', 'unpaid']
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
const billCartSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['close', 'open']
    },
    created_at: {
        type: String,
        default: Date.now()
    },
    updated_at: {
        type: String,
        default: Date.now()
    },
    total_estimated_amount: {
        type: Number,
        default: 0
    },
    items: {
        type: [billItemsSchema],
        default: []
    }
})

billCartSchema.pre("save", function (next) {
    this.id = uuid.v4()
    this.status = 'open'

    next()
})


billCartSchema.post('findOneAndUpdate', async function (doc, next) {
    const query = this;

    if (!doc) {
        return next();
    }

    const updatedDoc = await query.model.findById(doc._id).exec();

    if (!updatedDoc) {
        return next();
    }

    // @ts-ignore
   const newTotalAmount = updatedDoc.items.reduce((total, item) => {
        const itemObj = item.toObject() as BillCartItem;
        const amount = itemObj.estimated_amount || itemObj.amount || 0;
        return +total + (+amount);
    }, 0);

   try {
        await query.model.updateOne(
            { _id: updatedDoc._id },
            {
                $set: {
                    total_estimated_amount: newTotalAmount,
                    updated_at: new Date()
                }
            }
        ).exec();
    } catch (e) {
        console.error("Error updating total_estimated_amount in post-hook:", e);
        /// @ts-ignore
        return next(e);
    }

    next();
})
export default model("Bill-Carts", billCartSchema)