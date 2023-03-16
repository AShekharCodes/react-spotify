import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Body from "./Body";
import Footer from "./Footer";
import { Grid } from "@mui/material";
import "../styles/Spotify.css";

const Spotify = () => {
  return (
    <>
      <div className="container">
        <div className="spotify-body">
          <Sidebar />
          <div className="body">
            <Navbar />
            <div className="body-contents">
              <Body />
            </div>
          </div>
        </div>
        <div className="spotify-footer">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Spotify;
