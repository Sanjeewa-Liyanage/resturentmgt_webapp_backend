import Room from "../models/room.model.js";
import {isAdminValid} from "./userController.js";

export function postRoom(req,res){
    if(!isAdminValid(req)){
        res.status(401).json({
            message: "You must be an admin to create a room"
        })
        return
    }
    const newRoom = new Room(req.body);
    newRoom.save().then(
        (result)=>{
            res.status(201).json({
                message: "Room created successfully",
                result: result
            })
        }
    ).catch((err)=>{
        res.status(500).json({
            message: "Failed to create room",
            error: err
        })
    })

}
//delete room
export function deleteRoom(req,res){
    if(!isAdminValid(req)){
        res.status(401).json({
            message: "You must be an admin to delete a room"
        })
        return
    }
   const roomId = req.params.roomId;
   Room.findOneAndDelete({roomId:roomId}).then(
         ()=>{
              res.status(200).json({
                message: "Room deleted successfully",
                
              })
         }
    ).catch((err)=>{
         res.status(500).json({
              message: "Failed to delete room",
              error: err
         })
    }
   )
} 
//getroombyid
export function getRoomById(req,res){
    const roomId = req.params.roomId;

    Room.findOne({roomId:roomId}).then(
        (result)=>{
            if(result!=null){
                res.status(200).json({
                    message: "Room found",
                    result: result
                })
            }else{
                res.status(404).json({
                    message: "Room not found"
                })
            }
        }
    ).catch((err)=>{
        res.status(500).json({
            message: "Failed to get room",
            error: err
        })
    })
}
// get all rooms 
export function getallRoom(req,res){
    Room.find().then(
        (result)=>{
            res.status(200).json({
                rooms: result
            })
        }
    ).catch((err)=>{
        res.status(500).json({
            message: "Failed to get rooms",
            error: err
        })
    })
}

//update room
export function updateRoom(req,res){
    if(!isAdminValid(req)){
        res.status(401).json({
            message: "You must be an admin to update a room"
        })
        return
    }
    const roomId = req.params.roomId;
    Room.findOneAndUpdate({roomId:roomId},req.body).then(
        ()=>{
            res.status(200).json({
                message: "Room updated successfully"
            })
        }
    ).catch((err)=>{
        res.status(500).json({
            message: "Failed to update room",
            error: err
        })
    })
}

//get room by category
export function getRoomByCategory(req,res){
    const category = req.params.category;
    Room.find({Category:category}).then(
        (result)=>{
            res.status(200).json({
                rooms: result
            })
        }
    ).catch((err)=>{
        res.status(500).json({
            message: "Failed to get rooms",
            error: err
        })
    })
}

//change availability
export function changeAvailability(req, res) {
    if (!isAdminValid(req)) {
        res.status(401).json({
            message: "You must be an admin to change availability"
        });
        return;
    }

    const roomId = req.params.roomId;

    // Find the room first to get the current value of "available"
    Room.findOne({ roomId: roomId })
        .then((room) => {
            if (!room) {
                res.status(404).json({
                    message: "Room not found"
                });
                return;
            }

            // Toggle the "available" field
            const newAvailability = !room.available;

            // Update the room's availability
            return Room.findOneAndUpdate(
                { roomId: roomId },
                { $set: { available: newAvailability } },
                { new: true } // Return the updated document
            );
        })
        .then((updatedRoom) => {
            res.status(200).json({
                message: "Availability changed successfully",
                newAvailability: updatedRoom.available
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Failed to change availability",
                error: err
            });
        });
}
