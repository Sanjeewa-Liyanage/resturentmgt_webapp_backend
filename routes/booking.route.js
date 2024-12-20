import express from 'express';
import { postBooking,getBookings, retrieveBookingsByDate, createBookingUsingCategory, getPendingBookings, approveBooking, getApprovedBookings, getPendingBookingsCount, removeEndedBookings,searchBookings, countDeluxeBookingsControllar, countBookingsByCategoryController } from '../controllers/booking.controller.js';
import { countDeluxeBookingsService, countFamilyBookingsService } from '../services/booking.service.js';


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
bookingRouter.get("/search", async (req, res) => {
    const params = req.query; // Extract parameters from the query string
    await searchBookings(req, res, params);
});
bookingRouter.get("/deluxe-count",countDeluxeBookingsControllar);
bookingRouter.get("/standard-count",countDeluxeBookingsControllar);
bookingRouter.get("/suite-count",countDeluxeBookingsControllar);
bookingRouter.get("/family-count",countDeluxeBookingsControllar);
bookingRouter.get("/counts",countBookingsByCategoryController);



export default bookingRouter;
