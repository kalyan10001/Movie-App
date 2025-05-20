import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: String,
  description: String,
  rating: Number,
  releaseDate: Date,
  duration: Number,
});

const Movie=await mongoose.model("movie",movieSchema);
export default Movie;