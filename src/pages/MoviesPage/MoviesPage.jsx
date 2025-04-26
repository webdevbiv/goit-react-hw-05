import { useEffect, useState } from 'react';
import { fetchSearchMovies } from '../../services/tmdbApi';
import MoviesList from '../../components/MoviesList/MoviesList';
import { BarLoader } from 'react-spinners';

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

  useEffect(() => {
    if (movies.length > 0) {
      localStorage.setItem(
        'savedMovies',
        JSON.stringify({
          movies,
          page,
          totalPages,
          searchQuery,
        })
      );
    }
  }, [movies, page, totalPages, searchQuery]);

  const handleInputChange = e => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetchSearchMovies(searchQuery, 1); // page 1

      if (response.movies.length === 0) {
        setError('No movies found');
        setMovies([]);
        setPage(1);
        setTotalPages(0);
      } else {
        setMovies(response.movies);
        setPage(1);
        setTotalPages(response.totalPages);
        setIsSearched(true);
      }
    } catch (error) {
      setError(error.message);
      setMovies([]);
      setPage(1);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={handleInputChange}
          autoComplete="off"
          autoFocus
        />
        <button type="submit">Search</button>
      </form>

      {loading && <BarLoader />}

      {error && <p>{error}</p>}

      {isSearched && !loading && !error && movies.length === 0 && (
        <p>No movies found</p>
      )}

      {movies.length > 0 && <MoviesList movies={movies} />}

      {!loading && page < totalPages && movies.length > 0 && (
        <button onClick={handleLoadMore}>Load more</button>
      )}
    </div>
  );
};

export default MoviesPage;
