import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
export const verifyToken = async (request: Request, response: Response, next: NextFunction) => {
    console.log("Verifying token...");
    const authHeaders = request.headers.authorization;
    if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
        return new Error("Token doesn't exist");
    }
    console.log(verifyToken);
    const token = authHeaders.split(" ")[1];
    try {
        const res = jwt.verify(token!, "c5d7b40510348e8157294c80e44229599a249af8307ab6d2d39094f4fbbddac4") as JwtPayload;
        console.log("Token verified");
        console.log(res);
        next();
    }
    catch (err) {
        console.error("Failed to verify token", err);
    }
}