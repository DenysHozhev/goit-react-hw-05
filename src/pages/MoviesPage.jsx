import { useState } from "react";
import { searchMovie } from "../api/Api";
import { NavLink } from "react-router-dom";

export default function MoviesPage() {
  const [request, setRequest] = useState([]);
  const [query, setQuery] = useState("");

  async function searchRequestMovie(event) {
    event.preventDefault();
    if (!query.trim()) {
      return;
    }

    try {
      const responce = await searchMovie(query.toLowerCase());
      setRequest(responce.data.results);
      console.log(responce.data.results);
    } catch (error) {
      console.log({ error });
    }
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
            <NavLink to={`/movies/${movie.id}`}>{movie.title}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
