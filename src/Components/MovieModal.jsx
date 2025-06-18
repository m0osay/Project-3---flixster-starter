import React, { useState, useEffect } from "react";
import "../style/movieModa.css";
import axios from "axios";

function MovieModal({ movie, onClose }) {
  const apiKey = import.meta.env.VITE_API_KEY;

  const [runtime, setRuntime] = useState(null);
  const [genreMap, setGenreMap] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  //  Fetch full details once 
  useEffect(() => {
    let cancelled = false;
    async function loadDetails() {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie.id}`,
          { params: { api_key: apiKey, language: "en-US" } }
        );
        if (!cancelled) {
          setRuntime(data.runtime);      
        }
      } catch (err) {
        console.error("Failed to fetch movie details", err);
      }
    }
    loadDetails();
    return () => { cancelled = true };
  }, [apiKey, movie.id]);

  
  useEffect(() => {
    let cancelled = false;
    async function loadGenres() {
      try {
        const { data } = await axios.get(
          "https://api.themoviedb.org/3/genre/movie/list",
          { params: { api_key: apiKey } }
        );
        if (!cancelled) {
          const lookup = {};
          data.genres.forEach(g => (lookup[g.id] = g.name));
          setGenreMap(lookup);
        }
      } catch (err) {
        console.error("Failed to fetch genres", err);
      }
    }
    loadGenres();
    return () => { cancelled = true };
  }, [apiKey]);

  // Fetch videos once, pick the YouTube trailer
  useEffect(() => {
    let cancelled = false;
    async function loadTrailer() {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos`,
          { params: { api_key: apiKey, language: "en-US" } }
        );
        if (cancelled) return;
        const trailer = data.results.find(
          v => v.type === "Trailer" && v.site === "YouTube"
        );
        if (trailer) setTrailerKey(trailer.key);
      } catch (err) {
        console.error("Failed to fetch videos", err);
      }
    }
    loadTrailer();
    return () => { cancelled = true };
  }, [apiKey, movie.id]);

  // derive genre names from your map + movie.genre_ids
  const genreNames = genreMap && movie.genre_ids
    ? movie.genre_ids.map(id => genreMap[id]).filter(Boolean).join(", ")
    : "Loading…";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-body">
          <img
            className="modal-poster"
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={`${movie.title} poster`}
          />
          <div className="modal-details">
            <h1 className="modal-title">{movie.title}</h1>
            <p className="modal-rating">⭐ {movie.vote_average}</p>
            {runtime != null && (
              <p className="modal-runtime">⏱ Runtime: {runtime} min</p>
            )}
            <p className="modal-release">Release Date: {movie.release_date}</p>

            <h2>Overview:</h2>
            <p className="modal-overview">{movie.overview}</p>

            <h3>Genres: {genreNames}</h3>

            <h3>Trailer:</h3>
            {trailerKey ? (
              <iframe
                title="Trailer"
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <p>Loading trailer…</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
