const mongoose = require('mongoose');
require("dotenv").config();

const mongoURI = process.env.MONGODB_URL;

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("connected to mongo successfully")
    })
}

module.exports = connectToMongo;

// mongodb+srv://dbUser:<password>@cluster0.fpmy2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority