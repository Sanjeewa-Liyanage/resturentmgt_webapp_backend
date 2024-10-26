import express from 'express';
import { postBooking } from '../controllers/booking.controller.js';


const bookingRouter = express.Router();

bookingRouter.post('/', postBooking); 

export default bookingRouter;
