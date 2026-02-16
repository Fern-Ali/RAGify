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
  const [toolName, setToolName] = useState("");
  const [toolArgs, setToolArgs] = useState("{}");
  const { messages, isLoading, callTool, executingTools, toolResults } = useMcp();
  const notifications = useNotifications();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!toolName.trim()) {
      notifications.show("Please enter a tool name", { severity: "warning", autoHideDuration: 2000 });
      return;
    }

    try {
      // Parse the JSON arguments
      let args = {};
      try {
        args = JSON.parse(toolArgs);
      } catch (parseError) {
        notifications.show("Invalid JSON in arguments field", { severity: "error", autoHideDuration: 3000 });
        return;
      }

      notifications.show(`Executing tool: ${toolName}`, { severity: "info", autoHideDuration: 2000 });
      
      const result = await callTool(toolName, args);
      
      notifications.show("Tool executed successfully!", { severity: "success", autoHideDuration: 2000 });
      console.log("Tool result:", result);
    } catch (error) {
      console.error("Error executing tool:", error);
      notifications.show(`Error: ${error.message}`, { severity: "error", autoHideDuration: 3000 });
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)' }}>
      {/* Results Area */}
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
        {Object.keys(toolResults).length === 0 ? (
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
            <BuildIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              MCP Tool Execution
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
              Enter a tool name and arguments to execute
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Example: search with {'{'}&#34;query&#34;: &#34;test&#34;{'}'}
            </Typography>
          </Box>
        ) : (
          Object.entries(toolResults).map(([name, result]) => (
            <Paper
              key={name}
              elevation={1}
              sx={{
                padding: 2,
                backgroundColor: result.success ? 'background.paper' : 'error.dark',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <BuildIcon fontSize="small" color={result.success ? 'primary' : 'error'} />
                <Typography variant="subtitle1" fontWeight="bold">
                  {name}
                </Typography>
                <Chip
                  label={result.success ? 'Success' : 'Failed'}
                  size="small"
                  color={result.success ? 'success' : 'error'}
                  sx={{ ml: 'auto' }}
                />
              </Box>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
                {new Date(result.timestamp).toLocaleString()}
              </Typography>
              {result.success ? (
                <Box
                  component="pre"
                  sx={{
                    backgroundColor: 'action.hover',
                    padding: 1,
                    borderRadius: 1,
                    overflow: 'auto',
                    fontSize: '0.875rem',
                  }}
                >
                  {JSON.stringify(result.result, null, 2)}
                </Box>
              ) : (
                <Typography variant="body2" color="error">
                  {result.error}
                </Typography>
              )}
            </Paper>
          ))
        )}
        
        {/* Show executing tools */}
        {executingTools.size > 0 && (
          <Paper
            elevation={1}
            sx={{
              padding: 2,
              backgroundColor: 'action.hover',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress size={20} />
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
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <TextField
          fullWidth
          value={toolName}
          onChange={(e) => setToolName(e.target.value)}
          placeholder="Tool name (e.g., search, fetch_data)"
          variant="outlined"
          disabled={isLoading}
          size="small"
          label="Tool Name"
        />
        <TextField
          fullWidth
          value={toolArgs}
          onChange={(e) => setToolArgs(e.target.value)}
          placeholder='{"key": "value"}'
          variant="outlined"
          disabled={isLoading}
          size="small"
          label="Arguments (JSON)"
          multiline
          rows={3}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton
            type="submit"
            color="primary"
            disabled={isLoading || !toolName.trim()}
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
        </Box>
      </Paper>
    </Box>
  );
}
