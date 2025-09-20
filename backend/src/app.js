const express = require("express");
const connectDB = require('./config/db');
const app = express();
const User = require('./models/user')

app.use(express.json());

app.post('/signup', async (req,res) => {
  //new instance of user model
  //console.log(req.body);
    const user = new User(req.body);
 try {
  await user.save() // will return a promise so use async await
  res.send("user added");
  } catch(err) {
    res.status(400).send("error adding user :" + err.message);
  }
});

app.get('/user', async (req,res) => {
  const userEmail = req.body.emailId;

  try{
    const users = await User.findOne({emailId : userEmail});
    if(!users){
      res.status(404).send("user not fount");
    } else {
      res.send(users);
      //console.log(users);
      
    }
  } catch(err){
    res.status(400).send("something went wrong");
  }
});

app.delete('/user', async (req,res) => {
  const userId = req.body.userId;
  try{
    const user = await User.findByIdAndDelete({_id: userId});
    if(!user){
      res.status(404).send("user not fount");
    } else {
      res.send("user deleted!");
      //console.log(users);
      
    }

  }catch(err){
     res.status(400).send("something went wrong");
  }
});

app.patch('/user/:userId', async (req,res) => {
 const userId = req.params?.userId;
 const data = req.body;
 try{
    const ALLOWED_UPDATE = [
      "userId","photourl","about","age","skills",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) =>
    ALLOWED_UPDATE.includes(k)
    );

    if(!isUpdateAllowed) {
      throw new Error ("Update now allowed");
    };

    if(data?.skills.length > 10) {
      throw new Error ("skills can't be more than 10");
    };

    if(data?.about.length > 50) {
      throw new Error ("length for about is 50");
    };

    const user = await User.findByIdAndUpdate({_id: userId}, data,
      { 
        returnDocument : "before",
        runValidators: true
       }
    );
    
      res.send("user updated!");
      
    }catch(err){
     res.status(400).send("updation failed - " + err.message);
  }
})

app.get('/feed', async (req,res) => {
  try{
    const users = await User.find({});
    if(users.length === 0){
      res.status(404).send("user not fount");
    } else {
      res.send(users);
      
      
    }
  } catch(err){
    res.status(400).send("something went wrong");
  
  }
})

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



