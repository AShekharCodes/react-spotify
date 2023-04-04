import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";
import { FastAverageColor } from "fast-average-color";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
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
        const color = fac.getColor(img, {
          ignoredColor: [
            [255, 255, 255],
            [0, 0, 0],
          ],
        });
        setDominantColor(color.hex);
      };
      const selectedPlaylist = {
        id: response.data.id,
        name: response.data.name,
        image: playlistImage,
        color: dominantColor,
        description: response.data.description,
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
      <div className="playlist-tracklist">
        <div className="content-header">
          <img
            className="playlist-img"
            src={selectedPlaylist.image}
            alt="Playlist"
          />
          <div className="playlist-info">
            <span className="playlist-name">{selectedPlaylist.name}</span>
            <span className="playlist-desc">
              {selectedPlaylist.description}
            </span>
          </div>
        </div>
        <div className="tracks-info">
          <div className="tracks-info-header">
            <div className="track-number">#</div>
            <div className="track-name">Title</div>
            <div className="album">Album</div>
            <div className="duration">
              <AccessTimeIcon />
            </div>
          </div>
          <hr />
        </div>
        <div className="tracklist">
          <ul>
            {selectedPlaylist.tracks ? (
              selectedPlaylist.tracks.map(
                (
                  {
                    id,
                    name,
                    artists,
                    image,
                    duration,
                    album,
                    context_uri,
                    track_number,
                  },
                  index
                ) => (
                  <div key={index} className="track-div">
                    <li>{index + 1}</li>
                    <img src={image} alt="Track" />
                    <div className="name-div">
                      <span className="name">{name}</span>
                      <span className="artists">{artists}</span>
                    </div>
                  </div>
                )
              )
            ) : (
              <div>Loading...</div>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Body;
