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
    navigate(location.state?.from ?? '/movies');
  };

  return (
    <div>
      <button onClick={handleGoBack}>Go back</button>
      {loading && <BarLoader />}
      {error && <p>{error}</p>}
      {!loading && !error && !movieDetails && <p>No movie details found</p>}
      {movieDetails && (
        <div>
          <div>
            <img
              src={
                movieDetails.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
                  : placeholder
              }
              alt={movieDetails.title}
              width="300"
              height="450"
            />
            <div>
              <h1>
                <span>{movieDetails.title}</span>{' '}
                {movieDetails.release_date && (
                  <span>({movieDetails.release_date.split('-')[0]})</span>
                )}
              </h1>
              <p>User Score: {Math.floor(movieDetails.vote_average * 10)}%</p>
              <h2>Overview</h2>
              <p>{movieDetails.overview}</p>
              <h2>Genres</h2>
              <ul>
                {movieDetails.genres.map(genre => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h2>Additional information</h2>
            <nav>
              <ul>
                <li>
                  <NavLink to={`cast`}>Cast</NavLink>
                </li>
                <li>
                  <NavLink to={`reviews`}>Reviews</NavLink>
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
