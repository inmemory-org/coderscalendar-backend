import "dotenv/config";
import connectToMongo from "./db.js";
import express from "express";
import cors from "cors";
import userValidationRoutes from "./routes/userValidation.js";

const app = express();
// connectToMongo();
app.use(
  cors({
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);

const port = process.env.PORT || 8000;
app.use(express.json());

app.use("/api", userValidationRoutes);

app.listen(port, () => {
  console.log(`BACKEND IS RUNNING`);
});
