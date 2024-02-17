import * as React from 'react';
import { Container, Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { signOut } from 'firebase/auth';
import { auth } from "../backend/firebase";
import { useNavigate } from 'react-router-dom';

export default function HomePage() {

    const navigate = useNavigate();

    const handleLogout = () => {               
        signOut(auth).then(() => {
            localStorage.clear();
        // Sign-out successful.
            navigate("/"); // Redirect to login page
            console.log("Signed out successfully")
        }).catch((error) => {
        // An error happened.
        });
    }

    return (
        <Container>
            <Box>
                <Typography variant="h2" component="h1" gutterBottom>
                    Home Page
                </Typography>
                <Typography variant="h3" component="h2" gutterBottom>
                    {localStorage.getItem("name")}
                </Typography>
                <Typography variant="h4" component="h3" gutterBottom>
                    {localStorage.getItem("email")}
                </Typography>
                <img src={localStorage.getItem("profilePic")} alt="Profile Picture" />

            </Box>
            <Button 
                onClick= {handleLogout}
            >
                Logout
            </Button>
        </Container>
    );
}