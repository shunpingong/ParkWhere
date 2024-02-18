import React, { useState } from 'react';
import { Container, Box, Typography, CssBaseline, TextField, Button, Link, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import KeyIcon from '@mui/icons-material/Key';
import OtpInput from 'react-otp-input';

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
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const handleSendOTP = (e) => {
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

  const handleResetPassword = (e) => {
    e.preventDefault(); // prevent page from refreshing
    if (validator.isStrongPassword(password) === false) {
      alert('Password should be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character.');
      return;
    }
    else if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    alert('Password reset successfully.');
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
        <Box component="form" noValidate onSubmit={handleSendOTP} sx={{ mt: 2 }}>
          <TextField
            required
            fullWidth
            type="email"
            id="email"
            label="Email Address"
            helperText="Please enter your email address. We will send you a OTP to reset your password."
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
        <Box 
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h2">
            Input OTP and New Password
          </Typography>
          <Box component="form" noValidate onSubmit={handleResetPassword} sx={{ mt: 2 }}>
            <TextField
              required
              fullWidth
              type="password"
              id="password"
              label="New Password"
              helperText="Please enter your new password."
              placeholder="Password"
              name="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              required
              fullWidth
              type="password"
              id="confirmPassword"
              label="Confirm New Password"
              helperText="Please confirm your new password."
              placeholder="Password"
              name="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{ mt: 2 , mb:2 }}
            />
            <OtpInput
              
              containerStyle={{ justifyContent: 'center', marginTop: 2 }}
              inputStyle={{ width: '40px', height: '40px', fontSize: '20px' }}
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
              sx={{ mt: 2 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained" // contained, outlined, text
              sx={{ mt: 2 }}
            >
              Reset Password
            </Button>
          </Box>
        </Box>
      </Box>
      <Box mt={2} align="end">
        <Link onClick={() => navigate('/')} variant="body2">
          Remember your account? Sign in instead
        </Link>
      </Box>
      <Box mt={2}>
        <Typography variant="body2" color="text.secondary" align="center">
          ParkWhere helps you find parking spots hassle-free.
        </Typography>
      </Box>
      <Copyright />
    </Container>
  );
}

export default ForgotPassword;
