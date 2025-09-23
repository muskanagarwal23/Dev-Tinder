const jwt = require("jsonwebtoken");
const User = require('../models/user');

const userAuth = async (req,res,next) => {
    try{
     const {token } = req.cookies;
     if(!token) {
        throw new Error ("Token not valid!");
    }
     const decodedMsg = await jwt.verify(token, "DEV@tinder$23" );
    

    const {_id} = decodedMsg;

    const user = await User.findById(_id);
    if(!user) {
        throw new Error ("user is not registered!")
    };

    req.user = user;
    next();
    } 
    catch(err) {
        res.status(400).send("ERROR: " + err.message);
    }
    
};

module.exports = {
   
    userAuth
}