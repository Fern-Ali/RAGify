"use client";
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useMcp } from '../contexts/McpContext';

export default function McpChat() {
  const { callTool, loading, error } = useMcp();
  const [toolName, setToolName] = useState('');
  const [toolArgs, setToolArgs] = useState('{}');
  const [result, setResult] = useState(null);
  const [localError, setLocalError] = useState(null);

  const handleCallTool = async () => {
    setLocalError(null);
    setResult(null);

    try {
      // Parse the arguments JSON
      let args = {};
      if (toolArgs.trim()) {
        try {
          args = JSON.parse(toolArgs);
        } catch (e) {
          setLocalError('Invalid JSON arguments: ' + e.message);
          return;
        }
      }

      console.log('[McpChat] Calling tool:', toolName, 'with args:', args);
      const response = await callTool(toolName, args);
      console.log('[McpChat] Tool response:', response);
      setResult(response);
    } catch (err) {
      console.error('[McpChat] Error calling tool:', err);
      setLocalError(err.message);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        MCP Tool Execution
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="Tool Name"
          variant="outlined"
          fullWidth
          value={toolName}
          onChange={(e) => setToolName(e.target.value)}
          placeholder="e.g., search, analyze, transform"
        />

        <TextField
          label="Tool Arguments (JSON)"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={toolArgs}
          onChange={(e) => setToolArgs(e.target.value)}
          placeholder='{"param1": "value1", "param2": "value2"}'
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleCallTool}
          disabled={!toolName || loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {loading ? 'Executing...' : 'Execute Tool'}
        </Button>

        {(error || localError) && (
          <Alert severity="error">
            {localError || error}
          </Alert>
        )}

        {result && (
          <Paper sx={{ p: 2, bgcolor: 'grey.100' }}>
            <Typography variant="subtitle2" gutterBottom>
              Result:
            </Typography>
            <Box
              component="pre"
              sx={{
                overflow: 'auto',
                fontSize: '0.875rem',
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
              }}
            >
              {JSON.stringify(result, null, 2)}
            </Box>
          </Paper>
        )}
      </Stack>
    </Box>
  );
}
