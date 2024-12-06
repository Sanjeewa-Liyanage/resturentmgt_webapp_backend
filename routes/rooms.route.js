import express from 'express';
import { 
    postRoom, 
    deleteRoom, 
    getallRoom, 
    getRoomByCategory, 
    getRoomById, 
    updateRoom, 
    changeAvailability, 
    filterRooms, 
    getRooms 
} from '../controllers/room.controller.js';

const roomRouter = express.Router();

roomRouter.post("/", postRoom); // Create a room
roomRouter.delete("/:roomId", deleteRoom); // Delete a room by ID
roomRouter.get("/", getallRoom); // Get all rooms
roomRouter.get("/availableRooms", getRooms); // Get available rooms filtered by category
roomRouter.get("/filter", filterRooms); // Filter rooms
roomRouter.get("/category/:category", getRoomByCategory); // Get rooms by category
roomRouter.put("/:roomId", updateRoom); // Update a room
roomRouter.put("/:roomId/available", changeAvailability); // Change room availability
roomRouter.get("/:roomId", getRoomById); // Get a room by ID

export default roomRouter;
