import { useEffect, useState } from 'react';
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { fetchMovieDetails } from '../../services/tmdbApi';
import placeholder from '../../assets/movie-placeholder.svg';
import { BarLoader } from 'react-spinners';
import s from './MovieDetailsPage.module.scss';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchMovieDetails(movieId);
        setMovieDetails(response);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    navigate(location.state?.from ?? '/movies', {
      state: { activeMovieId: location.state?.activeMovieId },
    });
  };

  return (
    <div className={s.container}>
      <button onClick={handleGoBack} className={s.button}>
        Go back
      </button>
      {loading && <BarLoader margin="14px" />}
      {error && <p>{error}</p>}
      {!loading && !error && !movieDetails && <p>No movie details found</p>}
      {movieDetails && (
        <div>
          <div className={s.wr}>
            <img
              src={
                movieDetails.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
                  : placeholder
              }
              alt={movieDetails.title}
              className={s.image}
            />
            <div>
              <h1 className={s.title}>
                <span>{movieDetails.title}</span>{' '}
                {movieDetails.release_date && (
                  <span>({movieDetails.release_date.split('-')[0]})</span>
                )}
              </h1>
              <p className={s.text}>
                User Score: {Math.floor(movieDetails.vote_average * 10)}%
              </p>
              <h2 className={s.title}>Overview</h2>
              <p className={s.text}>{movieDetails.overview}</p>
              <h2 className={s.title}>Genres</h2>
              <ul className={s.list}>
                {movieDetails.genres.map(genre => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h2 className={s.title}>Additional information</h2>
            <nav>
              <ul className={s.listInfo}>
                <li>
                  <NavLink to={`cast`} className={s.link}>
                    Cast
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`reviews`} className={s.link}>
                    Reviews
                  </NavLink>
                </li>
              </ul>
            </nav>
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;
