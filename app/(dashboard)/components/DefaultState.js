import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import Features from './Features';

export default function DefaultState() {
  return (
    <Features></Features>
    // <Box
    // sx={{
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     // minHeight: "100vh",
    //     backgroundColor: "background.default",
    //     padding: 4,
    // }}
    // >
    // <Paper
    //     elevation={3}
    //     sx={{
    //     maxWidth: "600px",
    //     padding: 4,
    //     textAlign: "center",
    //     backgroundColor: "background.paper",
    //     borderRadius: "8px",
    //     }}
    // >
    //     <Typography
    //     variant="h3"
    //     sx={{ marginBottom: 2, fontWeight: "bold", color: "primary.main" }}
    //     >
    //     Welcome to RAGify!
    //     </Typography>
    //     <Typography
    //     variant="body1"
    //     sx={{ marginBottom: 2, color: "text.secondary" }}
    //     >
    //     Retrieval-Augmented Generation combines real-time knowledge retrieval
    //     with AI-powered text generation.
    //     </Typography>
    //     <Typography
    //     variant="body2"
    //     sx={{ marginBottom: 4, color: "text.secondary" }}
    //     >
    //     Ask a question to receive insights supported by references. Responses
    //     will generate the source documentation the model uses for retrieving your
    //     answer in the right side panel.
    //     </Typography>
    //     <Typography
    //     variant="body2"
    //     sx={{ marginBottom: 4, color: "text.secondary" }}
    //     >
    //     Click on your previous responses to repopulate the right side panel with
    //     the resources used to generate that response.
    //     </Typography>
    //     <Button
    //     variant="contained"
    //     size="large"
    //     href="/orders"
    //     sx={{
    //         borderRadius: "24px",
    //         paddingX: 4,
    //         paddingY: 1.5,
    //         backgroundColor: "primary.main",
    //         "&:hover": {
    //         backgroundColor: "primary.dark",
    //         },
    //     }}
    //     >
    //     Get Started
    //     </Button>
    // </Paper>
    // </Box>

  );
}
