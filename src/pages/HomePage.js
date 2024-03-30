import React, { useEffect } from "react";
import { Box } from "@mui/material";
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
  }, [navigate]);

  return (
    <Box>
      <Header />
      {/* ParkWhere map Component */}
      <Gmap />
    </Box>
  );
}
