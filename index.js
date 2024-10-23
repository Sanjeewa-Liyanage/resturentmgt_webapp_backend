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
dotenv.config();

const app = express()
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
    const token = req.header("Authorization")?.replace("Bearer ","")
    if(token!=null){
        jwt.verify(token,key,(err,decoded)=>{
            if(decoded!=null){
                req.user = decoded;
                console.log(decoded)
                next()
            }else{
                next()
            }
        })
    }else{
        next()
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
app.listen(3000,(req,res)=>{
    console.log("Server is running on port 3000");
})