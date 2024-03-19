import * as React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth } from "../backend/firebase";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Gmap from '../components/Gmap';
import Location from '../components/Location';

export default function HomePage() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.currentUser) {
            // No authenticated user, redirect to login page
            navigate('/');
        }
    }, [navigate]);
    
    const handleLogout = () => {               
        signOut(auth).then(() => {
            localStorage.clear();
            // Sign-out successful.
            navigate("/"); // Redirect to login page
            console.log("Signed out successfully");
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <Box>
            <Typography variant="h2" component="h1" gutterBottom>
                Home Page
            </Typography>
            <Location>
                <Typography variant="h3" component="h2" gutterBottom>
                    {localStorage.getItem("name")}
                </Typography>
                <Typography variant="h4" component="h3" gutterBottom>
                    {localStorage.getItem("email")}
                </Typography>
                <img src={localStorage.getItem("profilePic")} alt="Profile Picture" />
            </Location>
            <Gmap />
                <Button onClick={() => navigate('/changepassword')}>
                    Change Password
                </Button>
                <Button onClick={() => navigate('/editname')}>
                    Edit Name
                </Button>
                <Button onClick={handleLogout}>
                    Logout
                </Button>
            </Box>
    );
}