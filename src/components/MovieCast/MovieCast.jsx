import { useEffect, useState } from 'react';
import { fetchMovieCast } from '../../services/tmdbApi';
import { useParams } from 'react-router-dom';
import placeholder from '../../assets/movie-placeholder.svg';
import { BarLoader } from 'react-spinners';

const MovieCast = () => {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const getCast = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchMovieCast(movieId);
        setCast(response);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getCast();
  }, [movieId]);

  return (
    <div>
      {loading && <BarLoader />}
      {error && <p>{error}</p>}
      {cast.length > 0 && (
        <ul>
          {cast.map(actor => (
            <li key={actor.id}>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                    : placeholder
                }
                alt={actor.name}
                width="150"
                height="225"
              />
              <p>{actor.name}</p>
              <p>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default MovieCast;
