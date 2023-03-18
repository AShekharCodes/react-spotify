import React from "react";
import { Box } from "@mui/material";
import "../styles/Login.css";

const login = () => {
  const handleClick = () => {
    const clientId = "9c385797e2ce449db357301fa7d81544";
    const redirectUrl = "http://localhost:3000/";
    const apiUrl = "https://accounts.spotify.com/authorize";
    const scope = [
      "user-read-email",
      "user-read-private",
      "user-modify-playback-state",
      "user-read-playback-state",
      "user-read-currently-playing",
      "user-read-recently-played",
      "user-read-playback-position",
      "user-top-read",
      "playlist-read-private",
    ];
    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(
      " "
    )}&response_type=token&show_dialog=true`;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        gap: "10vh",
        minWidth: "350px",
        backgroundColor: "#1db954",
      }}
    >
      <div className="login-logo">
        <img
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png"
          alt="Spotify"
        />
      </div>

      <button onClick={handleClick}>Connect Spotify</button>
    </Box>
  );
};

export default login;
