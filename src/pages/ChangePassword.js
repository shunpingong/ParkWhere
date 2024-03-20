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
  Grid,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import KeyIcon from "@mui/icons-material/Key";
import { useEffect } from "react";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © ParkWhere "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const ChangePassword = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = getAuth();
  const currentUser = auth.currentUser;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // Handle password change logic
  };

  useEffect(() => {
    if (!auth.currentUser) {
      // No authenticated user, redirect to login page
      navigate("/");
    }
  }, [navigate]);

  return (
    <Container
      component="main"
      maxWidth="xxl"
      sx={{
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "grey",
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
          Change Your Password
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 2 }}
          width={300}
        >
          <TextField
            type="password"
            margin="normal"
            required
            fullWidth
            id="currentPassword"
            label="Current Password"
            name="currentPassword"
            autoComplete="currentPassword"
            autoFocus
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <TextField
            type="password"
            margin="normal"
            required
            fullWidth
            id="newPassword"
            label="New Password"
            name="newPassword"
            autoComplete="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            type="password"
            margin="normal"
            required
            fullWidth
            id="confirmPassword"
            label="Confirm Password"
            name="confirmPassword"
            autoComplete="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={
              loading || !(currentPassword && newPassword && confirmPassword)
            }
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : "Save"}
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => navigate("/userprofile")}
          >
            Cancel
          </Button>
        </Box>
        {/* <Copyright /> */}
      </Box>
    </Container>
  );
};

export default ChangePassword;
