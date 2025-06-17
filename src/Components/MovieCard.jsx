import React from "react";
import ReactDOM from "react-dom";
import "../style/movieCard.css";
import noImg from "../assets/img/no-img.png";
import heartIcon from "../assets/img/icons/6.png";
import watchIcon from "../assets/img/icons/8.png";
import filledHeart from "../assets/img/icons/heart-filled.png";
import filledWatch from "../assets/img/icons/watch-filled.png";

function MovieCard({ movie, showModal, setShowModal, setSelectMovie, isFav , isWatched, onToggleHeart, onToggleWatch }) {
  const handleClick = (e) => {
    setShowModal(true);
    setSelectMovie(movie);
    console.log("Button is Clicked");
  };

  return (
    <>
      <div className="movie-card" onClick={handleClick}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
              : noImg
          }
          alt={`${movie.title} poster`}
        />
        <p>{movie.title}</p>
        <p> {movie.vote_average} </p>
      
 <div className="movie-icons">
        <img
          src={ isFav ? filledHeart : heartIcon}
          alt="Favorite toggle"
          className= "icon-heart"
          onClick={(e) => {
            e.stopPropagation();
            onToggleHeart(movie);
          }}
        />
        <img
          src={isWatched ? filledWatch: watchIcon}
          alt="Watched toggle"
          className={`icon eye ${isWatched ? "filled" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWatch(movie);
          }}
        />
      </div>

      
      </div>
    </>
  );
}

export default MovieCard;
