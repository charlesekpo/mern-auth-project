const User = require('../models/User.js');
const bcrypt = require('bcryptjs');

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
// this will contain multiple method like login as well
module.exports = {register};