const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const registerUser = async (req, res) => {

    try {
        const securePassword = await bcrypt.hash(req.body.password, 10)
        const newUser = await User({
            username: req.body.username,
            email: req.body.email,
            password: securePassword,
        });

        await newUser.save();
        res.status(201).json({success:true, Message:'Registration Successful'})

    } catch (error) {
        res.status(500).json({success:false, Message:'Registration Failed'})
    }
}

const login = async (req, res) => {

    try {
        const email = req.body.email;
        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({success:false, message:"User doesn't exist"})
        }

        const checkPassword = await bcrypt.compare(req.body.password, user.password)
    
        if(!checkPassword){
            return  res.status(401).json({success:false, message:"Email or password is incorrect"})
        }

        
        const { password, role, ...rest} = user._doc
        
        const token =  await jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET_KEY, {expiresIn:'1d'}) 

        res.status(200).json({success:true, message:'Login Successful', token,data: {...rest}})
        
    } catch (error) {
         res.status(500).json({success:false, message:'Login Failed'})
    }
}

module.exports = {
    registerUser,
    login
}