import React from "react";
import "../styles/style.css";
import CurrentTrack from "./CurrentTrack";
import PlayerControls from "./PlayerControls";

import Volume from "./Volume";

const Footer = () => {
  return (
    <div className="footer">
      <CurrentTrack />
      <PlayerControls />
      <Volume />
    </div>
  );
};

export default Footer;
