import express from  'express';
import { disableUser, enableUser, getActiveUsers, getAllUsers, getBannedUsers, getUser, loginUser, postUsers } from '../controllers/userController.js';

const userRouter = express.Router();



userRouter.post("/",postUsers)
userRouter.post("/login",loginUser)
userRouter.put("/enable/:userId",enableUser)
userRouter.put("/disable/:userId",disableUser)
userRouter.get("/all",getAllUsers)
userRouter.get("/banned",getBannedUsers)
userRouter.get("/active",getActiveUsers)
userRouter.get("/",getUser)






export default userRouter;