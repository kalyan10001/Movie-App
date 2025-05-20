import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import ConnectToDb from "./db/ConnectToDb.js";
import Authrouter from "./routes/auth.routes.js";
import MovieRouter from "./routes/movie.routes.js";
import { Error, FakeRoute } from "./middleware/error.middleware.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT=5000 || process.env.PORT;

app.use("/api/auth",Authrouter);
app.use("/api/movies",MovieRouter);

app.use(Error);
app.use(FakeRoute);

app.listen(PORT, async() => {
    await ConnectToDb();
    console.log(`Server running on port ${process.env.PORT}`)
});
