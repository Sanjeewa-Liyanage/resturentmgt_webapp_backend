import express from 'express';
import { postBooking,getBookings, retrieveBookingsByDate, createBookingUsingCategory } from '../controllers/booking.controller.js';


const bookingRouter = express.Router();

bookingRouter.post('/', postBooking);
bookingRouter.get('/', getBookings); 
bookingRouter.post('/filter-date',retrieveBookingsByDate);
bookingRouter.post('/create-by-category',createBookingUsingCategory);

export default bookingRouter;
