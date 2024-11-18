import e, { response } from "express";
import mongoose from "mongoose";

const inquerySchema = mongoose.Schema({
    inqueryId:{
        type:Number,
        required:true,
        unique:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:false
    },
    roomId:{
        type:Number,
        ref:'Room',
        required:true,
    },
    content:{
        type:String,
        required:true
    },
    timeStamp:{
        type:Date,
        default:Date.now
    },
    status:{
        type:String,
        enum:["pending","responsed","rejected"],
        default:"pending"
    },
    response:{
        type:String,
        default:"",
        required:false
    }


});

const Inquery = mongoose.model('Inquery', inquerySchema);
export default Inquery;