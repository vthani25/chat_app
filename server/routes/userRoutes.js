import express from "express";
import { login, SignUp } from "../controllers/userController";
import { protectRoute } from "../middleware/auth";

const userRouter = express.Router();

userRouter.post("/signup", SignUp);
userRouter.post("/login", login);
userRouter.put("/update-profile", protectRoute, updateProfile);
userRouter.get("/check", protectRoute, checkAuth);

export default userRouter;