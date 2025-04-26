import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';

import Navigation from '../components/Navigation/Navigation';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('../pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() =>
  import('../pages/MovieDetailsPage/MovieDetailsPage')
);
const MovieCast = lazy(() => import('../components/MovieCast/MovieCast'));
const MovieReviews = lazy(() =>
  import('../components/MovieReviews/MovieReviews')
);

const AppRoutes = () => {
  return (
    <>
      <Navigation />

      <Suspense
        fallback={
          <div className="loaderContainer">
            <PropagateLoader color="#282c34" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />

          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>

          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Suspense>
    </>
  );
};

export default AppRoutes;
