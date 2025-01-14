import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieCredits } from "../tmdb/tmdb";
import styles from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieCredits = async () => {
      try {
        const response = await getMovieCredits(movieId);
        setCast(response.cast);
      } catch (error) {
        console.error("Error fetching movie credits:", error);
      }
    };

    fetchMovieCredits();
  }, [movieId]);

  return (
    <ul className={styles.list}>
      {cast.map((actor) => (
        <li key={actor.id} className={styles.item}>
          <img
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                : "https://via.placeholder.com/200x300?text=No+Image"
            }
            alt={actor.name}
            className={styles.image}
          />
          <p className={styles.name}>{actor.name}</p>
          <p className={styles.character}>Character: {actor.character}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;