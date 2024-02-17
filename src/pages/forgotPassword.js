import React from 'react'
import { Container, Box, Typography } from '@mui/material'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  
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
          <Grid item xs={5}>
            <TextField
                required
                fullWidth
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
              sx = {{ mt: 3, mb: 2 }}
              >Send reset password link
              </Button>
              <Link onClick={() => navigate('/')} variant="body2">
                  Remember your account? Sign in instead
              </Link>
        </Grid>
      </Box>
    </Container>
  )
}

export default ForgotPassword;