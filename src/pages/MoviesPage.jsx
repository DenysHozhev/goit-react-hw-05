import { useEffect, useState } from "react";
import { searchMovie } from "../api/Api";
import { NavLink, useLocation, useSearchParams } from "react-router-dom";

export default function MoviesPage() {
  const [request, setRequest] = useState([]);
  const [query, setQuery] = useState("");
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const querySearchParams = searchParams.get("query") || "";
    setQuery(querySearchParams);
    if (querySearchParams) {
      searchMovie(querySearchParams).then((responce) => {
        setRequest(responce.data.results);
      });
    } else {
      setRequest([]);
    }
  }, [searchParams]);

  async function searchRequestMovie(event) {
    event.preventDefault();
    if (!query.trim()) {
      return;
    }

    setSearchParams({ query });
  }

  return (
    <div>
      <form onSubmit={searchRequestMovie}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movie"
          value={query}
          onChange={(evt) => setQuery(evt.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {request.map((movie) => (
          <li key={movie.id}>
            <NavLink to={`/movies/${movie.id}`} state={{ from: location }}>
              {movie.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
