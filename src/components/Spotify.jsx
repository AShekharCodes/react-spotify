import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Body from "./Body";
import Footer from "./Footer";
import { Grid } from "@mui/material";
import "../styles/Spotify.css";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";

const Spotify = () => {
  const [{ token, selectedPlaylist }, dispatch] = useStateProvider();
  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      const userInfo = {
        userId: data.id,
        userName: data.display_name,
        userImage: data.images[0].url,
      };
      dispatch({ type: reducerCases.SET_USER, userInfo });
    };
    getUserInfo();
  }, [dispatch, token]);
  return (
    <>
      <div className="main">
        <Grid
          container
          spacing={0}
          sx={{
            height: "100vh",
            width: "100vw",
            minWidth: "350px",
          }}
        >
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <div className="main-body">
              <div className="sidebar-body">
                <Sidebar />
              </div>
              <div
                className="body"
                style={{
                  backgroundColor: `${
                    selectedPlaylist.color ? selectedPlaylist.color : "#761dc9"
                  }`,
                }}
              >
                <Navbar />
                <Body />
              </div>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            sx={{ backgroundColor: "black" }}
          >
            <Footer />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Spotify;
