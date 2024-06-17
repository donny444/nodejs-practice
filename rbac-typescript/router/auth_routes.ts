import "dotenv/config";
import express, { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import connection from "../connection.ts";
import { User } from "../types.ts";

const router: Router = express.Router();

router.post("/signup", async (req: Request, res: Response) => {
    const { username, email, password }: { username: string, email: string, password: string } = req.body;
    try {
        if (!(username && email && password)) {
            return res.status(400).send("All input is required");
        }
        connection.query(
            "SELECT * FROM users WHERE username = ? OR email = ?",
            [username, email],
            async (err: Error | null, results: User[]) => {
                if (err) {
                    console.error(err);
                }
                if (results.length > 0) {
                    return res.status(409).send("User already exists");
                } else {
                    const hashedPassword = await bcrypt.hash(password, 10) as string;
                    connection.query(
                        "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
                        [username, email, hashedPassword, "user"],
                        (err: Error| null, results: User[]) => {
                            if (err) {
                                console.error(err);
                            }

                            return res.status(201).json(results);
                        }
                    );
                }
            }
        );
    } catch (err) {
        console.error(err);
    }
});

router.post("/signin", async (req: Request, res: Response) => {
    const { username, email, password }: { username: string, email: string, password: string } = req.body;
    try {
        if (!((username || email) && password)) {
            return res.status(400).send("All input is required");
        }
        connection.query(
            "SELECT * FROM users WHERE username = ? OR email = ?",
            [username, email],
            async (err: Error | null, results: User[]) => {
                if (err) {
                    return res.status(500).send("Server error");
                }
                if (results.length > 0 && (await bcrypt.compare(password, results[0].password))) {
                    const payload = {
                        id: results[0].id as number,
                    };
                    const token: string = jwt.sign(payload, process.env.JWT_SECRET as string, {
                        expiresIn: 60 * 60,
                    });
                    results[0].token = token;
                    return res.status(200).json(results[0]);
                } else {
                    return res.status(401).send("Invalid Credentials");
                }
            }
        );
    } catch (err) {
        console.error(err);
    }
});

export default router;
