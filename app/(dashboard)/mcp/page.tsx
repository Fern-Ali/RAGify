"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';

import McpChat from '../components/McpChat';

export default function McpPage() {
  return (
    <Box sx={{ flexGrow: 1, height: '100%' }}>
      <Typography variant="h4" gutterBottom>
        MCP Gateway
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Interact with Model Context Protocol tools and services
      </Typography>
      
      <Paper elevation={2} sx={{ height: 'calc(100vh - 200px)' }}>
        <McpChat />
      </Paper>
    </Box>
  );
}
