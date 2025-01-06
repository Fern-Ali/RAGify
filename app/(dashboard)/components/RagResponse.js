"use client";
import React, { useState } from "react";
import { Typography, Accordion, AccordionSummary, AccordionDetails, Button, List, ListItem, ListItemText, Card, Box, Paper, Grid2 } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles';
import TopicIcon from '@mui/icons-material/Topic';
// import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
// import { github } from "react-syntax-highlighter/dist/esm/styles/hljs"; // You can choose other themes too
import ReactMarkdown from "react-markdown";
import FileRenderer from "./FileRenderer"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { githubDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { convertS3UriToGithubUrl, getGithubRawLink } from "../lib/Helper"
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Chip from '@mui/material/Chip';
import FaceIcon from '@mui/icons-material/Face';
import AssignmentIcon from '@mui/icons-material/Assignment';

const DynamicGrid = ({ citations }) => {
  return (
    <Grid2 container spacing={2} display="flex" justifyContent="center" alignItems="center" size="grow">
      {/* First Row: Single Full-Width Paper */}
      {citations.map((citation, index) => (
        <React.Fragment key={index}>
          
        <Grid2 size={{xs:12, sm:12, md:12, lg:12}} >
        <Paper elevation={3} style={{ padding: 8, textAlign: "left" }}>
        <Chip size="small" sx={{ }} color="primary" icon={<FaceIcon />} label={"Insight"} />
          <Typography variant="body"> {citation.generatedResponsePart.textResponsePart.text}</Typography>
        </Paper>
      </Grid2>
      {citation.retrievedReferences.map((item, index) => (
        <Grid2 size={{xs:12, sm:12, md:12, lg:12}} key={index}>
          <Paper elevation={3} style={{ padding: 8, textAlign: "left" }} >
            <Chip size="small" label="Resource" icon={<AssignmentIcon />}></Chip>
           <Typography variant="caption" color="primary" sx={{p:1, textWrap: "wrap"}}>
            {"host: "}
            <a 
            target="_blank" 
            href={convertS3UriToGithubUrl(item.location.s3Location.uri)}>{"https://github.com/mui/toolpad/"}
            </a>
            </Typography>
          <FileRenderer s3Uri={item.location.s3Location.uri}></FileRenderer>
          </Paper>
        </Grid2>
      ))}
        </React.Fragment>
      ))}
      

      {/* Second Row: Dynamically Filled Papers */}
      
    </Grid2>
  );
};




export default function RAGResponse({ response }) {
  const { output, citations } = response;
  const [showInsights, setShowInsights] = useState(true);
  const theme = useTheme();

  // Handler for the Switch
  const handleSwitchChange = (event) => {
    setShowInsights(event.target.checked);
  };
  console.log(response)
  return (
    <Box sx={{p:2, }}>
      {/* <Typography  variant="h5">User Prompt</Typography>
      <Typography variant="body1" width="100%" sx={{p:3}}>Talk to me about the useNotifications api in toolpad and how I can use it, with an example.</Typography>
      
      <Typography variant="h5">Generated Response</Typography>
      <Typography variant="body1" sx={{p:3}}>{output.text}</Typography> */}
      
      {/* Supporting Citations */}
      <Typography variant="caption"  sx={{mr:1}} color="success">LLama 3.3 70b Instruct</Typography>
      <Typography variant="caption"  sx={{mr:1}} color="text.secondary">|</Typography>
      <Typography variant="caption"  sx={{mr:1}} color="primary">{`${Object.keys(citations).length} Response Insights`}</Typography>
      {/* <FormControlLabel control={<Switch checked={showInsights} onChange={handleSwitchChange} />} label={`${Object.keys(citations).length} Response Insights`} /> */}
      {showInsights ? <React.Fragment>
      {/* <Typography variant="h6" sx={{ p:2 }}>Agent Insights:</Typography> */}
      <DynamicGrid citations={citations} />
      </React.Fragment> : null}

    </Box>
  );
}
