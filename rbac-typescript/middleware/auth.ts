import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import connection from '../connection.ts';
import { Request, Response, NextFunction } from 'express';
// import { queryCallback } from "mysql";

dotenv.config();

interface AuthenticatedRequest extends Request {
    user?: { id: string };
}

interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    role: string;
    token?: string;
}

function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const token = req.headers["x-access-token"] as string;
    if(!token) {
        return res.status(403).send("A token is required for authentication");
    } else {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
            req.user = decoded;
            next();
        } catch(err) {
            console.error(err);
            res.status(401).send("Invalid token");
        }
    }
}

function admin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const id = req.user?.id;

    connection.query(
        "SELECT role FROM users WHERE id = ?",
        [id],
        (err: Error | null, results: User[]) => {
            if(err) {
                console.error(err);
                return res.status(500).send("Server error");
            }
            if(results[0].role !== "admin") {
                return res.status(403).send("You are not authorized to access this resource");
            }
            next();
        }
    )
}

function userOnly(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const id = req.user?.id;

    connection.query(
        "SELECT role FROM users WHERE id = ?",
        [id],
        (err: Error | null, results: User[]) => {
            if(err) {
                console.error(err);
                return res.status(500).send("Server error");
            }
            if(results[0].role !== "user") {
                return res.status(403).send("You are not authorized to access this resource");
            }
            next();
        }
    )
}

export { authenticate, admin, userOnly };
