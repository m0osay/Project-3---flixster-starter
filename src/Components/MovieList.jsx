import React, { useState, useEffect } from "react";

import axios from "axios";
import MovieCard from "./MovieCard";
import MovieModal from "./MovieModal";
import "../style/movieList.css";
//Logic of fetching goes here
function MovieList({searchQuery, searchBool, clearBool, setSearchBool, setClearBool}) {
  const [movies, setMovies] = useState([]); //Movie object for the different attributes
  const [page, setPage] = useState(1); //Keeps track of the current page we are on in our api(helps us load more moives)
  const[showModal, setShowModal] = useState(false) //keeps track of whether the user has clicked to show the modal or not
  const [selectedMovie, setSelectMovie] = useState ({});

  const apiKey = import.meta.env.VITE_API_KEY;


  //Fetch more pages when load button is clicked
  async function fetchAPILoadMoreButton(apiKey, page) {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`
    );
    return data;
  }

  //Fetch search Request
  async function fetchAPISearchQuery(apiKey, searchQuery) {
   

      const { data } = await axios.get(
        "https://api.themoviedb.org/3/search/movie",
        {
          params: {
            api_key: apiKey,
            query: searchQuery,
            include_adult: false,
          },
        }
    );
   
        return data;
  }


  //Step 1. Fetch our data
  useEffect(() => {
    const fetchList = async () => {
      //get our fetched data from the API
      
      let data;

      console.log("IN MovieList ClearBool" + clearBool)
       console.log("IN MovieList SearchBool" + searchBool)

      try {

        if (searchBool) { //SearchBool is true when the user has finished typing in input and press search
            console.log("no dont run")
          data = await fetchAPISearchQuery(apiKey, searchQuery);
          setMovies(data.results)
          console.log(movies)
          setSearchBool(false);

        }else if ( clearBool) { //clear to page one when clear button is clicked
            console.log("this should wrok")
            data = await fetchAPILoadMoreButton(apiKey, 1)
            setPage(1);
            setMovies(data.results)
            setClearBool(false)

        }else if(page > 1) {
            data = await fetchAPILoadMoreButton(apiKey, page)
            setMovies(prevData => ([...prevData,...data.results]));
        }else if ( page == 1 && movies.length == 0){
            //Initial load
            data = await fetchAPILoadMoreButton(apiKey, 1);
            setMovies(data.results);
        }
        
        
        
         
        

//logic too keep appending every movie that is loaded via the load button(if clicked)
      } catch (err) {
        console.log("Error");
      }
    };

    fetchList();
  }, [page, searchBool, searchQuery, clearBool]);

  const handleLoadClick = () => {
    setPage(page + 1);
  };

  //Logic for Modal

  console.log(showModal)
  return (
    <>
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard 
          key={movie.id} 
          movie={movie}
          showModal = {showModal}
          setShowModal={setShowModal}
          setSelectMovie = {setSelectMovie} />
        ))}
      </div>
      {showModal ?
        <MovieModal movie = {selectedMovie} />
        :
        <h1> Dont show anything</h1>
      }
    


      <button onClick={handleLoadClick}> Load More</button>
    </>
  );
}

export default MovieList;
