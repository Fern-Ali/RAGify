import * as React from 'react';
import Typography from '@mui/material/Typography';
import { auth } from '../../auth';
import DefaultState from './components/DefaultState';



export default async function HomePage() {
  const session = await auth();

  return (    
      <React.Fragment>
        <Typography>
        {/* {session?.user?.name || 'User'} */}
      </Typography>
      <DefaultState></DefaultState>
      </React.Fragment>
  );
}
