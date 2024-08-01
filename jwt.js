const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {

    //Extract the jwt token from request headers

    const token = req.headers.authorization.split('')[1];
    if(!token) return res.status(401).json({error:'Unauthorized'});

    try{
        //Verify the JWT Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //Attach user information to the request object

        req.user = decoded;
        next();
    }catch(err){
        console.error(err);
        res.status(401).json({error:'Invalid Token'});
    }

}

//Function to generate JWT Token

const generateToken = (userData) => {
    //Generate a new JWT token using user data
    return jwt.sign(userData,process.env.JWT_SECRET);
}

module.exports = {jwtAuthMiddleware,generateToken};