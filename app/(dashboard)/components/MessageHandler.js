"use client";
import * as React from 'react';
import { useState } from "react";
import MessageBox from '../components/MessageBox'

import Message from '../components/Message'
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import { useRightPanel } from '../contexts/RightPanelContext';
import { LatestThreadProvider  } from '../contexts/LatestThreadContext';

export default function MessageHandler({session}) {
  
//   const [response, setResponse] = useState(null); // State for the API response
//   const { rightPanelContent, setRightPanelContent } = useRightPanel();
  const { response, setResponse } = useRightPanel();

  
  return (
    <LatestThreadProvider userId={session?.user?.id} response={response}>  
    <React.Fragment>
        <Box sx={{ flex: 1,  }}>
        <Grid >
            {/* <Grid size={{ xs: 12, md: 8, lg: 10 }}> */}
                <Message  response={response} setResponse={setResponse} session={session}></Message>
                
                {/* {response ? <RagResponse response={response} ></RagResponse> : "no response"} */}
                {/* <RightDrawer response={response} setResponse={setResponse} session={session}></RightDrawer> */}
            {/* </Grid> */}
        
            {/* <Grid size={{ xs: 6, lg: 6 }}>
                <RightDrawer response={response}></RightDrawer>
            </Grid> */}
        
        </Grid>
        </Box>
    </React.Fragment>
    </LatestThreadProvider>
  );
}


