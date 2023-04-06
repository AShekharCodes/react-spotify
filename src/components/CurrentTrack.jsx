import React, { useEffect } from "react";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";
import axios from "axios";
import "../styles/CurrentTrack.css";

const CurrentTrack = () => {
  const [{ token, currentlyPlaying }, dispatch] = useStateProvider();
  useEffect(() => {
    const getCurrentTrack = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data !== "") {
        const { item } = response.data;
        const currentlyPlaying = {
          id: item.id,
          name: item.name,
          artists: item.artists.map((artist) => artist.name),
          image: item.album.images[2].url,
        };
        dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
      }
    };
    getCurrentTrack();
  }, [token, dispatch, currentlyPlaying]);
  return (
    <div className="current-info">
      <img src={currentlyPlaying.image} alt="Current" />
      <div className="current-track">
        <span className="current-trackname">{currentlyPlaying.name}</span>
        <span className="current-artist">
          {currentlyPlaying.artists
            ? currentlyPlaying.artists.map((artist, index) => (
                <span key={index}>
                  {artist}
                  {index === currentlyPlaying.artists.length - 1 ? "" : ", "}
                </span>
              ))
            : "Loading..."}
        </span>
      </div>
    </div>
  );
};

export default CurrentTrack;
