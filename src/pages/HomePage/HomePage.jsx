import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../../services/tmdbApi';
import MovieList from '../../components/MovieList/MovieList';

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        const response = await fetchTrendingMovies();
        console.log('HomePage: 🔥 Trending Movies:', response);
        setTrendingMovies(response);
      } catch (error) {
        console.log('❌ Error fetching trending movies:', error);
      }
    };
    getTrendingMovies();
  }, []);

  return <MovieList movies={trendingMovies} />;
};

export default HomePage;
