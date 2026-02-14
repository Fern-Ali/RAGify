"use client";
import * as React from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BuildIcon from '@mui/icons-material/Build';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import SettingsIcon from '@mui/icons-material/Settings';
import ExtensionIcon from '@mui/icons-material/Extension';

import { useMcp } from '../contexts/McpContext';
import { useNotifications } from '@toolpad/core/useNotifications';

// Icon mapping for different tool types
const getToolIcon = (toolName) => {
  if (toolName?.toLowerCase().includes('code')) return <CodeIcon />;
  if (toolName?.toLowerCase().includes('storage') || toolName?.toLowerCase().includes('file')) return <StorageIcon />;
  if (toolName?.toLowerCase().includes('config') || toolName?.toLowerCase().includes('setting')) return <SettingsIcon />;
  return <ExtensionIcon />;
};

// Color mapping for tool cards
const getToolColor = (index) => {
  const colors = ['primary', 'secondary', 'success', 'info', 'warning'];
  return colors[index % colors.length];
};

export default function McpToolsSidebar() {
  const { tools, fetchTools, executingTools, toolResults, isLoading } = useMcp();
  const notifications = useNotifications();

  useEffect(() => {
    // Fetch tools when component mounts
    const loadTools = async () => {
      try {
        await fetchTools();
      } catch (error) {
        console.error("Error loading tools:", error);
        notifications.show("Failed to load MCP tools", { severity: "error", autoHideDuration: 3000 });
      }
    };
    
    loadTools();
  }, [fetchTools]);

  if (isLoading && tools.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (tools.length === 0) {
    return (
      <Box sx={{ padding: 2 }}>
        <Alert severity="info">
          No MCP tools available. Check your connection to the gateway.
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <BuildIcon color="primary" />
        MCP Tools
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Available tools: {tools.length}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {tools.map((tool, index) => {
          const isExecuting = executingTools.has(tool.name);
          const result = toolResults[tool.name];
          const color = getToolColor(index);

          return (
            <Card
              key={tool.name}
              elevation={isExecuting ? 8 : 2}
              sx={{
                transition: 'all 0.3s ease',
                border: isExecuting ? `2px solid` : 'none',
                borderColor: isExecuting ? `${color}.main` : 'transparent',
                animation: isExecuting ? 'pulse 1.5s ease-in-out infinite' : 'none',
                '@keyframes pulse': {
                  '0%, 100%': {
                    boxShadow: `0 0 0 0 rgba(0, 0, 0, 0.1)`,
                  },
                  '50%': {
                    boxShadow: `0 0 20px 5px rgba(25, 118, 210, 0.4)`,
                  },
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  {getToolIcon(tool.name)}
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {tool.name}
                  </Typography>
                  {isExecuting && (
                    <CircularProgress size={20} />
                  )}
                  {result?.success && (
                    <CheckCircleIcon color="success" fontSize="small" />
                  )}
                  {result?.success === false && (
                    <ErrorIcon color="error" fontSize="small" />
                  )}
                </Box>

                {tool.description && (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {tool.description}
                  </Typography>
                )}

                {/* Parameters Section */}
                {tool.inputSchema?.properties && Object.keys(tool.inputSchema.properties).length > 0 && (
                  <Accordion elevation={0} sx={{ backgroundColor: 'action.hover' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="body2" fontWeight="medium">
                        Parameters ({Object.keys(tool.inputSchema.properties).length})
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {Object.entries(tool.inputSchema.properties).map(([param, schema]) => (
                          <Chip
                            key={param}
                            label={`${param}${tool.inputSchema.required?.includes(param) ? '*' : ''}`}
                            size="small"
                            variant="outlined"
                            color={color}
                          />
                        ))}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                )}

                {/* Show execution result */}
                {result && (
                  <Alert
                    severity={result.success ? "success" : "error"}
                    sx={{ mt: 2 }}
                  >
                    <Typography variant="caption">
                      {result.success ? "Executed successfully" : `Error: ${result.error}`}
                    </Typography>
                    {result.timestamp && (
                      <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                        {new Date(result.timestamp).toLocaleTimeString()}
                      </Typography>
                    )}
                  </Alert>
                )}
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
}
