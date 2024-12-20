
import Booking from "../models/booking.model.js";
export const searchBookingsService = async (params) => {
    try {
      const query = {};
  
      // Add filters based on params
      if (params.roomId) query.roomId = params.roomId;
      if (params.bookingId) query.bookingId = params.bookingId;
      if (params.category) query.category = { $regex: params.category, $options: "i" };
      if (params.email) query.email = { $regex: params.email, $options: "i" };
      if (params.status) query.status = params.status;

  
      // Handle date range filtering
      if (params.start || params.end) {
        const dateQuery = {};
        if (params.start) dateQuery.$gte = new Date(params.start);
        if (params.end) dateQuery.$lte = new Date(params.end);
        query.start = dateQuery;
      }
  
      // Logging the query for debugging
      console.log("Generated Query:", query);
  
      // Fetch bookings matching the query
      const bookings = await Booking.find(query);
      return bookings;
    } catch (err) {
      console.error("Error searching bookings:", err);
      throw err;
    }
  };
  
  export const countDeluxeBookingsService = async () => {
    try {
      const count = await Booking.countDocuments({ category: "Deluxe" });
        return count;
    }
    catch (err) {
      console.error("Error counting deluxe bookings:", err);
      throw err;
    }
    };

    export const countStandardBookingsService = async () => {
        try {
          const count = await Booking.countDocuments({ category: "standard" }); 
            return count;
        }
        catch (err) {
          console.error("Error counting standard bookings:", err);
          throw err;
        }
        };
    
        export const countSuiteBookingsService = async () => {
            try {
              const count = await Booking
                .countDocuments({ category: "suite" });
                    return count;
            }
            catch (err) {
              console.error("Error counting suite bookings:", err);
              throw err;
            }
            };

        export const countFamilyBookingsService = async () => {
            try {
              const count = await Booking
                .countDocuments({ category: "family" });
                    return count;
            }
            catch (err) {
              console.error("Error counting family bookings:", err);
              throw err;
            }
            };


           // services/bookingService.js
export const countBookingsByCategory = async () => {
    try {
      const categories = ["Deluxe", "Family Room", "Standard Room", "Luxury Suite"]; // Add all your categories
      const counts = {};
  
      for (const category of categories) {
        counts[category] = await Booking.countDocuments({ category });
      }
  
      return counts;
    } catch (error) {
      console.error("Error in countBookingsByCategory service:", error);
      throw new Error("Failed to count bookings by category");
    }
  };
  