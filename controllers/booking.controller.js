import Booking from "../models/booking.model.js";
import { isCustomerValid } from "./userController.js";

export function postBooking(req, res) {
    if (!isCustomerValid(req)) {
        res.status(403).json({
            message: "Forbidden"
        });
        return;
    }

    const startingId = 1200;

    Booking.countDocuments({})
        .then((count) => {
            console.log("Existing bookings count:", count);
            const newId = startingId + count + 1;

            const newBooking = new Booking({
                bookingId: newId,
                roomId: req.body.roomId,
                email: req.user.email, 
                start: req.body.start,
                end: req.body.end
            });

            newBooking.save()
                .then((result) => {
                    res.status(201).json({
                        message: "Booking created successfully",
                        result: result
                    });
                })
                .catch((err) => {
                    console.error("Error occurred while saving booking:", err);
                    res.status(500).json({
                        message: "Booking creation failed",
                        error: err.message || "Unknown error occurred"
                    });
                });
        })
        .catch((err) => {
            console.error("Error occurred while counting bookings:", err);
            res.status(500).json({
                message: "Booking creation failed",
                error: err.message || "Unknown error occurred"
            });
        });
}
