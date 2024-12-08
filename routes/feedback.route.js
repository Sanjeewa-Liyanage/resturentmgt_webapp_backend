import express from "express";
import getFeedbacksByRoomId, { 
    postFeedback, 
    getFeedbacks, 
    approveFeedback, 
    
} from "../controllers/feedback.controller.js";

const feedbackRouter = express.Router();

// Route to post feedback
feedbackRouter.post("/", postFeedback);

// Route to get all approved feedbacks
feedbackRouter.get("/approved", getFeedbacks);

// Route to approve a feedback (admin only)
feedbackRouter.put("/approve/:feedbackId", approveFeedback);

// Route to get feedbacks for a specific room by roomId
feedbackRouter.get("/room/:roomId", getFeedbacksByRoomId);

export default feedbackRouter;
