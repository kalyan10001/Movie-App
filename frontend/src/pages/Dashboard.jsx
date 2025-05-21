import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard.jsx';

const Dashboard = ({ token, role }) => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchMovies = async () => {
    setLoading(true);
    setError('');
    try {
      let url = 'http://localhost:5000/api/movies';
      if (search.trim()) {
        url = `http://localhost:5000/api/movies/search?q=${encodeURIComponent(search)}`;
      } else if (sortBy) {
        url = `http://localhost:5000/api/movies/sort?sortBy=${sortBy}`;
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch movies');
      const data = await res.json();
      setMovies(data);
    } catch (err) {
      setError(err.message || 'Error fetching movies');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, [search, sortBy]);

  const handleDelete = async (id) => {
    if (!token) {
      alert('Login as admin to delete movies');
      return;
    }
    if (!window.confirm('Are you sure you want to delete this movie?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/movies/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Delete failed');
      setMovies((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Movies Dashboard</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded flex-grow min-w-[200px]"
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

      {loading && <div>Loading movies...</div>}
      {error && <div className="text-red-600">{error}</div>}

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} role={role} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
