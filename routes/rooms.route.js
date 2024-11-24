import express from 'express';
import { postRoom, deleteRoom, getallRoom, getRoomByCategory, getRoomById,updateRoom, changeAvailability } from '../controllers/room.controller.js';


const roomRouter = express.Router();

roomRouter.post("/", postRoom);
roomRouter.delete("/:roomId", deleteRoom);
roomRouter.get("/", getallRoom);
roomRouter.get("/by-category/:category", getRoomByCategory);
roomRouter.get("/:roomId", getRoomById);
roomRouter.put("/:roomId", updateRoom);
roomRouter.put("/:roomId/available", changeAvailability);



export default roomRouter;