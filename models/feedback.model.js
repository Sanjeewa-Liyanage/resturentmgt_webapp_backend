import mongoose from "mongoose";

const feedbackSchema = mongoose.Schema({
    feedbackId:{
        type:Number,
        required:true,
        unique:true
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    roomId:{
        type:Number,
        ref:'Room',
        required:false,
    },

    content:{
        type:String,
        required:true
    },  
    rating:{
        type:Number,
        min:1,
        max:5,
        required:true
    },
    timeStamp:{
        type:Date,
        default:Date.now
    },
    approved:{
        type:Boolean,
        default:false
    }


});

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;