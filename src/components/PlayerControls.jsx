import React from "react";
import "../styles/PlayerControls.css";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import RepeatIcon from "@mui/icons-material/Repeat";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";
import axios from "axios";

const PlayerControls = () => {
  const [{ token, playerState }, dispatch] = useStateProvider();
  const changeTrack = async (type) => {
    await axios.post(
      `https://api.spotify.com/v1/me/player/${type}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
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
  const changeState = async () => {
    const state = playerState ? "pause" : "play";
    await axios.put(
      `https://api.spotify.com/v1/me/player/${state}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: reducerCases.SET_PLAYER_STATE,
      playerState: !playerState,
    });
  };
  return (
    <div className="player">
      <ShuffleIcon />
      <SkipPreviousIcon
        onClick={() => changeTrack("previous")}
        sx={{ width: "30px", height: "30px" }}
      />
      {playerState ? (
        <PauseCircleFilledIcon
          sx={{ width: "50px", height: "50px" }}
          onClick={changeState}
        />
      ) : (
        <PlayCircleIcon
          sx={{ width: "50px", height: "50px" }}
          onClick={changeState}
        />
      )}
      <SkipNextIcon
        onClick={() => changeTrack("next")}
        sx={{ width: "30px", height: "30px" }}
      />
      <RepeatIcon />
    </div>
  );
};

export default PlayerControls;
