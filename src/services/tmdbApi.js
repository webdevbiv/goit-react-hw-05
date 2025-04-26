import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const AUTH_TOKEN = import.meta.env.VITE_API_ACCESS_KEY;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${AUTH_TOKEN}`,
  },
});

// Trending movies
export const fetchTrendingMovies = async () => {
  const { data } = await axiosInstance.get('/trending/movie/day');
  return data.results;
};

// Search movies
export const fetchSearchMovies = async (query, page = 1) => {
  const { data } = await axiosInstance.get('/search/movie', {
    params: {
      query,
      include_adult: false,
      language: 'en-US',
      page: page,
    },
  });
  return {
    movies: data.results,
    totalPages: data.total_pages,
  };
};

// Movie details
export const fetchMovieDetails = async movieId => {
  const { data } = await axiosInstance.get(`/movie/${movieId}`);
  return data;
};

// Movie credits
export const fetchMovieCast = async movieId => {
  const { data } = await axiosInstance.get(`/movie/${movieId}/credits`);
  return data.cast;
};

// Movie reviews
export const fetchMovieReviews = async movieId => {
  const { data } = await axiosInstance.get(`/movie/${movieId}/reviews`);
  return data.results;
};
