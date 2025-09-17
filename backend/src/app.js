const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

//app.use("/admin",adminAuth);
//app.use("/user",userAuth);

app.get("/admin/getData", adminAuth, (req,res) => {
    res.send("All data sent");
});

app.get("/admin/delete", (req,res) => {
    res.send("data deleted");
});



app.get("/user" , userAuth, (req,res) =>{
    res.send({Fname: "Muskan" , Lname: "Agarwal"} );
})



app.listen(3000, () => {
    console.log("server is running on port 3000");
    
});