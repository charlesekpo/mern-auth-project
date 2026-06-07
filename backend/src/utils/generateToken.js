const jwt = require('jsonwebtoken');

const generateToken = (userId) =>{
    // generate token based on secret key
    jwt.sign(
      {id: userId},
      process.env.JWT_SECRET,
      {expiresIn: '30m'}  
    );
};

module.exports = generateToken;