import express from "express";
<<<<<<< Updated upstream
=======
import getFeedbacksByRoomId, { 
    postFeedback, 
    getFeedbacks, 
    approveFeedback,
    getPendingFeedbacks,
    deleteFeedback 
    
} from "../controllers/feedback.controller.js";
>>>>>>> Stashed changes

import { postFeedback,getFeedbacks,approveFeedback } from "../controllers/feedback.controller.js";
const feedbackRouter = express.Router();

feedbackRouter.post("/", postFeedback);
feedbackRouter.get("/approved", getFeedbacks);
feedbackRouter.put("/:approve/:feedbackId", approveFeedback);

<<<<<<< Updated upstream
export default feedbackRouter;
=======
feedbackRouter.get("/pending", getPendingFeedbacks);

// Route to approve a feedback (admin only)
feedbackRouter.put("/approve/:feedbackId", approveFeedback);

// Route to get feedbacks for a specific room by roomId
feedbackRouter.get("/room/:roomId", getFeedbacksByRoomId);

// delete feedback
feedbackRouter.delete("/:feedbackId", deleteFeedback);

export default feedbackRouter;
>>>>>>> Stashed changes
