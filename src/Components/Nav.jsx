import React from "react";
import ReactDOM from "react-dom";
import "../style/Nav.css";
import heartIcon from "../assets/img/icons/6.png";
import homeIcon from "../assets/img/icons/7.png";
import watchIcon from "../assets/img/icons/8.png";

function Nav({
  activeTab = "home",
  // onTabChange = () => {},
  favoriteCount = 0,
  watchedCount = 0,
  // showFavoritePanel,
  togglePageState,
  favorites,
  setMovies,
  watchedMovies,
  movies,
}) {
  return (
    <aside className="side-bar">
      <div className="sidebar-container">
        <h2 className="sidebar-logo" data-text="Flicker">
          Flicker
        </h2>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-stats">
          <div className="stat-card">
            <img src={heartIcon} alt="" className="stat-icon" />
            <div className="stat-label">Favorites</div>
            <div className="stat-count">{favoriteCount}</div>
          </div>
          <div className="stat-card">
            <img src={watchIcon} alt="" className="stat-icon" />
            <div className="stat-label">Watched</div>
            <div className="stat-count">{watchedCount}</div>
          </div>
        </div>
        <button
          className={`nav-item ${activeTab === "home" ? "active" : ""}`}
          onClick={() => {togglePageState("home")
        setMovies(movies);
      }}
        >
          <img src={homeIcon} alt="Home" className="nav-icon" />
          <span>Home</span>
        </button>
        <button
          className={`nav-item ${activeTab === "favorites" ? "active" : ""}`}
          onClick={() => {
            togglePageState("fav");
            setMovies(favorites);
          }}
        >
          <img src={heartIcon} alt="Favorites" className="nav-icon" />
          <span>Favorites</span>
        </button>
        <button
          className={`nav-item ${activeTab === "watched" ? "active" : ""}`}
          onClick={() => {togglePageState("watch")
            setMovies(watchedMovies); }
          }
        >
          <img src={watchIcon} alt="Watched" className="nav-icon" />
          <span>Watched</span>
        </button>
      </nav>
    </aside>
  );
}

export default Nav;
