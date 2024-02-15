import * as React from 'react';
import { Container, Box, Typography } from '@mui/material';

export default function HomePage() {
    return (
        <Container>
            <Box>
                <Typography variant="h4" component="h1" gutterBottom>
                    Home Page
                </Typography>
            </Box>
        </Container>
    );
}