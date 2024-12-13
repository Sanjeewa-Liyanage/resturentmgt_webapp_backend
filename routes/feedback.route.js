
import getFeedbacksByRoomId, { 
    postFeedback, 
    getFeedbacks, 
    approveFeedback, 
    getPendingFeedbacks,
    deleteFeedback
    
} from "../controllers/feedback.controller.js";

import express from "express";


const feedbackRouter = express.Router();

// Route to post feedback
feedbackRouter.post("/", postFeedback);

// Route to get all approved feedbacks
feedbackRouter.get("/approved", getFeedbacks);
feedbackRouter.get("/pending", getPendingFeedbacks);
feedbackRouter.delete("/:feedbackId", deleteFeedback);

// Route to approve a feedback (admin only)
feedbackRouter.put("/approve/:feedbackId", approveFeedback);


// Route to get feedbacks for a specific room by roomId
feedbackRouter.get("/room/:roomId", getFeedbacksByRoomId);






feedbackRouter.get("/pending", getPendingFeedbacks);

// Route to approve a feedback (admin only)
feedbackRouter.put("/approve/:feedbackId", approveFeedback);

// Route to get feedbacks for a specific room by roomId
feedbackRouter.get("/room/:roomId", getFeedbacksByRoomId);

// delete feedback
feedbackRouter.delete("/:feedbackId", deleteFeedback);

export default feedbackRouter;

