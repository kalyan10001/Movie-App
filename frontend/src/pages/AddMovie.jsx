import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddMovie = ({ token }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    rating: '',
    releaseDate: '',
    duration: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/movies/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to add movie');
      }

      alert('Movie added successfully!');
navigate('/');
} catch (err) {
setError(err.message);
}
};

return (
<div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
<h1 className="text-2xl font-bold mb-4">Add New Movie</h1>
{error && <div className="text-red-600 mb-2">{error}</div>}
<form onSubmit={handleSubmit} className="space-y-4">
<input name="title" type="text" placeholder="Title" value={form.title} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
<textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required className="w-full border px-3 py-2 rounded" rows="4" />
<input name="rating" type="number" step="0.1" min="0" max="10" placeholder="Rating (0-10)" value={form.rating} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
<input name="releaseDate" type="date" value={form.releaseDate} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
<input name="duration" type="number" min="1" placeholder="Duration (minutes)" value={form.duration} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
<button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700" >
Add Movie
</button>
</form>
</div>
);
};

export default AddMovie;

