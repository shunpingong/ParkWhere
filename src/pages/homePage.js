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
                <Typography variant="h4" component="h1" gutterBottom>
                    Home Page
                </Typography>
            </Box>
            <Button 
                onClick= {handleLogout}
            >
                Logout
            </Button>
        </Container>
    );
}