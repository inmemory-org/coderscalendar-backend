import connectToMongo from './db.js';
import express, { json } from 'express';
import cors from "cors";
import usersRoute from './routes/userRoute.js';
connectToMongo();


const app = express()
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

app.use(json());

app.use('/api/users', usersRoute);

app.listen(process.env.PORT || 4000, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})