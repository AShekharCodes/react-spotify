import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Box, Drawer, IconButton, Toolbar, Avatar } from "@mui/material/";
import MenuIcon from "@mui/icons-material/Menu";
import { useStateProvider } from "../utils/StateProvider";
import "../styles/Navbar.css";

const Navbar = () => {
  const [{ userInfo }] = useStateProvider();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // the drawer that pops up from left in small screen devices
  const drawer = (
    <Box sx={{ height: "100%" }}>
      <Sidebar />
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        height: "56px",
        margin: "5px",
        position: "relative",
        // backgroundColor: "rgba(0,0,0, 0.5)",
        border: "1px solid black",
        borderRadius: "30px",
        // justifyContent: "flex-end",
      }}
    >
      <div>
        <Toolbar
          disableGutters
          sx={{
            display: { sm: "none" },
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              display: { sm: "none" },
              padding: "0px 15px 0px 25px",
            }}
          >
            <MenuIcon sx={{ color: "white" }} />
          </IconButton>
        </Toolbar>
      </div>
      {/* <Box
        sx={{
          display: { xs: "block", sm: "none" },
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <img
          style={{
            width: "122px",
            height: "36px",
            position: "relative",
            padding: "10px",
            cursor: "pointer",
          }}
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
          alt="Spotify"
        />
      </Box> */}
      <div className="user-info">
        <Avatar
          src={userInfo.userImage}
          sx={{ width: "40px", height: "40px" }}
        />
        <span>{userInfo.userName}</span>
      </div>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            // blur in drawer's background
            backdropFilter: "blur(8px)",
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Navbar;
