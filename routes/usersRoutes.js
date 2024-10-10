import express from  'express';
import { loginUser, postUsers } from '../controllers/userController.js';

const userRouter = express.Router();



userRouter.post("/",postUsers)
userRouter.post("/login",loginUser)


export default userRouter;