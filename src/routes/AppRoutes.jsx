import React from 'react';
import Navigation from '../components/Navigation/Navigation';
import HomePage from '../pages/HomePage/HomePage';
import { Route, Routes } from 'react-router-dom';
import MovieDetailsPage from '../pages/MovieDetailsPage/MovieDetailsPage';
import MoviesPage from '../pages/MoviesPage/MoviesPage';

const AppRoutes = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />} />

        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </>
  );
};

export default AppRoutes;
