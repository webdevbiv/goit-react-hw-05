import { useEffect, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { fetchSearchMovies } from '../../services/tmdbApi';
import MoviesList from '../../components/MoviesList/MoviesList';
import { BarLoader } from 'react-spinners';
import s from './MoviesPage.module.scss';

const MoviesPage = () => {
  const location = useLocation();
  const activeMovieId = location.state?.activeMovieId ?? null;
  const [searchParams, setSearchParams] = useSearchParams();
  // console.log(searchParams);

  const searchQuery = searchParams.get('query') || '';
  const pageParam = Number(searchParams.get('page')) || 1;

  const [movies, setMovies] = useState([]);
  // const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!searchQuery) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetchSearchMovies(searchQuery, pageParam);

        if (pageParam === 1) {
          setMovies(response.movies);
        } else {
          setMovies(prevMovies => [...prevMovies, ...response.movies]);
        }

        // setTotalPages(response.totalPages);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchQuery, pageParam]);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const query = form.elements[0].value.trim();

    if (query === '') {
      setError('Please enter a search query');
      setMovies([]);
      // setTotalPages(0);
      setSearchParams({});
      return;
    }

    setSearchParams({ query, page: 1 });
    setMovies([]);
    // setTotalPages(0);
  };

  // const handleLoadMore = () => {
  //   setSearchParams({ query: searchQuery, page: pageParam + 1 });
  // };

  return (
    <div className={s.container}>
      <form onSubmit={handleSubmit} className={s.form}>
        <input
          type="text"
          name="search"
          placeholder="Search movies..."
          autoComplete="off"
          autoFocus
          defaultValue={searchQuery}
          className={s.input}
        />
        <button type="submit" className={s.button}>
          Search
        </button>
      </form>

      {loading && <BarLoader margin="14px" />}

      {error && <p>{error}</p>}

      {!loading && !error && movies.length === 0 && searchQuery && (
        <p>No movies found</p>
      )}

      {movies.length > 0 && (
        <MoviesList movies={movies} activeMovieId={activeMovieId} />
      )}

      {/* {!loading && pageParam < totalPages && movies.length > 0 && (
        <button className={s.button} onClick={handleLoadMore}>
          Load more
        </button>
      )} */}
    </div>
  );
};

export default MoviesPage;
