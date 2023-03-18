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
      <Grid
        container
        spacing={0}
        sx={{ height: "100vh", width: "100vw", minWidth: "350px" }}
      >
        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ height: "85vh" }}>
          <div className="main-body">
            <div className="sidebar-body">
              <Sidebar />
            </div>
            <div className="body">
              <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Navbar />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Body />
                </Grid>
              </Grid>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ height: "15vh" }}>
          <Footer />
        </Grid>
      </Grid>
    </>
  );
};

export default Spotify;
