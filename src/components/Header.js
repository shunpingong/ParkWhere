import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { signOut } from "firebase/auth";
import { auth } from "../backend/firebase";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Header() {
  const navigate = useNavigate();
  const [mainAnchorEl, setMainAnchorEl] = React.useState(null);
  const [accountAnchorEl, setAccountAnchorEl] = React.useState(null);

  const handleMainMenu = (event) => {
    setMainAnchorEl(event.currentTarget);
  };

  const handleAccountMenu = (event) => {
    setAccountAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setMainAnchorEl(null);
    setAccountAnchorEl(null);
  };

  const handleProfile = () => {
    handleClose();
    navigate("/userprofile");
  };

  const handleMap = () => {
    handleClose();
    navigate("/homepage");
  };

  const handleFavourites = () => {
    handleClose();
    navigate("/favouritecarparks");
  };

  useEffect(() => {
    if (!auth.currentUser) {
      // No authenticated user, redirect to login page
      navigate("/");
    }
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        handleClose();
        localStorage.clear();
        // Sign-out successful.
        navigate("/"); // Redirect to login page
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.log("Error signing out");
      });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "#18328F" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMainMenu}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-main"
            anchorEl={mainAnchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(mainAnchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleMap}>Map</MenuItem>
            <MenuItem onClick={handleFavourites}>Favourite</MenuItem>
          </Menu>

          <Typography
            variant="h6"
            component="a"
            sx={{ flexGrow: 1, color: "white" }}
            onClick={() => navigate("/homepage")}
          >
            ParkWhere
          </Typography>
          <img src={logo} alt="ParkWhere Logo" style={{ height: "50px" }} />
          {auth && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ paddingRight: "10px" }}>
                Hello {auth.currentUser.displayName}!
              </Typography>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleAccountMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-account"
                anchorEl={accountAnchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(accountAnchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
