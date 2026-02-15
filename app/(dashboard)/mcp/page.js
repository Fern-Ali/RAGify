"use client";
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { McpProvider } from '../contexts/McpContext';
import McpToolsSidebar from '../components/McpToolsSidebar';
import McpChat from '../components/McpChat';

export default function McpPage() {
  const [selectedTool, setSelectedTool] = React.useState(null);

  const handleToolSelect = (tool) => {
    console.log('[McpPage] Tool selected:', tool);
    setSelectedTool(tool);
  };

  return (
    <McpProvider>
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          MCP Integration Demo
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          This page demonstrates the Model Context Protocol (MCP) integration using JSON-RPC 2.0.
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ height: '100%' }}>
              <McpToolsSidebar onToolSelect={handleToolSelect} />
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <Paper elevation={2}>
              <McpChat />
              
              {selectedTool && (
                <Box sx={{ p: 2, mt: 2, bgcolor: 'grey.50' }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Selected Tool:
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {selectedTool.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedTool.description}
                  </Typography>
                  {selectedTool.inputSchema && (
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="caption" display="block">
                        Input Schema:
                      </Typography>
                      <Box
                        component="pre"
                        sx={{
                          fontSize: '0.75rem',
                          fontFamily: 'monospace',
                          overflow: 'auto',
                          maxHeight: '200px',
                        }}
                      >
                        {JSON.stringify(selectedTool.inputSchema, null, 2)}
                      </Box>
                    </Box>
                  )}
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </McpProvider>
  );
}
