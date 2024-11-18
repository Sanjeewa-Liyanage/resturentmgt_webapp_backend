import express from "express"
import bodyParser from "body-parser";
import galleryItemRouter from "./routes/gallery.route.js";
import userRouter from "./routes/usersRoutes.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import categoryRouter from "./routes/category.route.js";
import dotenv from 'dotenv';
import roomRouter from "./routes/rooms.route.js";
import bookingRouter from "./routes/booking.route.js";
import feedbackRouter from "./routes/feedback.route.js";
import inqueryRouter from "./routes/inqueries.route.js";
import cors from "cors";
dotenv.config();

const app = express()
app.use(cors())
app.use(bodyParser.json())

//connection string
const conString = process.env.MONGO_URL;



mongoose.connect(conString).then(
    () => console.log("Connected to MongoDB")
).catch(
    (err) => {
        console.error("Error connecting to MongoDB:", err.message);
    }
);
const key = process.env.KEY;

console.log(key);


app.use((req,res,next)=>{
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (token) {
        jwt.verify(token, key, (err, decoded) => {
            if (err) {
                console.error("Token verification failed:", err.message);
                return next(); // Continue without user attached if the token is invalid
            }
            req.user = decoded; // Attach decoded user to req.user
            console.log("Decoded user:", decoded);
            next();
        });
    } else {
        console.log("No token provided");
        next(); // Continue without user attached
    }
});

mongoose.connect(conString).then(
    () => console.log("Connected to MongoDB")
).catch(
    ()=>{
        console.log("Error connecting to MongoDB")
    }
)

app.use("/api/users",userRouter);
app.use("/api/gallery",galleryItemRouter);
app.use("/api/category",categoryRouter);
app.use("/api/rooms",roomRouter);
app.use("/api/bookings",bookingRouter);
app.use("/api/feedbacks",feedbackRouter);
app.use("/api/inqueries",inqueryRouter);
app.listen(3000,(req,res)=>{
    console.log("Server is running on port 3000");
})