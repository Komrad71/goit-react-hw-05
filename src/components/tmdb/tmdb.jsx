import axios from "axios";

const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjM2U2YjU0NGMwYmMyMGVlZTMxMzI5ZGZjZTcwYWYwYyIsIm5iZiI6MTczNjgwMDQ1OC43MTIsInN1YiI6IjY3ODU3OGNhYmQ3OTNjMDM1NDRlZGI1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0laQtkmoH2r9IZUxAaCgpKvm_Zo0GHqR-qlHYcni_Xo"; // TMDB API key
const BASE_URL = "https://api.themoviedb.org/3";


const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

// Trending movies
const getTrendingMovies = async () => {
  const response = await api.get("/trending/movie/day");
  return response.data;
};

// Movie details
const getMovieDetails = async (movieId) => {
  const response = await api.get(`/movie/${movieId}`);
  return response.data;
};

// Movie credits
const getMovieCredits = async (movieId) => {
  const response = await api.get(`/movie/${movieId}/credits`);
  return response.data;
};

// Movie reviews
const getMovieReviews = async (movieId) => {
  const response = await api.get(`/movie/${movieId}/reviews`);
  return response.data;
};

// Search movie
const searchMovies = async (query) => {
  const response = await api.get("/search/movie", {
    params: { query },
  });
  return response.data;
};


export {
  getTrendingMovies,
  getMovieDetails,
  getMovieCredits,
  getMovieReviews,
  searchMovies,
};
