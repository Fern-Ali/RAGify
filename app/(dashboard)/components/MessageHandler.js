"use client";
import * as React from 'react';
import { useState } from "react";
import RightDrawer from '../components/RightDrawer'
import Message from '../components/Message'
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';

export default function MessageHandler({session}) {
  
  const [response, setResponse] = useState(null); // State for the API response
  
  return (
    <React.Fragment>
        <Box sx={{ flex: 1, border: "4px solid pink" }}>
        <Grid >
            {/* <Grid size={{ xs: 12, md: 8, lg: 10 }}> */}
                {/* <Message  response={response} setResponse={setResponse} session={session}></Message> */}
                <RightDrawer response={response} setResponse={setResponse} session={session}></RightDrawer>
            {/* </Grid> */}
        
            {/* <Grid size={{ xs: 6, lg: 6 }}>
                <RightDrawer response={response}></RightDrawer>
            </Grid> */}
        
        </Grid>
        </Box>
    </React.Fragment>
  );
}


