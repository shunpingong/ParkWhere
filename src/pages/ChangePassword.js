import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  CssBaseline,
  TextField,
  Button,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import LockIcon from "@mui/icons-material/Lock";
import Header from "../components/Header";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = getAuth();

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/");
    }
  }, [auth.currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      setLoading(false);
      return;
    }
    setLoading(false);
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      currentPassword
    );

    try {
      await reauthenticateWithCredential(auth.currentUser, credential);
    } catch (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    await updatePassword(auth.currentUser, newPassword)
      .then(() => {
        setLoading(false);
        alert("Password updated successfully");
        navigate("/userprofile");
      })
      .catch((error) => {
        setLoading(false);
        alert(error.message);
      });
  };

  return (
    <>
      <Header />
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "2rem",
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: "2rem",
            padding: "2rem",
            borderRadius: "10px",
            backgroundColor: "#ffffff",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#1976d2" }}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ marginBottom: "1rem" }}>
            Change Your Password
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
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
              sx={{ marginTop: "1rem" }}
            >
              {loading ? <CircularProgress size={24} /> : "Save"}
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate("/userprofile")}
              sx={{ marginTop: "1rem" }}
            >
              Cancel
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default ChangePassword;
