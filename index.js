import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import userValidationRoutes from "./routes/userValidation.js";
import contestRankingRoutes from "./routes/contestRanking.js"
import connectDatabase from "./config/database.js";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);

//config
dotenv.config({path : "config/config.env"});

connectDatabase();

app.use(express.json());

app.use("/api", userValidationRoutes);
app.use("/api", contestRankingRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is connected`);
});