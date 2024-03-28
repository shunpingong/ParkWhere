import React, { useState } from "react";
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
import { getAuth, updateProfile } from "firebase/auth";
import { useEffect } from "react";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import Header from "../components/Header";

const EditName = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/");
    }
  }, [auth.currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(currentUser, {
        displayName: `${firstName} ${lastName}`,
      });
      console.log(currentUser.displayName);
      navigate("/userprofile");
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
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
            <DriveFileRenameOutlineIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ marginBottom: "1rem" }}>
            Edit Your Name
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
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

export default EditName;
