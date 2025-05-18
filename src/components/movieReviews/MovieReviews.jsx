import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { reviewsMovie } from "../../api/Api";

export default function MovieReviews() {
  const { movieId } = useParams();
  console.log(movieId);

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function dataReviewsMovie() {
      try {
        const responce = await reviewsMovie(movieId);
        setReviews(responce.data.results);
        console.log(responce.data.results);
      } catch (error) {
        console.log({ error });
      }
    }
    dataReviewsMovie();
  }, [movieId]);

  return (
    <div>
      {reviews ? (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <h3>{review.autor}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        "No reviews"
      )}
    </div>
  );
}
