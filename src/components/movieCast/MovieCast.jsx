import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CastBaseSize, castMovie, ItemMovieBaseUrl } from "../../api/Api";
import noImage from "../../img/no-image.webp";

export default function MovieCast() {
  const { movieId } = useParams();
  console.log(movieId);

  const [cast, setCast] = useState([]);

  useEffect(() => {
    async function dataCastMovie() {
      try {
        const response = await castMovie(movieId);
        setCast(response.data.cast);
        console.log(response.data.cast);
      } catch (error) {
        console.log({ error });
      }
    }
    dataCastMovie();
  }, [movieId]);

  return (
    <div>
      {cast ? (
        <ul>
          {cast.map((actor) => (
            <li key={actor.id}>
              <img
                src={
                  actor.profile_path
                    ? `${ItemMovieBaseUrl}${CastBaseSize}${actor.profile_path}`
                    : noImage
                }
                alt={actor.name}
                style={{ width: "92px", objectFit: "cover" }}
              />
              {actor.name} — {actor.character}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading cast...</p>
      )}
    </div>
  );
}
