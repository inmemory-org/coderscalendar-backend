import mongoose from 'mongoose'
import 'dotenv/config'

const mongoURI = process.env.MONGODB_URL;

export default function connectToMongo() {
    mongoose.connect(mongoURI, ()=>{
        console.log("connected to mongo successfully")
    })
}



// mongodb+srv://dbUser:<password>@cluster0.fpmy2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority