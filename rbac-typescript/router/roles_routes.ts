import express, { Request, Response, Router } from "express";
import { authenticate, admin, userOnly } from "../middleware/auth.ts";

const router: Router = express.Router();


router.get("/admin", [authenticate, admin], (req: Request, res: Response) => {
    res.status(200).send("Admin accessed");
});

router.get("/user", authenticate, (req: Request, res: Response) => {
    res.status(200).send("User accessed");
});

router.get("/user-only", [authenticate, userOnly], (req: Request, res: Response) => {
    res.status(200).send("User only accessed");
});

router.get("/public", (req: Request, res: Response) => {
    res.status(200).send("Public accessed");
});

export default router;