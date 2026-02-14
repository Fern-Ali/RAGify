"use client";
import * as React from 'react';
import { useState } from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import BuildIcon from '@mui/icons-material/Build';

import { useNotifications } from '@toolpad/core/useNotifications';
import { useMcp } from '../contexts/McpContext';

export default function McpChat() {
  const [query, setQuery] = useState("");
  const { messages, isLoading, sendMessage, executingTools } = useMcp();
  const notifications = useNotifications();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!query.trim()) {
      return;
    }

    try {
      notifications.show("Sending message to MCP...", { severity: "info", autoHideDuration: 2000 });
      
      await sendMessage(query);
      setQuery(""); // Clear input after sending
      
      notifications.show("Response received!", { severity: "success", autoHideDuration: 2000 });
    } catch (error) {
      console.error("Error sending message:", error);
      notifications.show(`Error: ${error.message}`, { severity: "error", autoHideDuration: 3000 });
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)' }}>
      {/* Messages Area */}
      <Box
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {messages.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              textAlign: 'center',
            }}
          >
            <SmartToyIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Welcome to MCP Chat
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Ask questions and interact with MCP tools
            </Typography>
          </Box>
        ) : (
          messages.map((msg, index) => (
            <Paper
              key={index}
              elevation={1}
              sx={{
                padding: 2,
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '75%',
                backgroundColor: msg.role === 'user' ? 'primary.main' : 'background.paper',
                color: msg.role === 'user' ? 'primary.contrastText' : 'text.primary',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                {msg.role === 'user' ? (
                  <PersonIcon fontSize="small" />
                ) : (
                  <SmartToyIcon fontSize="small" />
                )}
                <Typography variant="caption" fontWeight="bold">
                  {msg.role === 'user' ? 'You' : 'Assistant'}
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                {msg.content}
              </Typography>
              {msg.toolCalls && msg.toolCalls.length > 0 && (
                <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {msg.toolCalls.map((tool, idx) => (
                    <Chip
                      key={idx}
                      icon={<BuildIcon />}
                      label={tool.name || tool}
                      size="small"
                      color="secondary"
                    />
                  ))}
                </Box>
              )}
            </Paper>
          ))
        )}
        
        {/* Show loading indicator when processing */}
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}
        
        {/* Show executing tools */}
        {executingTools.size > 0 && (
          <Paper
            elevation={1}
            sx={{
              padding: 2,
              alignSelf: 'flex-start',
              maxWidth: '75%',
              backgroundColor: 'action.hover',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress size={16} />
              <Typography variant="body2">
                Executing: {Array.from(executingTools).join(', ')}
              </Typography>
            </Box>
          </Paper>
        )}
      </Box>

      {/* Input Area */}
      <Paper
        component="form"
        onSubmit={handleSubmit}
        elevation={3}
        sx={{
          padding: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <TextField
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a question or request a tool..."
          variant="outlined"
          disabled={isLoading}
          size="medium"
        />
        <IconButton
          type="submit"
          color="primary"
          disabled={isLoading || !query.trim()}
          sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
            '&:disabled': {
              backgroundColor: 'action.disabledBackground',
            },
          }}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </Box>
  );
}
