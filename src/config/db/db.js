const mongoose = require("mongoose");

const connectDB = async ()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log("mongodb connected successfully");

    } catch (error) {
        console.log("error in connecting mongodb",error);
    }
}

module.exports = connectDB;