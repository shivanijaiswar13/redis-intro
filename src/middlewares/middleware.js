const jwt = require("jsonwebtoken");

const userModel = require("../models/user.model");

const cacheClient = require("../services/cache.service");

const authMiddleware = async (req, res, next)=>{
    try {
        const token = req.cookies.ticket;

        if(!token){
            return res.status(401).json({
                message: "token not found, Unauthorized",
            });
        }
        const isBlacklisted = await cacheClient.get(token);
        if(isBlacklisted){
            return res.status(401).json({
                message: "token blacklisted",
            });
        }
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({
                message: "Invalid token",
            });

        }

        let user = await userModel.findById(decode.id);
        req.user = user;
        next();

    } catch (error) {
        console.log("error in middleware", error);
    }
}

module.exports = authMiddleware;