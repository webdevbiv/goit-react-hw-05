import { Link, useLocation } from 'react-router-dom';

const MoviesList = ({ movies }) => {
  const { location } = useLocation();

  if (!movies || movies.length === 0) {
    return;
  }

  return (
    <>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={{ from: location }}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MoviesList;
