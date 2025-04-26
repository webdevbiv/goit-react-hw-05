import { Link, useLocation } from 'react-router-dom';
import s from './MoviesList.module.scss';

const MoviesList = ({ movies, activeMovieId }) => {
  const location = useLocation();

  if (!movies || movies.length === 0) {
    return;
  }

  return (
    <>
      <ul className={s.list}>
        {movies.map(movie => (
          <li
            key={movie.id}
            className={s.item}
            style={{
              textDecoration: movie.id === activeMovieId ? 'underline' : 'none',
              fontWeight: movie.id === activeMovieId ? 'bold' : 'normal',
            }}
          >
            <Link
              to={`/movies/${movie.id}`}
              state={{
                from: location.pathname + location.search,
                activeMovieId: movie.id,
              }}
              className={s.link}
            >
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MoviesList;
