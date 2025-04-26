import { useState } from 'react';
import { fetchSearchMovies } from '../../services/tmdbApi';
import MoviesList from '../../components/MoviesList/MoviesList';

const MoviesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSearched, setIsSearched] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleInputChange = e => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = async e => {
    const form = e.currentTarget;
    e.preventDefault();
    if (searchQuery.trim() === '') {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetchSearchMovies(searchQuery);
      if (response.movies.length === 0) {
        setError('No movies found');
      } else {
        setMovies(response.movies);
        setTotalPages(response.totalPages);
        setPage(1);
        setIsSearched(true);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
    form.reset();
  };

  const handleLoadMore = async () => {
    setPage(prevPage => prevPage + 1);
    setLoading(true);
    try {
      const response = await fetchSearchMovies(searchQuery, page + 1);
      setMovies(prevMovies => [...prevMovies, ...response.movies]);
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
      {isSearched && !loading && !error && movies.length === 0 && (
        <p>No movies found</p>
      )}
      {movies.length > 0 && <MoviesList movies={movies} />}
      {loading && <p>Loading...</p>}

      {page < totalPages && <button onClick={handleLoadMore}>Load more</button>}
    </div>
  );
};

export default MoviesPage;
