import express from "express";

import { postFeedback,getFeedbacks,approveFeedback } from "../controllers/feedback.controller.js";
const feedbackRouter = express.Router();

feedbackRouter.post("/", postFeedback);
feedbackRouter.get("/approved", getFeedbacks);
feedbackRouter.put("/:approve/:feedbackId", approveFeedback);

export default feedbackRouter;