import express from "express";
import { LoginUser, RegisterUser } from "../controllers/auth.controller.js";

const Authrouter = express.Router();

Authrouter.post("/register",RegisterUser);

Authrouter.post("/login",LoginUser);

export default Authrouter;