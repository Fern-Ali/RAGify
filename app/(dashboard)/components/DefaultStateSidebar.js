import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { HelpOutline, Insights, History, AutoAwesome } from '@mui/icons-material';

export default function DefaultState() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
        padding: 4,
      }}
    >
      <Box
        elevation={3}
        sx={{
          maxWidth: '600px',
          padding: 4,
          textAlign: 'left',
          backgroundColor: 'background.paper',
          borderRadius: '8px',
        }}
      >
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: 'text.primary' }}
        >
          RAGify your Workflow!
        </Typography>
        <Typography
          variant="body1"
          sx={{ marginBottom: 2, color: 'text.secondary' }}
        >
          Discover how RAGify simplifies retrieval-augmented generation to
          provide smarter, faster answers.
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <HelpOutline sx={{ marginRight: 1, color: 'primary.main' }} />
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Ask a question to receive insights supported by references.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <Insights sx={{ marginRight: 1, color: 'primary.main' }} />
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Responses will generate the source documentation the model uses for
            retrieving your answer here, in the smart panel.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <History sx={{ marginRight: 1, color: 'primary.main' }} />
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Click on your previous responses to repopulate the smart panel with
            the resources used to generate that response.
          </Typography>
        </Box>

        <Button
          variant="contained"
          size="large"
          href="/rag/models"
          sx={{
            mt: 2
          }}
          endIcon={<AutoAwesome />}   
        >
          Get Started
        </Button>
      </Box>
    </Box>
  );
}
