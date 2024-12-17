import express from 'express';
import { postBooking,getBookings, retrieveBookingsByDate, createBookingUsingCategory, getPendingBookings, approveBooking, getApprovedBookings, getPendingBookingsCount, removeEndedBookings } from '../controllers/booking.controller.js';


const bookingRouter = express.Router();

bookingRouter.post('/', postBooking);
bookingRouter.get('/', getBookings); 
bookingRouter.get('/pending-bookings',getPendingBookings);
bookingRouter.get('/pending-count',getPendingBookingsCount);
bookingRouter.get('/approved-bookings',getApprovedBookings);
bookingRouter.post('/filter-date',retrieveBookingsByDate);
bookingRouter.post('/create-by-category',createBookingUsingCategory);
bookingRouter.put('/approve/:bookingId',approveBooking);
bookingRouter.delete('/remove-ended',removeEndedBookings);
export default bookingRouter;
