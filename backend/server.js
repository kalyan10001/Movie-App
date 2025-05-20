import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import ConnectToDb from "./db/ConnectToDb.js";
import Authrouter from "./routes/auth.routes.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT=3000 || process.env.PORT;

app.use("/api/auth",Authrouter);

app.listen(PORT, () => {
    ConnectToDb();
    console.log(`Server running on port ${process.env.PORT}`)
});
