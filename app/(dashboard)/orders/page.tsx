
import * as React from 'react';
import Typography from '@mui/material/Typography';
import MessageHandler from '../components/MessageHandler';
import Drawer from '@mui/material/Drawer';
import { auth } from '../../../auth';
import { LatestThreadProvider  } from '../contexts/LatestThreadContext';

export default async function OrdersPage() {
  const session = await auth();



  return (
    
      <React.Fragment>
        <LatestThreadProvider userId={session?.user?.id}>        
        <MessageHandler  session={session}></MessageHandler>
        </LatestThreadProvider>
      </React.Fragment>
      
  );
}


