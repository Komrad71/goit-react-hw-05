import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "../navigation/Navigation";

const MovieCast = lazy(() => import("../movieCast/MovieCast"));
const MovieReviews = lazy(() => import("../movieReviews/MovieReviews"));
const HomePage = lazy(() => import("../../pages/homePage/HomePage"));
const MoviesPage = lazy(() => import("../../pages/moviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("../../pages/movieDetailsPage/MovieDetailsPage")
);
const NotFoundPage = lazy(() => import("../../pages/notFoundPage/NotFoundPage"));

const App = () => {
  return (
    <>
      <Navigation />
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;