import * as React from 'react';
import Typography from '@mui/material/Typography';
import FoundationModelGrid from '../components/FoundationModelGrid';


export default async function OrdersPage() {
  

  return (
    <React.Fragment>
      <Typography>
        Choose a Model from the dropdown to get started.
      </Typography>
      <FoundationModelGrid/>
    </React.Fragment>
  );
}
