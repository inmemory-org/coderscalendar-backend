import express from "express";
const app = express();

import errorMiddleware from "./middleware/error.js";

app.use(express.json());

// Route Imports
import user from "./routes/userRoute.js";

app.use("/api/v1", user);

// Middleware for Errors
app.use(errorMiddleware);

export default app;