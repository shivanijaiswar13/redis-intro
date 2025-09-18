require("dotenv").config();
const PORT = process.env.PORT || 3000;
const app = require("./src/app");
const cacheClient = require("./src/services/cache.service");
const connectDB = require("./src/config/db/db");

connectDB();

cacheClient.on("connect", ()=>{
    console.log("Redis connected successfully");
});
cacheClient.on("error",(error)=>{
    console.log("error in redis",error);
})



app.listen(PORT, ()=>{
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
})