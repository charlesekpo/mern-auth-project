const jwt = require('jsonwebtoken');

const protect =async(req, res, next)=>{
    try{
        // first extract the token from the request
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message: "Unauthorized"});
        }

        // verify the token sent
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // create a new property
        req.user = decoded;

        next();

    }catch(error){
        res.status(401).json({message: "Invalid token"});

    }
}

module.exports = {protect};