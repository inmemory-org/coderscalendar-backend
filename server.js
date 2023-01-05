import dotenv from "dotenv";
import app from "./app.js";
import connectDatabase from "./db/database.js";



//config
dotenv.config({path : ".env"});

// connecting to database
connectDatabase();



app.listen(process.env.PORT, () => {
    console.log(`Server is connected`,process.env.PORT);
});
  