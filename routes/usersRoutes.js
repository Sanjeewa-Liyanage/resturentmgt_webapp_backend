import express from  'express';
import { disableUser, enableUser, getUser, loginUser, postUsers } from '../controllers/userController.js';

const userRouter = express.Router();



userRouter.post("/",postUsers)
userRouter.post("/login",loginUser)
userRouter.put("/enable/:userId",enableUser)
userRouter.put("/disable/:userId",disableUser)
userRouter.get("/",getUser)





export default userRouter;