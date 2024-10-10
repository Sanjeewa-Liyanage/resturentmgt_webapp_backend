import mongoose from "mongoose"

const userschema = mongoose.Schema(
    {
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
        }

    }
)

const User = mongoose.model("Users",userschema)
export default User;
