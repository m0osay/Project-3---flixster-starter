import React, { useState, useEffect } from "react";
import "./style/App.css";
import Nav from "./Components/Nav";
import MovieList from "./Components/MovieList";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [clearBool, setClearBool] = useState(false);
  const [searchBool, setSearchBool] = useState(false)

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  
  };

  const handleKeyDown = (e) => {
     if (e.key === 'Enter'){
      setSearchBool(true)
    }

  }
  const handleClearButton = (event) => {
    console.log("Clicked on Clear Butotn, and state " + clearBool)
    setSearchBool(false)
    setClearBool(true);
    setSearchQuery("")

  };


  const handleSearchButton = (event) => {         
  setSearchBool(true);              
};
 

  return (
    <>
      <Nav />
      <div className=" search-container">
        <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange} //updates every key stroke the user inputs
        onKeyDown={handleKeyDown} //this will check if the user pressed enter
        placeholder="Search"
      />
          <button id = "searchButton" onClick={handleSearchButton}> Search</button>
          
          <button id = "clearButton" onClick = {handleClearButton}> Clear</button>

          <select className=" search-input">
          <option value="Popularity"> Popularity </option>
          <option value="Release-date"> Release Date </option>
          <option value="Rating"> Rating </option>
        </select>
      </div>

  

      <body>
        {/* pass props as an object with the three reference */}
    
        <MovieList
          searchQuery={searchQuery}
          searchBool={searchBool}
          clearBool={clearBool}
          setSearchBool={ setSearchBool}
          setClearBool = {setClearBool}
        />
      </body>
    </>
  );
};

export default App;
