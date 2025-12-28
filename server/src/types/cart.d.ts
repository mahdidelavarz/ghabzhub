export interface BillCartItem {
    estimated_amount?: number;
    amount?: number;
}

export interface BillCartDocument extends Document {
    items: (BillCartItem & Document)[]; // Items is an array of sub-documents
    total_estimated_amount: number;
    updated_at: Date;
}