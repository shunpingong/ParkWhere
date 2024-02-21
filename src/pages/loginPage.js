import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../backend/firebase";
import { GoogleButton } from 'react-google-button';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © ParkWhere '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!auth.currentUser) {
      // No authenticated user, redirect to login page
      navigate('/');
    }
  });

  const HandleSignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate('/homePage');
      })
      .catch((err) => {
        if (err.code === 'auth/user-not-found' || err.code === "auth/invalid-email") {
            setErrorMessage('Invalid Email, no user found with the provided email.');
        } else if (err.code === 'auth/wrong-password') {
            setErrorMessage('Invalid Password, the password is incorrect.');
        }else if (err.code === 'auth/missing-password') {
            setErrorMessage('Please enter your password.');
        }else {
            setErrorMessage(err.message);
        }
        console.log(err);
    });
  };

  const HandleKeyDown = (e) => {
    if (e.key === 'Enter') {
      HandleSignIn(e);
    }
  };

  const navigate = useNavigate();

  const signInWithGoogle = async () => {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      await signInWithPopup(auth, provider)
        .then((result) => {
          const name = result.user.displayName;
          const email = result.user.email;
          const profilePic = result.user.photoURL;

          localStorage.setItem("name", name);
          localStorage.setItem("email", email);
          localStorage.setItem("profilePic", profilePic);

          navigate("/homePage");
        }).catch((error) => {
          console.log(error);
        });
      };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={10}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?parking)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LocalParkingIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in to ParkWhere
            </Typography>
            <Box component="form" noValidate onSubmit={HandleSignIn} onKeyDown = {HandleKeyDown} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
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
                onChange={(e) => setPassword(e.target.value)}
              />
              
              <Typography color="error">{errorMessage}</Typography>
        
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 1, backgroundColor: 'primary.main', '&:hover': { backgroundColor: 'primary.dark' } }}
              >
                Sign In
              </Button>
              <Box
                sx={{
                  pb: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography variant="subtitle1" gutterBottom>Or continue with</Typography>
                <GoogleButton label="Google" onClick={signInWithGoogle} />
              </Box>
              
              <Grid container spacing={1}>  
                <Grid item xs>
                  <Link variant="body2" onClick={() => navigate("/forgot-password")}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link variant="body2" onClick={() => navigate("/sign-up")}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={3}>
                <Typography variant="body2" color="text.secondary" align="center">
                  ParkWhere helps you find parking spots hassle-free.
                </Typography>
              </Box>
              <Copyright />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
