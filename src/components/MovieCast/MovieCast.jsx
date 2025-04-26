import { useEffect, useState } from 'react';
import { fetchMovieCast } from '../../services/tmdbApi';
import { useParams } from 'react-router-dom';
import placeholder from '../../assets/movie-placeholder.svg';
import { BarLoader } from 'react-spinners';
import s from './MovieCast.module.scss';

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
      {loading && <BarLoader margin="14px" />}
      {error && <p>{error}</p>}
      {cast.length > 0 && (
        <ul>
          {cast.map(actor => (
            <li key={actor.id} className={s.item}>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                    : placeholder
                }
                alt={actor.name}
                className={s.image}
              />
              <p className={s.info}>{actor.name}</p>
              <p className={s.info}>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      )}
      {!loading && !error && cast.length === 0 && (
        <p>We don't have cast information for this movie.</p>
      )}
    </div>
  );
};
export default MovieCast;
