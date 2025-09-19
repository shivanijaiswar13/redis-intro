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
        const isBlacklisted = await cacheClient.get(token)
    } catch (error) {
        
    }
}