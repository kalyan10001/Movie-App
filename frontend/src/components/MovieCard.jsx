import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie, role, onDelete }) => {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <h2 className="font-bold text-xl mb-2">{movie.title}</h2>
      <p><strong>Rating:</strong> {movie.rating}</p>
      <p><strong>Release Date:</strong> {new Date(movie.releaseDate).toLocaleDateString()}</p>
      <p><strong>Duration:</strong> {movie.duration} mins</p>
      <p className="mt-2">{movie.description}</p>

      {role === 'admin' && (
        <div className="mt-4 flex space-x-2">
          <Link
            to={`/edit/${movie._id}`}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            Edit
          </Link>
          <button
            onClick={() => onDelete(movie._id)}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
