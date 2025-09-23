const express = require("express");
const connectDB = require('./config/db');
const app = express();
const User = require('./models/user')
const { validateSignupData } = require('./utils/validate');
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require('./middlewares/auth')

app.use(express.json());
app.use(cookieParser());


app.post('/signup', async (req,res) => {
  //new instance of user model
  //console.log(req.body);
    // const user = new User(req.body);

   try {
    validateSignupData(req);

    const {firstName, lastName , emailId, password} = req.body;

    const passwordHash = await bcrypt.hash(password,10);
     //console.log(passwordHash);
     
    const user = new User({
     firstName, lastName, emailId, password : passwordHash,
    });
    
    
     await user.save() // will return a promise so use async await
  res.send("user added");
  } catch(err) {
    res.status(400).send("error adding user : " + err.message);
  }
});

app.post('/login', async (req,res) => {
  try{
    const {emailId, password} = req.body;
    const user = await User.findOne({emailId : emailId});
    if(!user){
      throw new Error ("Invalid Credentials!")
    };

    const isPasswordValid = await user.validatePassword(password);
    if(isPasswordValid) {
      //create jwt
       const token = await user.getJWT();
       //console.log(token);
       
      //adding token to cookie
      res.cookie("token" , token);
      res.send("Login Successfully!")
    }else {
      throw new Error("Invalid Credentials!")
    }
  }catch(err){
   res.status(400).send("ERROR: " + err.message);
  }
});

app.get('/profile', userAuth , async (req,res) => {
 
  try {
  
  

  const user = req.user; 
  

  res.send(user);

  } catch(err) {
     res.status(400).send("ERROR: " + err.message);
  };
  
  

});

app.post('/sendRequest', userAuth, (req,res,next) => {
  
  const user = req.user;
  console.log("connection req send...");
  res.send( user.firstName + " sent connection request..");
  
});

connectDB()
.then(() => {
    console.log("Database Connected..");
    app.listen(3000, () => {
    console.log("server is running on port 3000");
    
});
    
})
.catch((err) => {
    console.error("Database not connected")
})



