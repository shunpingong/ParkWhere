import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../backend/firebase";
import { GoogleButton } from "react-google-button";
import Container from "@mui/material/Container";
import logo from "../assets/logo.png";

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

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const HandleSignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate("/homePage");
      })
      .catch((err) => {
        if (
          err.code === "auth/user-not-found" ||
          err.code === "auth/invalid-email"
        ) {
          setErrorMessage(
            "Invalid Email, no user found with the provided email."
          );
        } else if (err.code === "auth/wrong-password") {
          setErrorMessage("Invalid Password, the password is incorrect.");
        } else if (err.code === "auth/missing-password") {
          setErrorMessage("Please enter your password.");
        } else {
          setErrorMessage(err.message);
        }
        console.log(err);
      });
  };

  const HandleKeyDown = (e) => {
    if (e.key === "Enter") {
      HandleSignIn(e);
    }
  };

  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    await signInWithPopup(auth, provider)
      .then((result) => {
        const name = result.user.displayName;
        const email = result.user.email;
        const profilePic = result.user.photoURL;

        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("profilePic", profilePic);

        navigate("/homePage");
      })
      .catch((error) => {
        console.log(error);
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
          <img src={logo} alt="ParkWhere Logo" style={{ height: "100px" }} />
          <Box
            component="form"
            noValidate
            onSubmit={HandleSignIn}
            onKeyDown={HandleKeyDown}
            sx={{ mt: 1 }}
            width={300}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              // helperText="Enter your email address registered with ParkWhere."
              name="email"
              autoComplete="email"
              autoFocus
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
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // e.target.value is the value of the input field
            />

            <Typography color="error">{errorMessage}</Typography>
            <Box align="end">
              <Link variant="body2" onClick={() => navigate("/forgotpassword")}>
                Forgotten password?
              </Link>
            </Box>
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
              Sign In
            </Button>
            <Box
              sx={{
                pb: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle1" gutterBottom>
                Or continue with
              </Typography>
              <GoogleButton label="Google" onClick={signInWithGoogle} />
            </Box>
            <Box align="end">
              <Link variant="body2" onClick={() => navigate("/signup")}>
                {"Don't have an account? Sign Up"}
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
