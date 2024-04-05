import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { auth } from "../../backend/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Header from "../../components/Maps/Header";
import { signOut } from "firebase/auth";

/**
 * A component for displaying user profile UI.
 * @component
 * @returns {JSX.Element} User Profile UI.
 */
export default function UserProfile() {
  const navigate = useNavigate();
  const defaultTheme = createTheme();

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
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
    <>
      <Header />
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Container
          component="main"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100vh",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          maxWidth="xxl"
        >
          <Box
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "30px",
              borderRadius: "20px",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "grey", width: 100, height: 100 }}>
              <AccountCircleIcon
                sx={{ m: 1, bgcolor: "grey", width: 80, height: 80 }}
              />
            </Avatar>
            <Typography variant="h4" align="center" gutterBottom>
              User Profile
            </Typography>
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Name: {auth.currentUser.displayName}
                <Button
                  variant="outlined"
                  onClick={() => navigate("/editname")}
                  sx={{ ml: 1 }}
                >
                  Edit Name
                </Button>
              </Typography>
              <Typography variant="h6" gutterBottom>
                Email: {auth.currentUser.email}
              </Typography>
            </Paper>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => navigate("/changepassword")}
              sx={{ mb: 2 }}
            >
              Change Password
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="error"
              onClick={handleLogout}
              sx={{ mb: 2 }}
            >
              Logout
            </Button>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
