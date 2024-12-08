import Feedback from "../models/feedback.model.js";
import { isAdminValid, isCustomerValid } from "./userController.js";

//postFeddback
export function postFeedback(req,res){
    if(!isCustomerValid(req)){
        res.status(401).json({
            message:"Unauthorized"
        });
        return;
    }
    const StartingFeedbackId = 1000;
    Feedback.countDocuments({}).then(count => {
        const newId = StartingFeedbackId + count + 1;
        const feedback = new Feedback({
            feedbackId: newId,
            user: req.user.id,  
            roomId: req.body.roomId,
            content: req.body.content,
            rating: req.body.rating,
            timeStamp: req.body.timeStamp || Date.now(),  
            approved: req.body.approved || false
        });
        feedback.save().then(result => {
            res.status(200).json({
                message:"Feedback posted",
                feedback:result
            });
        }).catch(err =>{
            res.status(500).json({
                message:"Feedback not posted",
                error:err
            });
        });
    }).catch(err =>{
        res.status(500).json({
            message:"Feedback not posted",
            error:err
        });
    });

    
}

//get all feedbacks

export function getFeedbacks(req,res){
    const query = {approved:true};
    if(req.body.roomId) query.roomId = req.body.roomId;

    Feedback.find(query).then(result =>{
        res.status(200).json({
            message:"Feedbacks fetched",
            feedbacks:result
        });
    }).catch(err =>{
        res.status(500).json({
            message:"Feedbacks not fetched",
            error:err
        });
    });

}

//approve feedbacks

export function approveFeedback(req, res) {
    if (!isAdminValid(req)) {  
        res.status(401).json({
            message: "Unauthorized"
        });
        return;
    }

    const feedbackId = req.params.feedbackId;
    
    
    Feedback.findOneAndUpdate({ feedbackId: feedbackId }, { approved: true }, { new: true })
        .then((updatedFeedback) => {
            if (!updatedFeedback) {
                return res.status(404).json({
                    message: "Feedback not found"
                });
            }
            res.status(200).json({
                message: "Feedback approved",
                feedback: updatedFeedback
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Feedback not approved",
                error: err
            });
        });
}

//get feedbacks by roomid
export default function getFeedbacksByRoomId(req, res) {
    const roomId = req.params.roomId;

    if (!roomId) {
        res.status(400).json({
            message: "RoomId is required",
        });
        return;
    }

    console.log("Fetching feedbacks for roomId:", roomId);

    Feedback.find({ roomId: roomId, approved: true })
        .populate("user", "firstname email")
        .then((feedbacks) => {
            console.log("Feedbacks fetched:", feedbacks);
            res.status(200).json({
                message: "Feedback fetched Success",
                feedbacks: feedbacks,
            });
        })
        .catch((err) => {
            console.error("Error fetching feedbacks:", err);
            res.status(500).json({
                message: "Failed to fetch feedbacks",
                error: err,
            });
        });
}
