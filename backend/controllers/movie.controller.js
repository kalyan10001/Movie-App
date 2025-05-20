import Movie from "../models/movie.schema.js";
import { sendToQueue } from "../rabbitmq/insert.rbmq.js";

export const getMovies= async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
};

export const SearchMovies= async (req, res) => {
  const { q } = req.query;
  const regex = new RegExp(q, "i");
  const results = await Movie.find({
    $or: [{ title: regex }, { description: regex }],
  });
  res.json(results);
};

export const SortMovies= async (req, res) => {
  const { sortBy = "title" } = req.query;
  const movies = await Movie.find().sort({ [sortBy]: 1 });
  res.json(movies);
};

export const AddMovies=async (req, res) => {
  try {
    await sendToQueue(req.body);
    res.status(202).json({ message: "Movie added to queue." });
  } catch (err) {
    res.status(500).json({ message: "Queue error", error: err.message });
  }
};

export const UpdateMovies=async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(movie);
};

export const deletemovies=async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.json({ message: "Movie deleted" });
};
