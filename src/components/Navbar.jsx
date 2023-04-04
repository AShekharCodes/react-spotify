import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Box, Drawer, IconButton, Toolbar, Avatar } from "@mui/material/";
import MenuIcon from "@mui/icons-material/Menu";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
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
      <Sidebar onClick={handleDrawerToggle} />
    </Box>
  );

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          height: "56px",
          margin: "5px",
          // backgroundColor: "rgba(0, 0, 0, 0.4)",
          borderRadius: "30px",
          // boxShadow: "1px 2px 5px",
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
                padding: "0px 5px 0px 17px",
              }}
            >
              <MenuIcon sx={{ color: "white" }} />
            </IconButton>
          </Toolbar>
        </div>
        <div className="search-div">
          <SearchRoundedIcon />
          <input type="text" placeholder="Songs, artists and more" />
        </div>
        <div className="user-info">
          <Avatar
            src={userInfo.userImage}
            alt="display_image"
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
    </div>
  );
};

export default Navbar;
