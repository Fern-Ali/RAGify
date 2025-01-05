import React from 'react';
import { Box, Typography, Button } from '@mui/material';

export default function DefaultState() {
  return (
    <Box sx={{ p: 2, textAlign: 'center' }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Welcome to RAGify!
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Retrieval-Augmented Generation combines real-time knowledge retrieval with AI-powered text generation.
      </Typography>
      <Typography variant="body2" sx={{ mb: 4 }}>
        Ask a question to receive insights supported by references.
      </Typography>
      <a href="/orders">
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        Get Started
      </Button>
      </a>
    </Box>
  );
}
