import { NavLink, Outlet, useParams } from "react-router-dom";
import {
  ItemMovieBaseSize,
  ItemMovieBaseUrl,
  ItemMovieDetails,
} from "../api/Api";
import { useEffect, useState } from "react";

export default function MovieDetailsPage() {
  const { movieId } = useParams();

  console.log(movieId);

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function getMovieDetails() {
      try {
        const responce = await ItemMovieDetails(movieId);
        setMovie(responce.data);
        console.log(responce.data);
      } catch (error) {
        console.log({ error });
      }
    }
    getMovieDetails();
  }, []);

  return (
    <div>
      {movie && (
        <>
          <img
            src={`${ItemMovieBaseUrl}${ItemMovieBaseSize}${movie.poster_path}`}
            alt={movie.title}
          />
          <h2>
            {movie.original_title} ({new Date(movie.release_date).getFullYear()}
            )
          </h2>
          <h3>{movie.genres.map((genre) => genre.name).join(", ")}</h3>
        </>
      )}
      <nav>
        <NavLink to="cast">Cast</NavLink>
        <NavLink to="reviews">Reviews</NavLink>
      </nav>

      <Outlet />
    </div>
  );
}
