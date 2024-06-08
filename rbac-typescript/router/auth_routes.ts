import "dotenv/config";
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import connection from "../connection.ts";

// dotenv.config();
const router = express.Router();

// declare var process : {
//     env: {
//       JWT_SECRET: string
//     }
// }

// interface processEnv {
//     [key: string]: string | undefined;
// }

router.post("/signup", async (req: Request, res: Response) => {
    const { username, email, password }: { username: string, email: string, password: string } = req.body;
    try {
        if (!(username && email && password)) {
            return res.status(400).send("All input is required");
        }
        connection.query(
            "SELECT * FROM users WHERE username = ? OR email = ?",
            [username, email],
            async (err, result) => {
                if (err) {
                    console.error(err);
                }
                if (result.length > 0) {
                    return res.status(409).send("User already exists");
                } else {
                    const hashedPassword = await bcrypt.hash(password, 10);
                    connection.query(
                        "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
                        [username, email, hashedPassword, "user"],
                        (err, result) => {
                            if (err) {
                                console.error(err);
                            }

                            return res.status(201).send("User signed up successfully");
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
            async (err, results) => {
                if (err) {
                    return res.status(500).send("Server error");
                }
                if (results.length > 0 && (await bcrypt.compare(password, results[0].password))) {
                    const payload = {
                        id: results[0].id,
                    };
                    // const secret: string | undefined = process.env.JWT_SECRET;
                    // const secret: processEnv = process.env;
                    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
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
