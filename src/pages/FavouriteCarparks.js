import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { auth } from "../backend/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Grid } from "@mui/material";
import CarParkDisplay from "../components/CarParkDisplay";
import { useState } from "react";

/**
 * A component for displaying favourite carparks UI.
 * @component
 * @returns {JSX.Element} FavouriteCarparks UI.
 */
export default function FavouriteCarparks() {
  const navigate = useNavigate();
  const carParksPerPage = 3; // Change this value as needed
  const [currentPage, setCurrentPage] = useState(1);
  const defaultTheme = createTheme();

  const carParks = [
    {
      weekdayMin: "30 mins",
      weekdayRate: "$1.20",
      ppCode: "A0006",
      parkingSystem: "C",
      ppName: "AMOY STREET ",
      vehCat: "Car",
      satdayMin: "30 mins",
      satdayRate: "$1.20",
      sunPHMin: "30 mins",
      sunPHRate: "$0.60",
      geometries: [
        {
          coordinates: "29548.345,29292.548",
        },
      ],
      startTime: "08.30 AM",
      parkCapacity: 81,
      endTime: "05.00 PM",
    },
    {
      weekdayMin: "45 mins",
      weekdayRate: "$1.50",
      ppCode: "B0001",
      parkingSystem: "D",
      ppName: "1",
      vehCat: "Car",
      satdayMin: "45 mins",
      satdayRate: "$1.50",
      sunPHMin: "45 mins",
      sunPHRate: "$0.80",
      geometries: [
        {
          coordinates: "12345.678,54321.987",
        },
      ],
      startTime: "09.00 AM",
      parkCapacity: 120,
      endTime: "06.00 PM",
    },
    {
      weekdayMin: "45 mins",
      weekdayRate: "$1.50",
      ppCode: "B0001",
      parkingSystem: "D",
      ppName: "2",
      vehCat: "Car",
      satdayMin: "45 mins",
      satdayRate: "$1.50",
      sunPHMin: "45 mins",
      sunPHRate: "$0.80",
      geometries: [
        {
          coordinates: "12345.678,54321.987",
        },
      ],
      startTime: "09.00 AM",
      parkCapacity: 120,
      endTime: "06.00 PM",
    },
    {
      weekdayMin: "45 mins",
      weekdayRate: "$1.50",
      ppCode: "B0001",
      parkingSystem: "D",
      ppName: "3",
      vehCat: "Car",
      satdayMin: "45 mins",
      satdayRate: "$1.50",
      sunPHMin: "45 mins",
      sunPHRate: "$0.80",
      geometries: [
        {
          coordinates: "12345.678,54321.987",
        },
      ],
      startTime: "09.00 AM",
      parkCapacity: 120,
      endTime: "06.00 PM",
    },
    {
      weekdayMin: "45 mins",
      weekdayRate: "$1.50",
      ppCode: "B0001",
      parkingSystem: "D",
      ppName: "4",
      vehCat: "Car",
      satdayMin: "45 mins",
      satdayRate: "$1.50",
      sunPHMin: "45 mins",
      sunPHRate: "$0.80",
      geometries: [
        {
          coordinates: "12345.678,54321.987",
        },
      ],
      startTime: "09.00 AM",
      parkCapacity: 120,
      endTime: "06.00 PM",
    },
    {
      weekdayMin: "45 mins",
      weekdayRate: "$1.50",
      ppCode: "B0001",
      parkingSystem: "D",
      ppName: "5",
      vehCat: "Car",
      satdayMin: "45 mins",
      satdayRate: "$1.50",
      sunPHMin: "45 mins",
      sunPHRate: "$0.80",
      geometries: [
        {
          coordinates: "12345.678,54321.987",
        },
      ],
      startTime: "09.00 AM",
      parkCapacity: 120,
      endTime: "06.00 PM",
    },
  ];

  const totalCarParks = carParks.length;
  const totalPages = Math.ceil(totalCarParks / carParksPerPage);

  // Calculate the indexes of the first and last car parks to display on the current page
  const indexOfLastCarPark = currentPage * carParksPerPage;
  const indexOfFirstCarPark = indexOfLastCarPark - carParksPerPage;
  const currentCarParks = carParks.slice(
    indexOfFirstCarPark,
    indexOfLastCarPark
  );

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    if (!auth.currentUser) {
      // No authenticated user, redirect to login page
      navigate("/");
    }
  }, [navigate]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container
        component="main"
        sx={{
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "grey",
        }}
        maxWidth="xxl"
      >
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
            <FavoriteIcon fontSize="medium" />
          </Avatar>
          <Typography sx={{ mb: 2 }} component="h1" variant="h5">
            Favourite Carparks
          </Typography>
          <Grid container spacing={2} width={300}>
            {currentCarParks.map((carPark, index) => (
              <Grid item xs={12} key={index}>
                <CarParkDisplay carPark={carPark} />
              </Grid>
            ))}
          </Grid>
          <Typography sx={{ mt: 1 }}>
            Page {currentPage} of {totalPages}
          </Typography>
          <Button disabled={currentPage === totalPages} onClick={nextPage}>
            Next
          </Button>
          <Button disabled={currentPage === 1} onClick={prevPage}>
            Previous
          </Button>
          <Button variant="outlined" onClick={() => navigate("/homepage")}>
            Cancel
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
