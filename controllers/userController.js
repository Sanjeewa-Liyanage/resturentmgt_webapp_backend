



import User from "../models/user.model.js"
import jwt from "jsonwebtoken"; 
import bcrypt from "bcrypt";


export function postUsers(req,res){
    const user = req.body
    const password = req.body.password
    const hashedPassword = bcrypt.hashSync(password, 10);

    user.password = hashedPassword
    
    const newUser = new User(user)
    newUser.save().then(
        ()=>{
            res.json({
                message : "user created"
            })
        }
    ).catch(
        ()=>{
            res.json({
                message : "user not created"
            })
        }
    )
}
export function loginUser(req,res) {
    const credential = req.body
    const hashedPassword = bcrypt.hashSync(credential.password,10)
    console.log(hashedPassword)
    User.findOne({email: credential.email }).then((user) => {
        if (user==null) {
            res.status(404).json({
                message: "user not found"
            })
        }else{
            const isPasswordtrue = bcrypt.compareSync(credential.password,user.password)

            if(!isPasswordtrue){
                res.status(401).json({
                    message: "password is incorrect"
                })
            }else{
            const load={
                id:user._id,
                email:user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                type: user.type,
            }
        
            const token =  jwt.sign(load,"secret",{expiresIn:"24h"});
            
            res.json({
                message: "user found",
                user:user,
                token : token
            })
        }
        }
    })
}
