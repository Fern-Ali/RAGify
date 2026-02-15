"use client";
import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import { useMcp } from '../contexts/McpContext';

export default function McpToolsSidebar({ onToolSelect }) {
  const { tools, loading, error, fetchTools } = useMcp();

  useEffect(() => {
    // Fetch tools when component mounts
    fetchTools().catch((err) => {
      console.error('[McpToolsSidebar] Failed to fetch tools:', err);
    });
  }, [fetchTools]);

  if (loading && tools.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error && tools.length === 0) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">
          <Typography variant="body2">
            Failed to load MCP tools: {error}
          </Typography>
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        MCP Tools
      </Typography>
      
      {tools.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No tools available
        </Typography>
      ) : (
        <List>
          {tools.map((tool) => (
            <ListItem key={tool.name} disablePadding>
              <ListItemButton 
                onClick={() => onToolSelect && onToolSelect(tool)}
              >
                <ListItemText
                  primary={tool.name}
                  secondary={tool.description}
                  primaryTypographyProps={{ variant: 'body1' }}
                  secondaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}

      {tools.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Chip 
            label={`${tools.length} tool${tools.length !== 1 ? 's' : ''} available`} 
            size="small" 
            color="primary" 
            variant="outlined"
          />
        </Box>
      )}
    </Box>
  );
}
