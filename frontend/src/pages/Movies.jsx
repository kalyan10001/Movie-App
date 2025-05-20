import React, { useState, useEffect } from "react";
import API from "../utils/api";
import { useNavigate, useParams } from "react-router-dom";

export default function AddEditMovie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    rating: "",
    releaseDate: "",
    duration: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    API.get(`/movies/${id}`)
      .then(({ data }) =>
        setForm({
          ...data,
          releaseDate: data.releaseDate ? data.releaseDate.slice(0, 10) : "",
        })
      )
      .catch(() => setError("Failed to load movie"));
  }, [id]);

  const handleChange = ({ target: { name, value } }) => {
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description) {
      setError("Title and description are required");
      return;
    }
    try {
      if (id) {
        await API.put(`/movies/${id}`, form);
      } else {
        await API.post("/movies", form);
      }
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save movie");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl mb-4 font-semibold">{id ? "Edit Movie" : "Add Movie"}</h1>
      {error && <p className="mb-3 text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {["title", "description", "rating", "releaseDate", "duration"].map((field) =>
          field === "description" ? (
            <textarea
              key={field}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              required={field === "title" || field === "description"}
              rows={3}
              className="w-full border px-3 py-2 rounded"
              value={form[field]}
              onChange={handleChange}
            />
          ) : (
            <input
              key={field}
              type={
                field === "releaseDate"
                  ? "date"
                  : field === "rating" || field === "duration"
                  ? "number"
                  : "text"
              }
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              required={field === "title" || field === "description"}
              min={field === "rating" ? 0 : undefined}
              max={field === "rating" ? 10 : undefined}
              step={field === "rating" ? 0.1 : undefined}
              className="w-full border px-3 py-2 rounded"
              value={form[field]}
              onChange={handleChange}
            />
          )
        )}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          {id ? "Update Movie" : "Add Movie"}
        </button>
      </form>
    </div>
  );
}
