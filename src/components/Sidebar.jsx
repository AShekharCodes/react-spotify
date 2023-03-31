import React from "react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LibraryMusicRoundedIcon from "@mui/icons-material/LibraryMusicRounded";
import "../styles/Sidebar.css";
import Playlists from "./Playlists";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <div className="top-div">
          <div className="logo-div">
            <img
              src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
              alt="Spotify"
            />
          </div>
          <div className="div-top">
            <ul className="ul-top">
              <li className="li-top">
                <HomeRoundedIcon />
                <span>Home</span>
              </li>
              <li className="li-top">
                <SearchRoundedIcon />

                <span>Search</span>
              </li>
              <li className="li-top">
                <LibraryMusicRoundedIcon />

                <span>Your Library</span>
              </li>
            </ul>
          </div>
          <hr className="bottom-bar" />
        </div>
        <div className="playlists-div">
          <Playlists />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
