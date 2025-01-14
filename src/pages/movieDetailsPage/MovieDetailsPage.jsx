import { useState, useEffect, Suspense, useRef } from "react";
import {
  useParams,
  useLocation,
  NavLink,
  Outlet,
  Link,
} from "react-router-dom";
import { getMovieDetails } from "../../components/tmdb/tmdb";
import styles from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const backLinkHref = useRef(location.state?.from ?? "/movies").current;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await getMovieDetails(movieId);
        setMovie(response);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  return (
    <main className={styles.main}>
      <Link to={backLinkHref} className={styles.backLink}>
        Go back
      </Link>

      {movie ? (
        <div className={styles.movieContainer}>
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            className={styles.movieImage}
          />
          <div className={styles.movieDetails}>
            <h2 className={styles.title}>{movie.title}</h2>
            <p className={styles.releaseDate}>
              Release date: {movie.release_date}
            </p>
            <p className={styles.voteAverage}>
              Vote average: {movie.vote_average}
            </p>
            <h3 className={styles.sectionTitle}>Overview</h3>
            <p className={styles.overview}>{movie.overview}</p>
            <h3 className={styles.sectionTitle}>Genres</h3>
            {movie.genres && movie.genres.length > 0 ? (
              <ul className={styles.genresList}>
                {movie.genres.map((genre) => (
                  <li key={genre.id} className={styles.genreItem}>
                    {genre.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.noGenres}>No genres available</p>
            )}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}

      <ul className={styles.additionalInfo}>
        <li>
          <NavLink to="cast" className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }>
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink to="reviews" className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }>
            Reviews
          </NavLink>
        </li>
      </ul>

      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </main>
  );
};

export default MovieDetailsPage;