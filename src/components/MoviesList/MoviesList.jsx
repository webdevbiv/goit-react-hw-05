import { Link, useLocation } from 'react-router-dom';
import s from './MoviesList.module.scss';

const MoviesList = ({ movies }) => {
  const location = useLocation();

  if (!movies || movies.length === 0) {
    return;
  }

  return (
    <>
      <ul className={s.list}>
        {movies.map(movie => (
          <li key={movie.id} className={s.item}>
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
