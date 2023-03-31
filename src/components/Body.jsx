import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";
import { FastAverageColor } from "fast-average-color";
import "../styles/style.css";

const Body = () => {
  const [{ token, selectedPlaylistId, selectedPlaylist }, dispatch] =
    useStateProvider();
  const [dominantColor, setDominantColor] = useState(null);
  useEffect(() => {
    const getInitialPlaylist = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const playlistImage = response.data.images[0].url;
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = playlistImage;
      img.onload = () => {
        const fac = new FastAverageColor();
        const color = fac.getColor(img);
        setDominantColor(color.hex);
      };
      const selectedPlaylist = {
        id: response.data.id,
        name: response.data.name,
        type: response.data.type,
        image: playlistImage,
        color: dominantColor,
        description: response.data.description.startsWith("<a")
          ? ""
          : response.data.description,
        tracks: response.data.tracks.items.map(({ track }) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => artist.name),
          image: track.album.images[2].url,
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track: track.track_number,
        })),
      };
      dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });
    };
    getInitialPlaylist();
  }, [token, dispatch, selectedPlaylistId, dominantColor]);
  return (
    <>
      <div className="content-body">Body</div>
    </>
  );
};

export default Body;
