import express from 'express';
import { postBooking } from '../controllers/booking.controller.js';
// import { authenticateUser } from '../middleware/auth.js'; 

const bookingRouter = express.Router();

bookingRouter.post('/', postBooking); // authenticate user  middleware

export default bookingRouter;
