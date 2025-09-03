import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { ITask } from "../models/Task.model";

declare global {
    namespace Express {
        interface Request {
            userId?: ITask['userId']
        }
    }
}

interface JwtPayload {
    userId: string;
    email: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
