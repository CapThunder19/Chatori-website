const express = require("express")
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

dotenv.config();

const router = express.Router();
const jwtkey = process.env.JWT_KEY;

router.post('/signup', async (req,res)=>{
    const {username,email,password} = req.body;

    try{
        const user = new User({ username, email, password });
        await user.save(); 
        const token = jwt.sign({id: user._id}, jwtkey, {expiresIn: '7d'});
        res.json({token, user: {id:user._id,username, email}})
    }
    catch (err) {
        if (err.code === 11000) {
          return res.status(400).json({ message: "Email already exists." });
        }
    
        console.error("Signup failed", err);
        res.status(500).json({ message: "Internal server error." });
      }
});

router.post('/login', async (req,res)=>{
    const {email,password} = req.body;

    try{
        const user = await User.findOne({email});
        if(!user || !(await user.matchPassword(password))){
            return res.status(400).json({msg:"invalid credentials"})
        }
        const token = jwt.sign({id:user._id}, jwtkey, {expiresIn: '7d'});
        res.json({token, user: {id:user._id, username: user.username, email}})
    }
    catch(err){
        res.status(400).json({msg:"login failed"})
    }
})

module.exports = router;