import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../backend/firebase";
import { useNavigate } from "react-router-dom";
import Gmap from "../components/Gmap";
import Header from "../components/Header";

/**
 * A component for displaying home page UI.
 * @component
 * @returns {JSX.Element} Home Page UI.
 */
export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      // No authenticated user, redirect to login page
      navigate("/");
    }
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        // Sign-out successful.
        navigate("/"); // Redirect to login page
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <Box>
      <Header />

      {/* ParkWhere map Component */}
      <Gmap />
    </Box>
  );
}
