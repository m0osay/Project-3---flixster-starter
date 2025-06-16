
import React, { useState, useEffect } from "react";
import "../style/movieModa.css";

function MovieModal ({movie}) {
    return (
        <>
        <div 
        className = {"movie-modal"}
        onClose = {"close-button"}
        >
            <h1> {movie.title}</h1>
             <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={`${movie.title} poster`} />
             <h2> Release Date + {movie.date}</h2>
           
            <p>{movie.title}</p>
            <p> {movie.vote_average} </p>
            

        </div>

        </>

    );

}

export default MovieModal;