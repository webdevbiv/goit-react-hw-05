import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../../services/tmdbApi';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const response = await fetchMovieDetails(movieId);
        console.log('MovieDetailsPage: Movie Details:', response);
        setMovieDetails(response);
      } catch (error) {
        console.error('MovieDetailsPage: Error fetching movie details:', error);
      }
    };

    getMovieDetails();
  }, [movieId]);

  return (
    <div>
      <button onClick={() => navigate(-1)}>Go back</button>
      {movieDetails && (
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            alt={movieDetails.title}
          />
          <h1>
            {movieDetails.title} ({movieDetails.release_date.split('-')[0]})
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
      )}
    </div>
  );
};

export default MovieDetailsPage;
