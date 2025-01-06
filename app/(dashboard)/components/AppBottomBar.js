
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

import TextField from '@mui/material/TextField';

export default function AppBottomBar({isDrawerOpen, loading, error, handleSubmit, query, isNavigationExpanded}) {
  const drawerWidth = 600;
  console.log(isDrawerOpen)
  const leftPanelWidth = isNavigationExpanded ? 320 : 64;
  console.log(leftPanelWidth)
  console.log(isNavigationExpanded)
  return (
    <React.Fragment>
      <AppBar 
      position="fixed" 
      color="primary" 
      sx={{ 
        top: 'auto',
        bottom: 0,
        left: isNavigationExpanded ? `${320}px`: `${64}px`, // Adjust for left panel width
        right: isDrawerOpen ? `${0}px` : 0, // Adjust for right drawer
        width: isDrawerOpen 
          ? `calc(100% - ${leftPanelWidth + drawerWidth}px)` // Adjust width for both left and right panels
          : `calc(100% - ${leftPanelWidth + drawerWidth}px)`, // Only adjust for left panel
        margin: 0, // No horizontal margin since we handle positioning with `left` and `right`
        transition: 'all 0.3s ease', // Smooth transition for better UX
        // maxWidth: "md"
        }}>
          <TextField multiline></TextField>
         {/* <form onSubmit={handleSubmit}>
        <label htmlFor="query">Enter your query:</label>
        <TextField
          id="query"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask Bedrock a question..."
          required
          multiline
          // rows={4}
          fullWidth
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
      
      {error && <p style={{ color: "red" }}>Error: {error}</p>} */}
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}