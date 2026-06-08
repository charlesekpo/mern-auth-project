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

const authorize = (...roles) =>{
    return(req, res, next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({message: "Forbidden!"});
        }
        next();
    }
    
}

module.exports = {protect, authorize};