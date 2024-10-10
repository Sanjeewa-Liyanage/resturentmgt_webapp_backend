import express from "express"
import bodyParser from "body-parser";
import galleryItemRouter from "./routes/gallery.route.js";
import userRouter from "./routes/usersRoutes.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import categoryRouter from "./routes/category.route.js";

const app = express()
app.use(bodyParser.json())

//connection string
const conString ="mongodb+srv://tester2:4321@cluster0.zydxy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

app.use((req,res,next)=>{
    const token = req.header("Authorization")?.replace("Bearer ","")
    if(token!=null){
        jwt.verify(token,"secret",(err,decoded)=>{
            if(decoded!=null){
                req.body.user = decoded;
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

app.listen(3000,(req,res)=>{
    console.log("Server is running on port 3000");
})