const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cacheClient = require("../services/cache.service");

const registerController = async (req,res)=>{
    try {
        const {name, email, mobile, password} = req.body;
        const checkExistingUser = await userModel.findOne({email});
        if(checkExistingUser){
            return res.status(400).json({
                message:"user already exists",
            });

        }
        const hashedPassword = await bcrypt.hash(password, 10);

       
        const newUser = new userModel.create({
            name,
            email,
            mobile,
            password: hashedPass,

        });
        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET,{expiresIn: "1h",});
        res.cookie("ticket", token);

        return res.status(201).json({
            message: "user registered successfully",
            user: newUser,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",

        });
    }
};

const loginController = async (req, res)=>{
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(422).json({
                message: "All fields are required",
            });
        }
        const user = await userModel.findOne({email});

        if(!user){
            return res.status(404).json({
                message: "user not found,"
            });
        }
        const checkPassword = await bcrypt.compare(password, user.password);
        if(!checkPassword){
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET,{expiresIn: "1h"});
        res.cookie("ticket", token);

        return res.status(200).json({
            message: "login successfully",
            user,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error,
        });
    }
}

const logoutController = async (req, res)=>{
    try {
        let token = req.cookies.ticket;
        if(!token){
            return res.status(401).json({
                message: "token not provided",
            });
        }
        await cacheClient.set(token,"blacklisted");

        res.clearCookie("ticket");

        return res.status(200).json({
            message: "user logged out successfully",
        });
    } catch (error) {
        console.log("error in logout ", error);

        return res.status(500).json({
            message: "Internal server error",
            error: error,
        });
        
    }
};






module.exports = {registerController,loginController, logoutController};