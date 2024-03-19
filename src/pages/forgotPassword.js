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

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © ParkWhere "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

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
          t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <CssBaseline />
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
          width={450}
        >
          <TextField
            required
            fullWidth
            type="email"
            id="email"
            label="Email Address"
            helperText="Please enter your email address. We will send you a link to reset your password."
            placeholder="test@example.com"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained" // contained, outlined, text
            sx={{ mt: 2 }}
          >
            Send Reset Password Link
          </Button>
        </Box>
        <Box mt={2} align="end">
          <Link onClick={() => navigate("/")} variant="body2">
            Remember your account? Sign in instead
          </Link>
        </Box>
        <Box mt={2}>
          <Typography variant="body2" color="text.secondary" align="center">
            ParkWhere helps you find parking spots hassle-free.
          </Typography>
          <Copyright />
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
