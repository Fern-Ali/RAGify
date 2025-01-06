import * as React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { Paper, Typography, Box } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function SimpleAlert() {
  return (
    <Paper
    elevation={3}
    sx={{
      padding: 3,
      marginTop: 4,
      backgroundColor: 'background.paper',
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 2,
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
      <InfoOutlinedIcon sx={{ color: 'primary.main', mr: 1 }} />
      <Typography variant="h6" color="text.primary" sx={{ fontWeight: 'bold' }}>
        Disclaimer: Demo Version
      </Typography>
      
    </Box>
    <Typography variant="body2" color="text.secondary">
      RAGify is currently in its demo stage, designed to showcase the potential of Retrieval-Augmented Generation (RAG) systems. In future versions, users will be able to integrate their own data stores for vectorization, enabling the creation of personalized AI-powered expert systems tailored to their specific needs.
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        The current RAGify demo focuses on being an expert on <strong>MUI Toolpad</strong>, a powerful framework for developers to build fully customized tools and applications from scratch. Using the <code>npm create toolpad-app</code> command, Toolpad empowers developers with a streamlined workflow, allowing them to leverage Material-UI components and integrate their own backend systems for scalable and tailored solutions.
      </Typography>
    {/* <Alert icon={<InfoOutlinedIcon fontSize="inherit" />} severity="info">
      Demo Version
    </Alert> */}
  </Paper>
    
  );
}
