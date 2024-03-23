import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { auth } from "../backend/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const defaultTheme = createTheme();
export default function UserProfile() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      // No authenticated user, redirect to login page
      navigate("/");
    }
  }, [navigate]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container
        component="main"
        sx={{
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "grey",
        }}
        maxWidth="xxl"
      >
        <Box
          sx={{
            backgroundColor: "white",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "30px",
            borderRadius: "20px",
            opacity: "0.9",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "grey" }}>
            <AccountCircleIcon fontSize="medium" />
          </Avatar>
          <Typography component="h1" variant="h5">
            User Profile
          </Typography>
          <Box component="form" noValidate sx={{ mt: 2 }} width={300}>
            <Typography>Name: {auth.currentUser.displayName}</Typography>
            <Typography>Email: {auth.currentUser.email}</Typography>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate("/changepassword")}
              sx={{ mt: 3, mb: 2 }}
            >
              Change Password
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate("/editname")}
              sx={{ mb: 2 }}
              //   sx={{
              //     mt: 1,
              //     mb: 1,
              //     backgroundColor: "primary.main",
              //     "&:hover": { backgroundColor: "primary.dark" },
              //   }}
            >
              Edit Name
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate("/homepage")}
            >
              Cancel
            </Button>
            {/* <Box mt={1}>
              <Typography variant="body2" color="text.secondary" align="center">
                ParkWhere helps you find parking spots hassle-free.
              </Typography>
            </Box>
            <Copyright /> */}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
