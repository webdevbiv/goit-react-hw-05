import { useEffect, useState } from 'react';
import { fetchSearchMovies } from '../../services/tmdbApi';
import MoviesList from '../../components/MoviesList/MoviesList';
import { BarLoader } from 'react-spinners';

import s from './MoviesPage.module.scss';

const MoviesPage = () => {
  const [searchQuery, setSearchQuery] = useState(() => {
    const saved = localStorage.getItem('savedMovies');
    return saved ? JSON.parse(saved).searchQuery : '';
  });

  const [movies, setMovies] = useState(() => {
    const saved = localStorage.getItem('savedMovies');
    return saved ? JSON.parse(saved).movies : [];
  });

  const [page, setPage] = useState(() => {
    const saved = localStorage.getItem('savedMovies');
    return saved ? JSON.parse(saved).page : 1;
  });

  const [totalPages, setTotalPages] = useState(() => {
    const saved = localStorage.getItem('savedMovies');
    return saved ? JSON.parse(saved).totalPages : 0;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSearched, setIsSearched] = useState(false);

  const resetMoviesState = () => {
    setMovies([]);
    setPage(1);
    setTotalPages(0);
  };

  useEffect(() => {
    localStorage.setItem(
      'savedMovies',
      JSON.stringify({
        movies,
        page,
        totalPages,
        searchQuery,
      })
    );
  }, [movies, page, totalPages, searchQuery]);

  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.currentTarget;
    const query = e.target.elements[0].value.trim();

    setSearchQuery(query);

    if (query === '') {
      setError('Please enter a search query');
      resetMoviesState();
      setIsSearched(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetchSearchMovies(query, 1);

      if (response.movies.length === 0) {
        setError('No movies found');
        resetMoviesState();
        setIsSearched(false);
      } else {
        setMovies(response.movies);
        setPage(1);
        setTotalPages(response.totalPages);
        setIsSearched(true);
      }
    } catch (error) {
      setError(error.message);
      resetMoviesState();
      setIsSearched(false);
    } finally {
      setLoading(false);
    }
    form.reset();
  };

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setLoading(true);

    try {
      const response = await fetchSearchMovies(searchQuery, nextPage);
      setMovies(prevMovies => [...prevMovies, ...response.movies]);
      setPage(nextPage);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={s.container}>
      <form onSubmit={handleSubmit} className={s.form}>
        <input
          type="text"
          placeholder="Search movies..."
          autoComplete="off"
          autoFocus
          className={s.input}
        />
        <button type="submit" className={s.button}>
          Search
        </button>
      </form>

      {loading && <BarLoader margin="14px" />}

      {error && <p>{error}</p>}

      {isSearched && !loading && !error && movies.length === 0 && (
        <p>No movies found</p>
      )}

      {movies.length > 0 && <MoviesList movies={movies} />}

      {!loading && page < totalPages && movies.length > 0 && (
        <button className={s.button} onClick={handleLoadMore}>
          Load more
        </button>
      )}
    </div>
  );
};

export default MoviesPage;
