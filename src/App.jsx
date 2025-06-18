import React, { useState } from "react";
import "./style/App.css";
import Nav from "./Components/Nav";
import MovieList from "./Components/MovieList";
import MovieCard from "./Components/MovieCard";

const App = () => {
  const [favs, setFavs] = useState([]);
  const [watched, setWatched] = useState([]);
  const [movies, setMovies] = useState([]);
  const [activeTab, setActiveTab] = useState("home");
  const [showFavoritesPanel, setShowFavoritesPanel] = useState(false); //toggles whether the panel is expanded or not by default its false

  //the purpose of this function is to add or remove movies from favorite when the user hearts or unhearts it
  const onToggleHeart = (movie) => {
    setFavs((prev) => {
      const exists = prev.some((m) => m.id === movie.id);
      if (exists) {
        // remove it
        return prev.filter((m) => m.id !== movie.id);
      } else {
        // add it
        return [...prev, movie];
      }
    });
  };
  //the purpose of this function is to add or remove movies from watched when the user hearts or unhearts it
  const onToggleWatch = (movie) => {
    setWatched((prev) => {
      const exists = prev.some((m) => m.id === movie.id);
      if (exists) {
        return prev.filter((m) => m.id !== movie.id);
      } else {
        return [...prev, movie];
      }
    });
    console.log(watched);
  };

  //this toggles our favoiret pannel from the Nav function
  const handlePageState = (state) => {
    console.log("page state", state);
    setActiveTab(state);
  };

  return (
    <>

      <div className="side-bar">
        <Nav
          activeTab={activeTab}
          favoriteCount={favs.length}
          watchedCount={watched.length}
          // showFavoritePanel={showFavoritesPanel}
          // setShowFavoritePanel={setShowFavoritesPanel}
          togglePageState={handlePageState}
          favorites={favs}
          watchedMovies={watched}
          setMovies={setMovies}
           movies={movies}
        />
      </div>

      <div className="main-side">
        <MovieList
          setMovies={setMovies}
          movies={movies}
          favSet={favs}
          watchedSet={watched}
          onToggleHeart={onToggleHeart}
          onToggleWatch={onToggleWatch}
          activeTab={activeTab}
        />

      </div>


 
    </>
  );
};

export default App;
