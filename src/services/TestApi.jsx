import { useEffect } from 'react';
import {
  fetchTrendingMovies,
  searchMovies,
  fetchMovieDetails,
  fetchMovieCast,
  fetchMovieReviews,
} from './tmdbApi';

const TestApi = () => {
  useEffect(() => {
    const runTest = async () => {
      try {
        const trending = await fetchTrendingMovies();
        console.log('🔥 Trending Movies:', trending);

        const search = await searchMovies('avatar');
        console.log('🔍 Search Results:', search);

        const details = await fetchMovieDetails(19995); // Avatar ID
        console.log('🎬 Movie Details:', details);

        const cast = await fetchMovieCast(19995);
        console.log('🎭 Cast:', cast);

        const reviews = await fetchMovieReviews(19995);
        console.log('📝 Reviews:', reviews);
      } catch (err) {
        console.error('❌ API Error:', err);
      }
    };

    runTest();
  }, []);

  return;
};

export default TestApi;
