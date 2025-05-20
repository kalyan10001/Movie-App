import React, { useState, useEffect } from "react";
import API from "../utils/api";

export default function Dashboard() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let url = "/";

        if (searchTerm) {
          url = `/movies/search?q=${encodeURIComponent(searchTerm)}`;
        } else if (sortBy) {
          url = `/movies/sort?sortBy=${encodeURIComponent(sortBy)}`;
        }

        const { data } = await API.get(url);
        setMovies(data);
        setError("");
      } catch (err) {
        setError("Failed to load movies");
      }
    };

    fetchMovies();
  }, [searchTerm, sortBy]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Movies Dashboard</h1>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow border px-3 py-2 rounded"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="title">Sort by Title</option>
          <option value="rating">Sort by Rating</option>
          <option value="releaseDate">Sort by Release Date</option>
          <option value="duration">Sort by Duration</option>
        </select>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <ul className="space-y-4">
        {movies.length === 0 && <p>No movies found.</p>}

        {movies.map((movie) => (
          <li
            key={movie._id}
            className="border rounded p-4 shadow hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold">{movie.title}</h2>
            <p className="text-gray-700 mb-2">{movie.description}</p>
            <div className="flex gap-4 text-sm text-gray-600">
              <span>Rating: {movie.rating || "N/A"}</span>
              <span>
                Release Date:{" "}
                {movie.releaseDate
                  ? new Date(movie.releaseDate).toLocaleDateString()
                  : "N/A"}
              </span>
              <span>Duration: {movie.duration ? `${movie.duration} min` : "N/A"}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
