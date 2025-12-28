import { Request } from "express";
export interface PartialRequest extends Request {
    userId: string,
    role: 'user' | 'admin',
    id: string,
    level?: string
}