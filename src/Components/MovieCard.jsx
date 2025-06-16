import React from "react";
import ReactDOM from "react-dom";
import "../style/movieCard.css";


function MovieCard ({movie, showModal, setShowModal, setSelectMovie}) {


    const handleClick = (e) => {
        setShowModal(true);
        setSelectMovie(movie)
        console.log("Button is Clicked")



    };
    return (
        <>
        <div 
        className = "movie-card"
        onClick = {handleClick}
        >
           <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={`${movie.title} poster`} />
           
            <p>{movie.title}</p>
            <p> {movie.vote_average} </p>


        </div>

        </>

    );

}

export default MovieCard;