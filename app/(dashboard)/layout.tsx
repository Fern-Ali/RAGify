"use client";
import * as React from "react";
import {
  DashboardLayout,
  ThemeSwitcher,
  type SidebarFooterProps,
} from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import { styled, useTheme, useMediaQuery } from "@mui/material";

import CloudCircleIcon from "@mui/icons-material/CloudCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import CloseIcon from "@mui/icons-material/Close";

import { useRightPanel } from "../(dashboard)/contexts/RightPanelContext";
import { useLeftPanel } from "../(dashboard)/contexts/LeftPanelContext";

import RagResponse from "../(dashboard)/components/RagResponse";
import DefaultStateSidebar from "../(dashboard)/components/DefaultStateSidebar";

const drawerWidth = 600;

const ContentWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isDrawerOpen', // Prevent passing `isDrawerOpen` to DOM
})<{ isDrawerOpen: boolean }>(
  ({ theme, isDrawerOpen }) => ({
    flexGrow: 1,
    marginRight: isDrawerOpen ? drawerWidth : 0,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  })
);

const RightDrawer = styled(Drawer)(({ theme }) => ({
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
    transition: theme.transitions.create(["width", "transform"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));


export default function Layout(props: { children: React.ReactNode }) {
  const { isNavigationExpanded, toggleNavigationExpanded } = useLeftPanel();
  const { isDrawerOpen, setDrawerOpen, response } = useRightPanel();
  const [rightDrawerWidth, setRightDrawerWidth] = React.useState(600);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("xl"));
const isSmallScreen = useMediaQuery(theme.breakpoints.up("xl"));

React.useEffect(() => {
  if (isLargeScreen && isDrawerOpen) {
    // On smaller screens, close the drawer and reduce its width
    setDrawerOpen(false);
    setRightDrawerWidth(300);
  } else if (isSmallScreen && !isDrawerOpen) {
    // On larger screens, reopen the drawer and reset its width
    setDrawerOpen(true);
    setRightDrawerWidth(600);
  }
}, [isLargeScreen, isSmallScreen, ]);
  const handleToggleDrawer = () => setDrawerOpen((prev: boolean) => !prev);

  function CustomAppTitle() {
    return (
      <Stack direction="row" alignItems="center"  spacing={2}>
        <CloudCircleIcon fontSize="large" color="primary" />
        <Typography variant="h6">Ragify</Typography>
        <Chip size="small" label="beta" color="secondary" sx={{ display: { xs: "none", md: "inline-block" }}}/>
        <Tooltip title="Connected to production" sx={{ display: { xs: "none", md: "inline-block" }}}>
          <CheckCircleIcon color="success" fontSize="small" />
        </Tooltip>
      </Stack>
    );
  }

  function ToolbarActionsSearch({ onToggleDrawer }: { onToggleDrawer: () => void }) {
    return (
      <Stack direction="row">
        <Tooltip title={isDrawerOpen ? "Collapse menu" : "Expand menu"}>
          <IconButton onClick={onToggleDrawer} aria-label="Toggle right drawer">
            {isDrawerOpen ? (
              <MenuOpenIcon sx={{ transform: "scaleX(-1)" }} />
            ) : (
              <MenuIcon />
            )}
          </IconButton>
        </Tooltip>
        <Tooltip title="Search" enterDelay={1000}>
          <div >
            <IconButton
              type="button"
              aria-label="search"
              sx={{
                display: { xs: "none", md: "none" },
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
          sx={{ display: { xs: "none", md: "inline-block" }, mr: 1 }}
        />
        <ThemeSwitcher />
      </Stack>
    );
  }

  return (
    <DashboardLayout
      defaultSidebarCollapsed={!isNavigationExpanded}
      slots={{
        appTitle: CustomAppTitle,
        toolbarActions: () => (
          <ToolbarActionsSearch onToggleDrawer={handleToggleDrawer} />
        ),
      }}
    >
      <Box sx={{ display: "flex", height: "100vh", overflow: "auto" }}>
        <ContentWrapper isDrawerOpen={isDrawerOpen}>
          <PageContainer title="" maxWidth="lg">
            {props.children}
          </PageContainer>
        </ContentWrapper>

        <RightDrawer
          variant="persistent"
          anchor="right"
          open={isDrawerOpen}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
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
              overflow: "auto",
            }}
          >
            {response ? (
              <RagResponse response={response} />
            ) : (
              <DefaultStateSidebar />
            )}
          </Box>
        </RightDrawer>
      </Box>
    </DashboardLayout>
  );
}
