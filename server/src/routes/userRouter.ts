import express from "express";
import { addUser, getUser } from "../controller/userController";

const userRouter = express.Router();

// @ts-ignore
userRouter.route("/").post(addUser);
// @ts-ignore
userRouter.route("/:idNumber").get(getUser);

export default userRouter;
