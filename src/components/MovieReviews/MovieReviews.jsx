import { useEffect, useState } from 'react';
import { fetchMovieReviews } from '../../services/tmdbApi';
import { useParams } from 'react-router-dom';
import { BarLoader } from 'react-spinners';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchMovieReviews(movieId);
        setReviews(response);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getReviews();
  }, [movieId]);

  return (
    <div>
      {loading && <BarLoader />}
      {error && <p>{error}</p>}
      {reviews.length > 0 && (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <p>Author: {review.author}</p>
              <p dangerouslySetInnerHTML={{ __html: review.content }} />
            </li>
          ))}
        </ul>
      )}

      {!loading && !error && reviews.length === 0 && (
        <p>We don't have reviews for this movie.</p>
      )}
    </div>
  );
};
export default MovieReviews;
