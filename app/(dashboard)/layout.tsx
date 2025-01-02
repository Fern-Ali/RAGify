"use client";
import * as React from 'react';
import {
  DashboardLayout,
  ThemeSwitcher,
  type SidebarFooterProps,
} from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';


import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SearchIcon from '@mui/icons-material/Search';


import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import Toolbar from '@mui/material/Toolbar';

import { styled } from '@mui/material';




const drawerWidth = 450;

const ContentWrapper = styled(Box)(({ theme, isDrawerOpen }) => ({
  flexGrow: 1,
  marginRight: isDrawerOpen ? drawerWidth : 0,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
}));

const RightDrawer = styled(Drawer)(({ theme }) => ({
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    transition: theme.transitions.create(['width', 'transform'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

export default function Layout(props: { children: React.ReactNode }) {
  const [isDrawerOpen, setDrawerOpen] = React.useState(true);
  const handleToggleDrawer = () => setDrawerOpen((prev) => !prev);


  function CustomAppTitle() {
    return (
      <Stack direction="row" alignItems="center" spacing={2}>
        <CloudCircleIcon fontSize="large" color="primary" />
        <Typography variant="h6">Ragify</Typography>
        <Chip size="small" label="beta" color="secondary" />
        <Tooltip title="Connected to production">
          <CheckCircleIcon color="success" fontSize="small" />
        </Tooltip>
      </Stack>
    );
  }

  function ToolbarActionsSearch({ onToggleDrawer }) {
    return (
      <Stack direction="row">
        <IconButton onClick={onToggleDrawer} aria-label="Toggle right drawer">
        <ChevronRightIcon />
      </IconButton>
        <Tooltip title="Search" enterDelay={1000}>
          <div>
            <IconButton
              type="button"
              aria-label="search"
              sx={{
                display: { xs: 'inline', md: 'none' },
              }}
            >
              <SearchIcon />
            </IconButton>
          </div>
        </Tooltip>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          slotProps={{
            input: {
              endAdornment: (
                <IconButton type="button" aria-label="search" size="small">
                  <SearchIcon />
                </IconButton>
              ),
              sx: { pr: 0.5 },
            },
          }}
          sx={{ display: { xs: 'none', md: 'inline-block' }, mr: 1 }}
        />
        <ThemeSwitcher />
      </Stack>
    );
  }
  return (
    <DashboardLayout defaultSidebarCollapsed 
    slots={{
      appTitle: CustomAppTitle,
      toolbarActions: () => <ToolbarActionsSearch onToggleDrawer={handleToggleDrawer} />,
      // sidebarFooter: SidebarFooter,
    }}
    // slotProps={{
    //   toolbarActions: {
    //     onToggleDrawer: handleToggleDrawer,
    //   },
    // }}
    >
      {/* Main Content Area */}
      <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        <ContentWrapper isDrawerOpen={isDrawerOpen}>
          <PageContainer maxWidth="xl">
            {props.children}
          </PageContainer>
        </ContentWrapper>

        {/* Right Drawer */}
        <RightDrawer
          variant="persistent"
          anchor="right"
          open={isDrawerOpen}
          sx={{
            '& .MuiDrawer-paper': {
              // borderLeft: `1px solid rgba(0, 0, 0, 0.12)`,
              boxSizing: 'border-box',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              padding: 1,
            }}
          >
            <IconButton onClick={handleToggleDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              padding: 2,
              flexGrow: 1,
              overflow: 'auto',
            }}
          >
            <p>Right Drawer Content</p>
          </Box>
        </RightDrawer>
      </Box>
    </DashboardLayout>
  );
}  
