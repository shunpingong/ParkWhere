import React, { useState } from 'react';
import { Container, Box, Typography, CssBaseline, TextField, Button, Link, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import KeyIcon from '@mui/icons-material/Key';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © ParkWhere '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  
  const handleResetPassword = (e) => {
    e.preventDefault(); // prevent page from refreshing
    // Send reset password link to user's email
    if (validator.isEmail(email) === false) {
      alert('Invalid email address.');
      return;
    }
    // Here you can call your API to send the reset password link to the email
    alert('Reset password link sent to your email.');
    navigate('/'); // navigate to sign in page
  }

  return (
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
          <KeyIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Your Password
        </Typography>
        <Box component="form" noValidate onSubmit={handleResetPassword} sx={{ mt: 2 }}>
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
            sx={{ mt: 2, mb: 2 }}
          >
            Send Reset Password Link
          </Button>
          <Link onClick={() => navigate('/')} variant="body2">
            Remember your account? Sign in instead
          </Link>
        </Box>
      </Box>
      <Box mt={3}>
        <Typography variant="body2" color="text.secondary" align="center">
          ParkWhere helps you find parking spots hassle-free.
        </Typography>
      </Box>
      <Copyright />
    </Container>
  );
}

export default ForgotPassword;
