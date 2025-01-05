
import * as React from 'react';
import Typography from '@mui/material/Typography';
import MessageHandler from '../components/MessageHandler';
import Drawer from '@mui/material/Drawer';
import { auth } from '../../../auth';

export default async function OrdersPage() {
  const session = await auth();
  
  return (
    
      <React.Fragment>

        <MessageHandler  session={session} ></MessageHandler>
        
      </React.Fragment>
      
  );
}


