import express from "express";
import { signIn, signUp } from "../controller/AuthController";

const authRouter = express.Router();

authRouter.post("/auth/signup", signUp);
authRouter.post("/auth/signin", signIn);

export default authRouter;