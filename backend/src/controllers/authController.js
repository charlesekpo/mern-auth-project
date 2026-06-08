const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken.js');

const register = async(req, res)=>{
    try{
        const{name, email, password} = req.body;

        // fine the user using email first
        const existingUser = await User.findOne({email});

        if(existingUser){

            // return response so that it doesn't move to password hash
            return res.status(400).json({message: "User already exist"});
        }
        const hashedPassword = await bcrypt.hash(password, 12);

        // create user using hashed password
        const createdUser = await User.create({
            name, email, password: hashedPassword
        });

        res.status(201).json(createdUser)
    }catch(error){
        res.status(500).json(error);
    }
    
}

const login = async(req, res)=>{

    try{
        const {email, password} = req.body;

        const loginUser = await User.findOne({email});

        if(!loginUser){
            return res.status(401).json({message: "Invalid credentials"});
        }

        const comparePassword = await bcrypt.compare(password, loginUser.password);

        if(!comparePassword){
            return res.status(401).json({message: "Invalid credentials"});
        }

        const token = generateToken(loginUser._id);
        res.cookie(
            'token',
            token,
            {
                httpOnly: true,
                secure: false, // since i am working locally and i need to get back the cookie sent from frontend
                maxAge: 30 * 60 * 1000
            }
        );

        res.status(200).json({
            success: true,
            user:{
                id: loginUser._id,
                name: loginUser.name,
                email: loginUser.email
            }
        });

    }catch(error){
        res.status(500).json({message: error.message});
    }
}

const profile = async(req, res)=>{
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json(user)
    }catch(error){
        res.status(400).json({message: error.message});
    }
}

const logout =(req, res)=>{
    res.cookie('token','',{expiresIn: new Date(0)});
    res.status(200).json({message: "Logged Out"});
}

// this will contain multiple method like login as well
module.exports = {register, login, profile, logout};