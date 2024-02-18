import React from 'react'
import { Container, Box, Typography } from '@mui/material'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
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
    else {
      // Send reset password link to user's email
      // ...
      alert('Reset password link sent to your email.');
      navigate('/'); // navigate to sign in page
    }
  }

  return (
    <Container>
      <Box>
        <Typography 
        variant="h4"
        gutterBottom
        sx = {{ 
          display : 'flex', 
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          Reset Your Password
        </Typography>
        <Box component = "form" noValidate onSubmit = {handleResetPassword} sx = {{ mt: 2 }}>
          <Grid item xs={5}>
            <TextField
                required
                fullWidth
                input type="email"
                id="email"
                label="Email Address"
                helperText ="Please enter your email address. We will send you a link to reset your password."
                placeholder='test@example.com'
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type = "submit"
              fullWidth
              variant='contained' //contained, outlined, text
              sx = {{ mt: 2, mb: 2 }}
              >Send reset password link
              </Button>
              <Link onClick={() => navigate('/')} variant="body2">
                  Remember your account? Sign in instead
              </Link>
          </Grid>
        </Box>
      </Box>
      <Box mt={3}>
        <Typography variant="body2" color="text.secondary" align="center">
          ParkWhere helps you find parking spots hassle-free.
        </Typography>
      </Box>
      <Copyright/>
    </Container>
  )
}

export default ForgotPassword;