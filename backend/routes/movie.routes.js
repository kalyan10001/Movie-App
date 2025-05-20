import express from "express";
import { AddMovies, deletemovies, getMovies, SearchMovies, SortMovies, UpdateMovies } from "../controllers/movie.controller.js";
import { VerifyAdmin, VerifyJwt } from "../middleware/auth.middleware.js";
const MovieRouter=express.Router();

MovieRouter.get("/",getMovies);
MovieRouter.get("/search",SearchMovies);
MovieRouter.get("/sort",SortMovies);
MovieRouter.post("/",VerifyJwt,VerifyAdmin,AddMovies);
MovieRouter.put("/:id",VerifyJwt,VerifyAdmin,UpdateMovies);
MovieRouter.delete("/:id",VerifyJwt,VerifyAdmin,deletemovies);

export default MovieRouter;
