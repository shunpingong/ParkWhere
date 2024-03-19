import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../backend/firebase";
import { useNavigate } from "react-router-dom";
import validator from "validator";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © ParkWhere "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignUp() {
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");

  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault(); // prevent page from refreshing
    // Additional validation for name and phone number
    if (!name.trim()) {
      setErrorMessage("Name should not be empty.");
      return;
    }
    if (validator.isMobilePhone(tel, "en-SG") === false) {
      setErrorMessage("Invalid phone number.");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password) // create user with email and password
      .then(() => {
        // if successful
        navigate("/homePage"); // navigate to main menu page
      })
      .catch((err) => {
        // if unsuccessful
        switch (err.code) {
          case "auth/email-already-in-use":
            setErrorMessage(`This email address is already in use.`);
            break;
          case "auth/invalid-email":
            setErrorMessage(`This email address is invalid.`);
            break;
          case "auth/operation-not-allowed":
            setErrorMessage(`Unexpected error during sign up.`);
            break;
          case "auth/weak-password":
            setErrorMessage(
              "Password is not strong enough. Add additional characters including special characters and numbers."
            );
            break;
          case "auth/missing-password":
            setErrorMessage("Password is empty.");
            break;
          default:
            setErrorMessage(err.message);
            break;
        }
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSignUp}
            sx={{ mt: 2 }}
            width={300}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              placeholder="John Doe"
              autoFocus
              // helperText="Enter your email address registered with ParkWhere."
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="tel"
              label="Phone Number"
              placeholder="+65xxxxxxxx"
              type="tel"
              id="tel"
              autoComplete="tel"
              value={tel}
              onChange={(e) => setTel(e.target.value)} // e.target.value is the value of the input field
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              // helperText="Enter your email address registered with ParkWhere."
              placeholder="test@example.com"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Typography variant="body2" color="error">
              {errorMessage}
            </Typography>
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
              Sign Up
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
}
