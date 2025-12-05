const mongoose = require("mongoose");

const conn = async (req,res)=>  {
    try {
        await mongoose.connect("mongodb+srv://admin:admin@cluster0.rcvpk4k.mongodb.net/");
        console.log("Mongoose connected");
    } catch (error) {
        console.error("MongoDb connection failed: ",error);
    }
};

conn();