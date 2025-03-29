import * as React from 'react';
import { AppProvider } from '@toolpad/core/nextjs';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CoffeeIcon from '@mui/icons-material/Coffee';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import HubIcon from '@mui/icons-material/Hub';
import Chip from '@mui/material/Chip';
import type { Navigation } from '@toolpad/core/AppProvider';
import { SessionProvider, signIn, signOut } from 'next-auth/react';
import { auth } from '../auth';
import theme from '../theme';

import { RightPanelProvider } from '../app/(dashboard)/contexts/RightPanelContext';
import { LeftPanelProvider } from '../app/(dashboard)/contexts/LeftPanelContext';


const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: '',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'playground',
    title: 'PlayGround',
    icon: <ShoppingCartIcon />,
  },

  {
    segment: 'rag',
    title: 'RAG House',
    icon: <CoffeeIcon />,
    action: <Chip label={12} color="success" size="small" />,
    children: [
      {
        kind: 'header',
        title: 'Chat History',
      },
      {
        segment: 'models',
        title: 'Llama3.3',
        icon: <ModelTrainingIcon />,
      },
    ]
  },
  // {
  //   kind: 'divider',
  // }
];

const BRANDING = {
  title: 'RAGify',
};


const AUTHENTICATION = {
  signIn,
  signOut,
};


export default async function RootLayout(props: { children: React.ReactNode }) {
  const session = await auth();
  
  return (
    <html lang="en" data-toolpad-color-scheme="dark" suppressHydrationWarning>
      <body>
        <SessionProvider session={session}>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            
            <RightPanelProvider>
            <LeftPanelProvider>
            <AppProvider
              navigation={NAVIGATION}
              branding={BRANDING}
              session={session}
              authentication={AUTHENTICATION}
              theme={theme}
            >
              {props.children}
            </AppProvider>
            </LeftPanelProvider>
            </RightPanelProvider>
            
          </AppRouterCacheProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
