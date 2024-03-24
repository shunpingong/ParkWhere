import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  CssBaseline,
  TextField,
  Button,
  Link,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import KeyIcon from "@mui/icons-material/Key";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "../components/Copyright";

/**
 * A component for displaying forgot password UI.
 * @component
 * @returns {JSX.Element} Forgot Password UI.
 */
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const defaultTheme = createTheme();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send reset password link to user's email
    if (validator.isEmail(email) === false) {
      alert("Invalid email address.");
      return;
    }
    const emalVal = e.target.email.value;
    const auth = getAuth(); // Declare the auth variable
    sendPasswordResetEmail(auth, emalVal)
      .then(() => {
        // Add a comma after the closing parenthesis
        alert("Reset password link sent to your email.");
        navigate("/"); // navigate to sign in page
      })
      .catch((error) => {
        alert(error.message);
      });
  };

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
          backgroundImage: "url(https://source.unsplash.com/random?parking)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <KeyIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Your Password
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 2 }}
            width={300}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              // helperText="Enter email address to reset password."
              placeholder="test@example.com"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 1,
                mb: 1,
                backgroundColor: "primary.main",
                "&:hover": { backgroundColor: "primary.dark" },
              }}
            >
              Send Reset Password Link
            </Button>
            <Box align="end">
              <Link variant="body2" onClick={() => navigate("/")}>
                {"Remember your account? Sign in instead"}
              </Link>
            </Box>
            <Box mt={1}>
              <Typography variant="body2" color="text.secondary" align="center">
                ParkWhere helps you find parking spots hassle-free.
              </Typography>
            </Box>
            <Copyright />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ForgotPassword;
