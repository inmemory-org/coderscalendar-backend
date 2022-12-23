import express from "express";
import errorMiddleware from "./middleware/error.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());


// Route Imports
import user from "./routes/userRoute.js";
import contest from "./routes/contestRoute.js";

app.use("/api/v1", user);
app.use("/api/v1", contest);

// Middleware for Errors
app.use(errorMiddleware);

export default app;