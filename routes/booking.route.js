import express from 'express';
import { postBooking,getBookings, retrieveBookingsByDate } from '../controllers/booking.controller.js';


const bookingRouter = express.Router();

bookingRouter.post('/', postBooking);
bookingRouter.get('/', getBookings); 
bookingRouter.post('/filter-date',retrieveBookingsByDate);

export default bookingRouter;
