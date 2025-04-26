import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../../services/tmdbApi';
import { BarLoader } from 'react-spinners';
import MovieList from '../../components/MoviesList/MoviesList';

import s from './HomePage.module.scss';

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
    <div className={s.container}>
      {loading && <BarLoader margin="14px" />}
      {error && <p>Error: {error}</p>}

      {trendingMovies.length > 0 && (
        <>
          <h1 className={s.title}>Trending today</h1>
          <MovieList movies={trendingMovies} />
        </>
      )}
    </div>
  );
};

export default HomePage;
