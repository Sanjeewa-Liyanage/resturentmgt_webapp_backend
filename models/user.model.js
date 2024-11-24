import mongoose from "mongoose"

const userschema = mongoose.Schema(
    {
        userId:{
            type : Number,
            required : true,
            unique : true
        },
        email :{
            type : String,
            required : true,
            unique : true
        },
        password:{
            type :String,
            required : true

        },
        firstname :{
            type : String,
        },
        lastname :{
            type : String,
        },
        type :{
            type : String,
            required : true,
            default :"customer"
        },
        whatsApp:{
            type : String,
            required : true,
        },
        phone:{
            type : String,
            required : true,
        },

        disabled:{
            type:Boolean,
            default : false,
            required: true,
        },
        emailVerified:{
            type:Boolean,
            default : false,
            required: true,
        },
        image:{
            type:String,
            default : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F634796509929203226%2F&psig=AOvVaw3g4Q5Z6ZoX0jx4N0lF9Zy-&ust=1633536469344000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJjXl5P5z_MCFQAAAAAdAAAA"
        }


    }
)

const User = mongoose.model("Users",userschema)
export default User;
