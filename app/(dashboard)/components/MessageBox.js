import React, { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ShareIcon from '@mui/icons-material/Share';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import MessageLoading from './MessageLoading';

import { useNotifications } from '@toolpad/core/useNotifications';

import { useLatestThread } from '../contexts/LatestThreadContext';

import { useTheme } from '@mui/material/styles';



function SelectActionCard({
    response, 
    isDrawerOpen, 
    handleSubmit, 
    query, 
    error, 
    setQuery, 
    loadingBedrock, 
    isNavigationExpanded, 
    leftPanelWidth}) {
  const [selectedCard, setSelectedCard] = React.useState(0);
  const [thread, setThread] = React.useState(null);
  const { latestThread, loading } = useLatestThread();
  const theme = useTheme();
  const drawerWidth = 600;
  const notifications = useNotifications();
  
    // Ref for the container to enable auto-scrolling
  const messagesEndRef = useRef(null);

  // Scroll to the bottom when response or latestThread changes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [response, latestThread, loadingBedrock]);



  return (
    <Box
      sx={{
        width: '100%',
        // display: 'flex-column',
        flexGrow: 1,
        
        
      }}
    >
      <Grid direction="row" container spacing={2} sx={{mb:10}}  >
        {!loading ? latestThread?.messages.map((card, index) => (
         
         
         <React.Fragment>
            
            <Grid container sx={{width: "100%", justifyContent: "left",}}>         
            {card.sender == "USER" ? <Grid size={"grow"} sx={{border: "", display: { xs: "none", md: "inline" }}}></Grid> : null}
            <Grid size={"grow"} sx={{ maxWidth: card.sender == "MODEL" ? "100%":"100%"}}>
            <Card 
            key={card.id}  
            sx={{
                width: { xs: "100%", md: "fit-content" }, 
                borderRadius: "10px", 
                backgroundColor: card.sender == "MODEL" ? theme.palette.background.default:""
                }}>
            <CardActionArea
                onClick={() => setSelectedCard(index)}
                data-active={selectedCard === index ? '' : undefined}
                sx={{
                    textAlign: card.sender == "MODEL" ? "left":"left",
                    
                height: '100%',
                '&[data-active]': {
                    backgroundColor: 'action.selected',
                    '&:hover': {
                    backgroundColor: 'action.selectedHover',
                    },
                },
                }} 
            >
             <CardContent sx={{ height: '100%' }}>
               {/* <Typography variant="h5" component="div">
                 {card.sender}
               </Typography> */}
               <Typography sx={{p:1}} variant="caption" color={card.sender == "USER" ? theme.palette.primary.main : theme.palette.success.main}>
                 {card.sender == "MODEL" ? "Llama 3.3 70B Instruct":"You"}
               </Typography>
               <Typography sx={{p:1}} variant="body2" color="text.secondary">
                 {card.text}
               </Typography>
               <Typography sx={{p:1}} variant="caption" color={card.sender == "USER" ? "primary" : "success"}>
                 {card.createdAt}
               </Typography>
             </CardContent>
             {card.sender == 'MODEL' ? <CardActions disableSpacing>
                 <IconButton  size="small" aria-label="add to favorites">
                     <FavoriteIcon  size="small"/>
                 </IconButton>
                 <IconButton 
                 size="small" 
                 aria-label="copy" 
                 onClick={() => {
                    // Copy text to clipboard
                    navigator.clipboard.writeText(card.text);

                    // Show notification
                    notifications.show('Message copied to clipboard!', {
                        severity: 'success', // Adjust severity (success, error, warning, info)
                        autoHideDuration: 3000, // Notification duration
                    });
                    }}>
                    <ContentCopyIcon size="small" />
                </IconButton>
                 <IconButton size="small" aria-label="share">
                     <ShareIcon size="small" />
                 </IconButton>
                 
                 </CardActions> : null}
            </CardActionArea>
         </Card> 
                </Grid>

         
            </Grid>
            
         {/* {card.sender == "MODEL" ? <Grid sx={{border: "4px solid blue"}}  size={"grow"}></Grid> : null} */}
         </React.Fragment>
      )) :
      "loading"}
        {loadingBedrock ? 
        <React.Fragment>
        <Grid size={"grow"} sx={{border: "", display: { xs: "none", md: "inline" }}}></Grid>
        <Grid size={"grow"} sx={{ maxWidth: "100%"}}>
        <Card>
            <CardContent>
                <MessageLoading></MessageLoading>
            </CardContent>
        </Card>
        </Grid>
        </React.Fragment> : null
        // <React.Fragment>
        //     <Grid size={"grow"} sx={{border: "", display: { xs: "none", md: "inline" }}}></Grid>
        //     <Grid size={"grow"} sx={{ maxWidth: "100%"}}>
        //         <Card>
        //             <CardContent>
        //                 <Typography sx={{p:1}} variant="body2" color="text.secondary">
        //                     {"Get Started with your first question..."}
        //                 </Typography>
        //                 {/* <MessageLoading></MessageLoading> */}
                        
        //             </CardContent>
        //         </Card>
        //     </Grid>
        // </React.Fragment>
        }
        <div ref={messagesEndRef} />
        <Paper
        elevation={3}
        sx={{
          position: 'fixed',
          bottom: 0,
          left: {
            xs: 0,
            md: (isNavigationExpanded ? 320 : 64)
          },
          margin: "0 auto",
          right: isDrawerOpen ? drawerWidth : 0,
          width: {
            xs: '100%', // Full width on smaller viewports
            md: isDrawerOpen
              ? `calc(100% - ${(isNavigationExpanded ? 320 : 64) + drawerWidth}px)` // Adjust for both panels
              : `calc(100% - ${(isNavigationExpanded ? 320 : 64)}px)`, // Adjust for left panel only
          },
          maxWidth: 'md',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        //   marginRight: isDrawerOpen ? drawerWidth : 0,
          padding: 2,
        //   zIndex: 10, // Ensure it stays above other content
          backgroundColor: 'background.paper',
          transition: 'all 0.3s ease', // Smooth transition for better UX
        }}
      >
        {/* <TextField
          fullWidth
          placeholder="Type your message..."
          sx={{ maxWidth: 'md', marginRight: 2 }}
        />
        <Button variant="contained" color="primary">
          {loadingBedrock ? "Loading..." : "Send"}
        </Button> */}
        <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            
        }}
        >
        <TextField
          id="query"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={latestThread?"Message RAGify":"Start your conversation here!"}
          required
          multiline
          disabled={loadingBedrock}
          fullWidth
          sx={{
            marginRight: 2 
          }}
        />
        <Button type="submit" variant="contained"  disabled={loadingBedrock}>
          {loadingBedrock ? "Loading..." : "Send"}
        </Button>
      {/* </form> */}
      
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      </Box>
      </Paper>
        
      </Grid>
            
      {/* Render thread data for debugging */}
      {thread && (
        <Box mt={4}>
          <Typography variant="h6">Latest Thread</Typography>
          <Typography variant="body1">{JSON.stringify(thread, null, 2)}</Typography>
        </Box>
      )}
    </Box>
  );
}

export default SelectActionCard;
