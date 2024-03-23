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

// function Copyright() {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center">
//       {"Copyright © ParkWhere "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

const EditName = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (!auth.currentUser) {
      // No authenticated user, redirect to login page
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
      // Handle error
    } finally {
      setLoading(false);
    }
  };

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
        <Avatar sx={{ m: 1, bgcolor: "grey" }}>
          <DriveFileRenameOutlineIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit Your Name
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 2 }}
          width={300}
        >
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

export default EditName;
