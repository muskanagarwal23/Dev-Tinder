const express = require("express");
const connectDB = require('./config/db');
const app = express();
const User = require('./models/user')

app.post('/signup', async (req,res) => {
  //new instance of user model
    const user = new User({
    firstName : "sachin",
    lastName : "yadav",
    emailId : "sy@gmail.com",
    password : "1234"
  });
  try {
  await user.save() // will return a promise so use async await
  res.send("user added");
  } catch(err) {
    res.status(400).send("error adding user" + err.message);
  }
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



