const jwt = require('jsonwebtoken');

const generateToken = (userId, userRole) =>{
    // generate token based on secret key
    return jwt.sign(
      // the key names i want to use in the token are id and role
      {id: userId, role: userRole},
      process.env.JWT_SECRET,
      {expiresIn: '30m'}  
    );
};

module.exports = generateToken;