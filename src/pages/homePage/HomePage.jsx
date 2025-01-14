import { useState, useEffect } from "react";
import { getTrendingMovies } from "../../components/tmdb/tmdb";
import MovieList from "../../components/movieList/MovieList";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await getTrendingMovies();
        setMovies(response.results);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Trending Today</h1>
      <MovieList movies={movies} />
    </main>
  );
};

export default HomePage;