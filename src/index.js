import { app } from "./app.js";
import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./db/index.js";
import healthCheckRouter from "./routes/healthcheck.routes.js";
dotenv.config({ path: "./src/.env" });
// Constants
const PORT = process.env.PORT || 8001;

// Middlewares
app.use(cors({origin:process.env.CORS_URL, credentials:true}));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
}).catch((error) => {
  console.log("Error connecting to the database", error);
});


app.use("/api/v1/healthcheck", healthCheckRouter);
