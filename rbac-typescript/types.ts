import { Request } from 'express';

export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    role: string;
    token?: string;
}

export interface AuthenticatedRequest extends Request {
    user?: { id: number };
}