const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://muskan23:1234@devtinder.g59sbf9.mongodb.net/devtinder"
    );
};

module.exports = connectDB;