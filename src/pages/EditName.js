import React, { useState } from 'react';
import { Container, Box, Typography, CssBaseline, TextField, Button, Link, Avatar, Grid, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAuth, updateProfile } from 'firebase/auth';
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

const EditName = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);

  const auth = getAuth();
  const currentUser = auth.currentUser;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(currentUser, {
        displayName: `${firstName} ${lastName}`
      });
      console.log(currentUser.displayName);
      navigate('/homepage');
    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle error
    } finally {
      setLoading(false);
    }
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
          Edit Your Name
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="firstName"
            autoFocus
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading || !(firstName && lastName)}
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Save'}
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => navigate('/homepage')}
          >
            Cancel
          </Button>
        </Box>
      </Box>
      <Box mt={2}>
      <Copyright />
      </Box>
    </Container>
  );
}

export default EditName;
