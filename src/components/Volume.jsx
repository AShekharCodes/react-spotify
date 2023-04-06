import React from "react";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import "../styles/PlayerControls.css";
import { Slider } from "@mui/material";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";

const Volume = () => {
  const [{ token }] = useStateProvider();
  const setVolume = async (e) => {
    await axios.put(
      `https://api.spotify.com/v1/me/player/volume`,
      {},
      {
        params: { volume_percent: parseInt(e.target.value) },
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
  };
  return (
    <div className="volume">
      <VolumeDownIcon />
      <Slider
        onChange={(e) => setVolume(e)}
        size="small"
        min={0}
        max={100}
        aria-label="Default"
        valueLabelDisplay="auto"
        sx={{ width: "130px", color: "#26eb6b" }}
      />
      <VolumeUpIcon />
    </div>
  );
};

export default Volume;
