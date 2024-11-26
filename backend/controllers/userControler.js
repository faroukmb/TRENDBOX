import validator from "validator";
import bcrypt from "bcrypt"
import userModel from "../models/userModels.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";


const createToken= (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET )
}
//user login

const loginUser = async (req,res)=>{
   try {
     const {email,password} = req.body;
     const user = await userModel.findOne({email});

     if (!user){
        return res.json({success:false,message:"user does not exists"});
     }
     const isMatch =await bcrypt.compare(password,user.password);

     if(!isMatch){
         return res.json({success: false,message:"password incorrecte"});
     }
     else{
        const token =  createToken(user._id)
       return res.json({success:true,token});
     }
   } catch (error) {
    console.log(error)
    return res.json({success:false,message:error.message})
   }
}


//user registration

const registerUser =async (req,res)=>{
    try {
        const {name,email,password}=req.body;
        const exist =await userModel.findOne({email})

        if(exist){
           return res.json({success: false,message: "user already exist"})
        }
        if (!validator.isEmail(email)){
           return res.json({success: false,message: "email not valid"})
        }
        if(password.length < 8){
           return res.json({success:false,message: "Password too weak"})
        }

        // hashing user passord
        const salt =await bcrypt.genSalt(10);
        const hashedpassword =await bcrypt.hash(password,salt);
        const newUser= new userModel({
            name,
            email,
            password: hashedpassword,
        })
        const user= await newUser.save()
        const token = createToken(user._id);

        res.json({success:true,token});
        
    }
     catch (error) {
        console.log(error);
        return res.json({success :false,message: error.message})
    }
 }

// route for admin login

const adminLogin = async (req,res)=>{
   try {
      const {email,password} =req.body;
      if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
         const token =  jwt.sign(email+password,process.env.JWT_SECRET)
         res.json({success:true,token});
      }
      else{
         res.json({success:false,message:"invalid credencials"});
      }

   } catch (error) {
      console.log(error);
         res.json({success :false,message: error.message})
   }  
}

export {loginUser,registerUser,adminLogin};