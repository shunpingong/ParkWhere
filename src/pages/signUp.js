import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../backend/firebase";
import { useNavigate } from 'react-router-dom';
import validator from 'validator';

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

export default function SignUp() {
    const [errorMessage, setErrorMessage] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [tel, setTel] = useState('');

    const navigate = useNavigate();

    const handleSignUp = (e) => {
        e.preventDefault(); // prevent page from refreshing
        // Additional validation for name and phone number
        if (!name.trim()) {
            setErrorMessage('Name should not be empty.');
            return;
        }
        if (validator.isMobilePhone(tel, 'en-SG') === false) {
            setErrorMessage('Invalid phone number.');
            return;
        }
        createUserWithEmailAndPassword(auth, email, password) // create user with email and password
            .then(() => { // if successful
                navigate('/homePage'); // navigate to main menu page
            })
            .catch((err) => { // if unsuccessful
                switch (err.code) {
                    case 'auth/email-already-in-use':
                        setErrorMessage(`This email address is already in use.`);
                        break;
                    case 'auth/invalid-email':
                        setErrorMessage(`This email address is invalid.`);
                        break;
                    case 'auth/operation-not-allowed':
                        setErrorMessage(`Unexpected error during sign up.`);
                        break;
                    case 'auth/weak-password':
                        setErrorMessage('Password is not strong enough. Add additional characters including special characters and numbers.');
                        break;
                    case 'auth/missing-password':
                        setErrorMessage('Password is empty.');
                        break;
                    default:
                        setErrorMessage(err.message);
                        break;
                }
            });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSignUp} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="name"
                                    label="Full Name"
                                    placeholder='Lim Bo Seng'
                                    type="text"
                                    id="name"
                                    autoComplete="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="tel"
                                    label="Phone Number"
                                    placeholder='+65xxxxxxxx'
                                    helperText="Please enter your phone number in the format +65xxxxxxxx"
                                    type="tel"
                                    id="tel"
                                    autoComplete="tel"
                                    value={tel}
                                    onChange={(e) => setTel(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    placeholder='test@example.com'
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
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
                            </Grid>
                        </Grid>
                        <Box mt={2} mb={1}>
                            <Typography variant="body2" color="error">
                                {errorMessage}
                            </Typography>
                        </Box>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link onClick={() => navigate('/')} variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Box mt={3}>
                    <Typography variant="body2" color="text.secondary" align="center">
                        ParkWhere helps you find parking spots hassle-free.
                    </Typography>
                </Box>
                <Copyright />
            </Container>
        </ThemeProvider>
    );
}
