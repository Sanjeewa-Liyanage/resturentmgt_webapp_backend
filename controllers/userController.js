



import User from "../models/user.model.js"
import jwt from "jsonwebtoken"; 
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
dotenv.config();


export function postUsers(req,res){

    User.countDocuments({}).then(count => {
        const newId = count + 1;
        const user = req.body;
        const hashedPassword = bcrypt.hashSync(user.password,10);
        user.password = hashedPassword;
        user.userId = newId;
        const newUser = new User(user);
        newUser.save().then(result => {
            res.status(201).json({
                message:"User created",
                user:result
            });
        }).catch(err =>{
            res.status(500).json({
                message:"User not created",
                error:err
            });
        });
    });
}
export function loginUser(req,res) {
    const key = process.env.KEY;
    const credential = req.body
    const hashedPassword = bcrypt.hashSync(credential.password,10)
    console.log(hashedPassword)


    User.findOne({email: credential.email }).then((user) => {
        if (user==null) {
            res.status(404).json({
                message: "user not found"
            })
        }else if(user.disabled){
            res.status(403).json({
                message:"User disabled please contact support"
            })
        }else{
            const isPasswordtrue = bcrypt.compareSync(credential.password,user.password)

            if(!isPasswordtrue){
                res.status(401).json({
                    message: "password is incorrect"
                })
            }else{
                console.log("User fields:", user.firstname, user.lastname); // Debugging step
            const load={
                id:user._id,
                email:user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                type: user.type,
            }
        
            const token =  jwt.sign(load,key,{expiresIn:"24h"});
            
            res.json({
                message: "user found",
                user:user,
                token : token
            })
        }
        }
    })
}
//ban user 

export function disableUser(req,res){
    if(!isAdminValid(req)){
        res.status(401).json({
            message: "You must be an admin to ban a user"
        })
        return
    }
    const userId = req.params.userId;

    User.findOneAndUpdate({userId:userId},{disabled:true})
    .then((updatedUser)=>{
        if(!updatedUser){
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.status(200).json({
            message: "User banned",
            user: updatedUser
        });
    }).catch((err)=>{
        res.status(500).json({
            message: "User not banned",
            error: err
        });
    });

}

//unban user

export function enableUser(req,res){
    if(!isAdminValid(req)){
        res.status(401).json({
            message: "You must be an admin to unban a user"
        })
        return
    }
    const userId = req.params.userId;

    User.findOneAndUpdate({userId:userId},{disabled:false})
    .then((updatedUser)=>{
        if(!updatedUser){
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.status(200).json({
            message: "User unbanned",
            user: updatedUser
        });
    }).catch((err)=>{
        res.status(500).json({
            message: "User not unbanned",
            error: err
        });
    });
}
export function getUser(req,res){
    const user = req.user;
    console.log(user)
    if(user == null){
        res.status(401).json({
            message: "not found"
        });
        return;
    }else{
        console.log(user.firstname)
        res.json({
            
            message: "user found",
            user: user,
            
        });
    }
}
//is admin
export function isAdminValid(req){
    
    if(req.user == null){
        return false
    }
    if(req.user.type!="admin"){
        return false
    }
    return true
}

//is costomer
export function isCustomerValid(req){

    if(req.user == null){
    return false
  }
  console.log(req.user)
  if(req.user.type != "customer"){
    return false
  }

  return true;
}

