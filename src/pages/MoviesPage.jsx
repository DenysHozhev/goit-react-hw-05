import { useEffect, useState } from "react";
import { searchMovie } from "../api/Api";
import { useLocation, useSearchParams } from "react-router-dom";
import MovieList from "../components/movieList/MovieList";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const querySearch = searchParams.get("query") || "";
    setQuery(querySearch);

    if (!querySearch) {
      setMovies([]);
      return;
    }

    async function fetchMovies() {
      setLoading(true);
      setError(null);
      try {
        const response = await searchMovie(querySearch);
        setMovies(response.data.results);
      } catch (err) {
        setError("Failed to fetch movies. Try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [searchParams]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!query.trim()) return;
    setSearchParams({ query });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movie"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {movies.length > 0 && (
        <MovieList movies={movies} state={{ from: location }} />
      )}
    </div>
  );
}
