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
        const token = jwt.sign()
    } catch (error) {
        
    }
}