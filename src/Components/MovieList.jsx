import React, { useState, useEffect } from "react";

import axios from "axios";
import MovieCard from "./MovieCard";
import MovieModal from "./MovieModal";
import "../style/movieList.css";
//Logic of fetching goes here

function MovieList({
  favSet,
  watchedSet,
  onToggleHeart,
  onToggleWatch,
  setMovies,
  movies,
  activeTab,
}) {
  //Movie object for the different attributes
  console.log("favSet", favSet);
  const [page, setPage] = useState(1); //Keeps track of the current page we are on in our api(helps us load more moives)
  const [showModal, setShowModal] = useState(false); //keeps track of whether the user has clicked to show the modal or not
  const [selectedMovie, setSelectMovie] = useState({});
  const [LoadMore, setLoadMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [clearBool, setClearBool] = useState(false);
  const [searchBool, setSearchBool] = useState(false);
  const [selectedSortBy, setSelectedSortBy] = useState("popularity");
  const [selectedSortOrder, setSelectSortOrder] = useState("desc");

  const apiKey = import.meta.env.VITE_API_KEY;

  //Fetch more pages when load button is clicked
  async function fetchAP(apiKey, page) {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`
    );
    return data;
  }

  const handleClearButton = (e) => {
    // console.log("Clicked on Clear Butotn, and state " + clearBool);
    setClearBool(true);
    setPage(1);
    setSearchQuery("");
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchBool(true);
    }
  };

  const handleSearchButton = (e) => {
    setSearchBool(true);
  };

  //Fetch search Request
  async function fetchAPISearchQuery(apiKey, searchQuery, p) {
    searchQuery = searchQuery.trim();
    const { data } = await axios.get(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: {
          api_key: apiKey,
          query: searchQuery,
          include_adult: false,
          page: p,
        },
      }
    );

    return data;
  }

  async function fetchAPIWithSort(
    apikey,
    p,
    selectedSortBy,
    selectedSortOrder
  ) {
    const { data } = await axios.get(
      "https://api.themoviedb.org/3/discover/movie",
      {
        params: {
          api_key: apikey,
          page: p,
          include_adult: false,
          sort_by: `${selectedSortBy}.${selectedSortOrder}`, //example it can be {vote_average} + {.desc}
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

      //   console.log("IN MovieList ClearBool" + clearBool);
      console.log("SearchBool", searchBool);
      console.log("Load more ? " + LoadMore )

      try {
        console.log("this should run");
        console.log(searchQuery.length);
        if (activeTab == "home") {
          if (searchBool) {
            //SearchBool is true when the user has finished typing in input and press search
            //   console.log("This should run");
            data = await fetchAPISearchQuery(apiKey, searchQuery, page);
            //console.log("data here", data.results, "searchQuery", searchQuery);
            setMovies(data.results);
            //   console.log(movies);
            setSearchBool(false);
          } else if (clearBool) {
            //clear to page one when clear button is clicked
            //   console.log("ClearBool Page number", page);
            data = await fetchAP(apiKey, page);
            setMovies(data.results);
            setClearBool(false);
          } else if (searchQuery.length > 0 ) {
            //User clicks load more while searchQuery
            //   console.log("CLicked load more while search Query");
            data = await fetchAPISearchQuery(apiKey, searchQuery, page);
            setMovies((prevData) => [...prevData, ...data.results]);
            // } else if (page > 1) {
            //   data = await fetchAP(apiKey, page);
            //   setMovies((prevData) => [...prevData, ...data.results]);
            // } else if (page == 1 && movies.length == 0) {
            //Initial load
            //   data = await fetchAP(apiKey, page);
            //   setMovies(data.results);
          } else if (
            (selectedSortBy.length > 0 || selectedSortOrder.length > 0) &&
            searchQuery.length === 0 && !LoadMore
          ) {
            console.log("this should run okay ");
            data = await fetchAPIWithSort(
              apiKey,
              page,
              selectedSortBy,
              selectedSortOrder
            );

            if (page > 1 ) {
                data = await fetchAP(apiKey, page)
              setMovies((prev) => [...prev, ...data.results]);
              console.log("this should run too please");
            } else {
              setMovies(data.results);
            }
          } else if (LoadMore) {
            console.log("THIS SHOULD RUN")
              data = await fetchAP(apiKey, page)
              setMovies((prev) => [...prev, ...data.results]);
              console.log("this should run too please");

          }else if (page == 1 && movies.length == 0) {
            //intitial load
            console.log("this should run");
            data = await fetchAP(apiKey, page);
            setMovies(data.results);
          }
        } else if (activeTab == "fav") {
          setMovies(favSet);
        } else {
          setMovies(watchedSet);
        }
        //logic too keep appending every movie that is loaded via the load button(if clicked)
      } catch (err) {
        console.log("Error");
      }
    };

    fetchList();
  }, [
    page,
    searchQuery,
    searchBool,
    selectedSortOrder,
    selectedSortBy,
    activeTab,
    favSet,
    watchedSet,
  ]);

  const handleLoadClick = () => {
    setLoadMore(true);
    setPage(page + 1);
  };

  const handleSortBy = (e) => {
    const value = e.target.value;
    setSelectedSortBy(value);
    console.log("I choose", selectedSortBy);
    setPage(1);
  };

  const handleSortOrder = (e) => {
    const value = e.target.value;
    setSelectSortOrder(value);
    console.log("I choose", selectedSortOrder);
    setPage(1);
  };

    const handleLoadMore = (e) => {
    setPage(page + 1);
    setLoadMore(true);
  };


  if (!movies) {
    return null;
  }

  return (
    <>
      <div className=" search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange} //updates every key stroke the user inputs
          onKeyDown={handleKeyDown} //this will check if the user pressed enter
          placeholder="Search"
        />
        <button id="searchButton" onClick={handleSearchButton}>
          {" "}
          Search
        </button>

        <button id="clearButton" onClick={handleClearButton}>
          {" "}
          Clear
        </button>

        <select
          className=" sort-by-input"
          value={selectedSortBy}
          onChange={handleSortBy}
        >
          <option value="popularity"> Popularity </option>
          <option value="primary_release_date"> Release Date </option>
          <option value="vote_average"> Rating </option>
          <option value="title"> Title(A-Z)</option>
        </select>

        <select
          className="sort-in-input"
          value={selectedSortOrder}
          onChange={handleSortOrder}
        >
          <option value="desc"> Descend </option>
          <option value="asc"> Ascend </option>
        </select>
      </div>
      <div className="movie-list">
        {movies.map((movie, index) => (
          <MovieCard
            key={index}
            movie={movie}
            showModal={showModal}
            setShowModal={setShowModal}
            setSelectMovie={setSelectMovie}
            isFav={favSet.some((m) => m.id === movie.id)}
            isWatched={watchedSet.some((m) => m.id === movie.id)}
            onToggleHeart={() => onToggleHeart(movie)}
            onToggleWatch={() => onToggleWatch(movie)}
          />
        ))}
      </div>
      {/* {showModal ? (
        <MovieModal movie={selectedMovie} />
      ) : (
        <h1> Dont show anything</h1>
      )} */}

      {showModal && (
        <MovieModal movie={selectedMovie} onClose={() => setShowModal(false) } />
      )}
      {activeTab == "home" && (
        <button className="load-more" onClick={handleLoadMore}>
          LoadMore
        </button>


      )}
    </>
  );
}

export default MovieList;
