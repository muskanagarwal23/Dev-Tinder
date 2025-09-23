const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50,
    },
    lastName : {
        type: String,
        minLength: 2,
        maxLength: 50,
    },
    emailId : {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ("invalid email: " + value);
            }
        }
        

    },
    password : {
        type: String,
        required: true,
        
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error ("enter a strong password : " + value);
            }
        }

    },
    gender : {
        type: String,
        validate(value) {
            if(!["male","female","others"].includes(value)) {
                throw new Error ("gender data is not valid");
            }
        }
    },
    age : {
        type: Number,
        min: 18,
    },
    skills : {
        type: [String],
    },

    photoUrl: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbkKA0cvzl6V-tQaQtr_U9sj73-Wsh5ATWmw&s",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error ("invalid image URL : " + value);
            }
        }
    },
    
    about:{
        type: String,
        default: "Hello devs! I'm online. ",
    },

},
   { 
     timestamps: true,
   }
);

userSchema.methods.getJWT = async function() {
    const user = this;

    const token = await jwt.sign({_id : user._id } , "DEV@tinder$23" , {
        expiresIn : "7d"
    }); 
    return token;
};

userSchema.methods.validatePassword = async function(passwordByUser) {
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(passwordByUser, passwordHash);

    return isPasswordValid;
};

 module.exports =  mongoose.model("User",userSchema);

