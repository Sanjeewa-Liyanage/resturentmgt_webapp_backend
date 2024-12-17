import Booking from "../models/booking.model.js";
import { isAdminValid, isCustomerValid } from "./userController.js";
import Room from "../models/room.model.js";
import moment from "moment";
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
                category: req.body.category,
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
            category: category,
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

export function getPendingBookings(req,res){
    if(isAdminValid(req)){
    
        Booking.find({status:"pending"}).then((bookings)=>{
            res.status(200).json({
                message:"Pending bookings retrieved successfully",
                bookings:bookings
            });
        }).catch((err)=>{
            console.error("Error occurred while fetching pending bookings:",err);
            res.status(500).json({
                message:"Pending bookings retrieval failed",
                error:err.message || "Unknown error occurred"
            });
        });
    }
}
export function approveBooking(req,res){
    if(!isAdminValid(req)){
        res.status(403).json({
            message:"Forbidden"
        });
        return;
    }
    const bookingId = req.params.bookingId;
    Booking.findOneAndUpdate({bookingId:bookingId},{status:"approved"},{new:true}).then((updatedBooking)=>{
        if(!updatedBooking){
            return res.status(404).json({
                message:"Booking not found"
            });
        }
        res.status(200).json({
            message:"Booking approved",
            booking:updatedBooking
        });
    }).catch((err)=>{
        res.status(500).json({
            message:"Booking not approved",
            error:err
        });
    });
}

export function getApprovedBookings(req,res){
    if(isAdminValid(req)){
        Booking.find({status:"approved"}).then((bookings)=>{
            res.status(200).json({
                message:"Approved bookings retrieved successfully",
                bookings:bookings
            });
        }).catch((err)=>{
            console.error("Error occurred while fetching approved bookings:",err);
            res.status(500).json({
                message:"Approved bookings retrieval failed",
                error:err.message || "Unknown error occurred"
            });
        });
    }
}
export function getPendingBookingsCount(req, res) {
    if (isAdminValid(req)) {
        Booking.countDocuments({ status: "pending" })
            .then((count) => {
                res.status(200).json({
                    message: "Pending bookings count retrieved successfully",
                    count: count
                });
            })
            .catch((err) => {
                console.error("Error occurred while counting pending bookings:", err);
                res.status(500).json({
                    message: "Pending bookings count retrieval failed",
                    error: err.message || "Unknown error occurred"
                });
            });
    }
}


export function removeEndedBookings(req, res) {
    try {
        // Get the start of yesterday and the end of yesterday (to compare without the time part)
        const yesterdayStart = moment().subtract(1, "days").startOf("day").toDate();
        const yesterdayEnd = moment().subtract(1, "days").endOf("day").toDate();
        
        // Find and delete bookings that ended yesterday
        Booking.deleteMany({ end: { $gte: yesterdayStart, $lte: yesterdayEnd } })
            .then((result) => {
                if (result.deletedCount === 0) {
                    return res.status(404).json({
                        message: "No bookings found to delete",
                    });
                }
                res.status(200).json({
                    message: `${result.deletedCount} bookings removed successfully.`,
                });
            })
            .catch((err) => {
                console.error("Error occurred while deleting ended bookings:", err);
                res.status(500).json({
                    message: "Failed to remove ended bookings",
                    error: err.message || "Unknown error occurred",
                });
            });
    } catch (error) {
        console.error("Error removing ended bookings:", error);
        res.status(500).json({
            message: "Error removing ended bookings",
            error: error.message || "Unknown error occurred",
        });
    }
}