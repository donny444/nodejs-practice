import "dotenv/config";
import jwt from 'jsonwebtoken';
import connection from '../connection.ts';
import { Response, NextFunction } from 'express';
import { User, AuthenticatedRequest } from "../types.ts";

function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const token = req.headers["x-access-token"] as string;
    if(!token) {
        return res.status(403).send("A token is required for authentication");
    } else {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number };
            req.user = decoded;
            next();
        } catch(err) {
            console.error(err);
            return res.status(401).send("Invalid token");
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
                return res.status(403).send("You are not authorized to access this resource"); // Admin Unauthorized
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
                return res.status(403).send("You are not authorized to access this resource"); // User-Only Unauthorized
            }
            next();
        }
    )
}

export { authenticate, admin, userOnly };