import express from  'express';
import { disableUser, enableUser, loginUser, postUsers } from '../controllers/userController.js';

const userRouter = express.Router();



userRouter.post("/",postUsers)
userRouter.post("/login",loginUser)
userRouter.put("/enable/:userId",enableUser)
userRouter.put("/disable/:userId",disableUser)





export default userRouter;