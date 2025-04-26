import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../../services/tmdbApi';
import MovieList from '../../components/MoviesList/MoviesList';
import { BarLoader } from 'react-spinners';

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTrendingMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchTrendingMovies();
        setTrendingMovies(response);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getTrendingMovies();
  }, []);

  return (
    <>
      {loading && <BarLoader />}
      {error && <p>Error: {error}</p>}
      {trendingMovies.length > 0 && <MovieList movies={trendingMovies} />}
    </>
  );
};

export default HomePage;
