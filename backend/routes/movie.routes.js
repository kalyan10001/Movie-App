import express from "express";
import { AddMovies, deletemovies, getMovies, SearchMovies, SortMovies, UpdateMovies } from "../controllers/movie.controller.js";
const MovieRouter=express.Router();

MovieRouter.get("/",getMovies);
MovieRouter.get("/search",SearchMovies);
MovieRouter.get("/sort",SortMovies);
MovieRouter.post("/",AddMovies);
MovieRouter.put("/:id",UpdateMovies);
MovieRouter.delete("/:id",deletemovies);

export default MovieRouter;
