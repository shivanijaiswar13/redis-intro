const express = require("express");

const {registerController, loginController, logoutController} = require("../controllers/auth.controller");

const authMiddleware = require("")


const router = express.Router();

router.get("/home", (req, res)=>{
    return res.send("hello i m home");
});

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);

module.exports = router;