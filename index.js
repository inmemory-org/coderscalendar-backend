const connectToMongo = require('./db');
const express = require('express')
const cors=require("cors");
connectToMongo();


const app = express()
const port = 4000
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

app.use(express.json());

app.use('/api/users', require('./routes/userRoute'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})