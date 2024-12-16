import Booking from "../models/booking.model.js";
import { isAdminValid, isCustomerValid } from "./userController.js";
import Room from "../models/room.model.js";

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
export function getBookings(req, res) {
    if(isAdminValid(req)){
        Booking.find().then((bookings) => {
            res.status(200).json({
                message: "Bookings retrieved successfully",
                bookings: bookings
            });
        }).catch((err) => {
            console.error("Error occurred while fetching bookings:", err);
            res.status(500).json({
                message: "Bookings retrieval failed",
                error: err.message || "Unknown error occurred"
            });
        });
    }
}
export function retrieveBookingsByDate(req,res){
    const start = req.body.start;
    const end = req.body.end;
    console.log(start,end);

    Booking.find({
        start:{
            $gte: new Date(start),
        },
        end:{
            $lte: new Date(end)
        }
        
    }).then((bookings)=>{
        res.status(200).json({
            message:"Bookings retrieved successfully",
            bookings:bookings
        });
    }).catch((err)=>{
        console.error("Error occurred while fetching bookings:",err);
        res.status(500).json({
            message:"Bookings retrieval failed",
            error:err.message || "Unknown error occurred"
        });
    });
}

export async function createBookingUsingCategory(req, res) {
    //check if user logged in
  if(!isCustomerValid(req)){
    res.status(403).json({
      message: "Forbidden"
    })
    return;
  }
	try {
		const { category, start, end } = req.body;

		// Validate input
		if (!category || !start || !end) {
			return res.status(400).json({
				message: "Invalid input. Category, start, and end dates are required.",
			});
		}

		const startDate = new Date(start);
		const endDate = new Date(end);

		if (startDate >= endDate) {
			return res.status(400).json({
				message:
					"Invalid date range. Start date must be earlier than end date.",
			});
		}

		// Find bookings that overlap with the given dates
		const overlappingBookings = await Booking.find({
			$or: [
				{ start: { $lt: endDate }, end: { $gt: startDate } }, // Full or partial overlap
			],
		});

		const occupiedRooms = overlappingBookings.map((booking) => booking.roomId);

		// Find available rooms in the given category
		const availableRooms = await Room.find({
			roomId: { $nin: occupiedRooms },
			category: category,
		});

		if (availableRooms.length === 0) {
			return res.status(404).json({
				message:
					"No available rooms in the selected category for the given dates.",
			});
		}

		// Generate booking ID
		const startingId = 1200;
		const bookingCount = await Booking.countDocuments();
		const newBookingId = startingId + bookingCount + 1;

		// Create new booking
		const newBooking = new Booking({
			bookingId: newBookingId,
			roomId: availableRooms[0].roomId, // Select the first available room
			email: req.user.email,
			status: "pending", // Default status
			start: startDate,
			end: endDate,
		});

		const savedBooking = await newBooking.save();

		return res.status(201).json({
			message: "Booking created successfully",
			booking: savedBooking,
		});
	} catch (error) {
		console.error("Error creating booking:", error);
		return res.status(500).json({
			message: "Booking creation failed",
			error: error.message,
		});
	}
}
