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

import { useSearchParams } from 'next/navigation';

import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

function SelectActionCard({
    response,
    setResponse, 
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
  const [favoritedCards, setFavoritedCards] = React.useState([]); // Array of favorited card IDs

  const { latestThread, loading } = useLatestThread();
  const searchParams = useSearchParams();
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

  useEffect(() => {
    const sampleQuery = searchParams.get('sampleQuery');
    if (sampleQuery) {
      setQuery(sampleQuery);
    }
  }, [searchParams]);
  
  const toggleFavorite = (cardId) => {
    setFavoritedCards((prevFavorited) =>
      prevFavorited.includes(cardId)
        ? prevFavorited.filter((id) => id !== cardId) // Remove from favorites
        : [...prevFavorited, cardId] // Add to favorites
    );
  };
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'long', // e.g., 'Monday'
      year: 'numeric', // e.g., '2025'
      month: 'long', // e.g., 'January'
      day: 'numeric', // e.g., '6'
      hour: '2-digit', // e.g., '10'
      minute: '2-digit', // e.g., '08'
      second: '2-digit', // e.g., '36'
      hour12: true, // e.g., 'AM/PM' format
    });
  }
  function closeUnclosedCodeBlocks(text) {
    const backticks = (text.match(/```/g) || []).length;
    if (backticks % 2 !== 0) {
      return `${text.trim()}\n\`\`\``;
    }
    return text;
  }
  
  
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
         
         
         <React.Fragment key={card.id} >
            
            <Grid container sx={{width: "100%", justifyContent: "left", }}>         
            {card.sender == "USER" ? <Grid size={"grow"}  sx={{border: "", display: { xs: "none", lg: "inline" }}}></Grid> : null}
            <Grid size={"grow"} sx={{ border: "", maxWidth: card.sender == "MODEL" ? "100%":"100%"}}>
            <Card 
            key={card.id}  
            sx={{
                width: { xs: "100%", md: "100%" },
                borderRadius: "10px", 
                backgroundColor: card.sender == "MODEL" ? theme.palette.background.default:""
                }}>
            <CardActionArea
            disableRipple
                onClick={() => {
                    setSelectedCard(index);
                    if (card.metadata) {
                      setResponse(card.metadata); // Update the response with card.metadata
                      notifications.show("Response updated!", {
                        severity: "info",
                        autoHideDuration: 2000,
                      });
                    } else {
                      notifications.show("No metadata available for this card.", {
                        severity: "warning",
                        autoHideDuration: 2000,
                      });
                    }
                  }}
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
               {/* <Typography sx={{p:1}} variant="body2" color="text.secondary"> */}
                 {/* {card.text} */}
                 {
                  <ReactMarkdown
                  
                  rehypePlugins={[rehypeRaw, rehypeSanitize]}
                  components={{
                    pre({ children, ...props }) {
                      return (
                        <Box
                          component="pre"
                          sx={{
                            backgroundColor: theme.palette.background.paper,
                            overflowX: "auto",
                            padding: "1em",
                            borderRadius: "10px",
                            maxWidth: { xs: "300px", sm: "500px", md: "800px", lg: "md", xl: "lg" },
                            mx: "auto",
                            justifyContent: "center"
                          }}
                          {...props}
                        >
                          {children}
                        </Box>
                      );
                    },
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={theme.palette.mode === "dark" ? oneDark : oneLight}
                          language={match[1]}
                          PreTag="div"
                          customStyle={{
                            background: "none",
                            borderRadius: 10,
                            padding: "1em",
                            overflowX: "auto",
                            maxWidth: "100%",
                          }}
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code
                          style={{
                            backgroundColor: theme.palette.action.hover,
                            padding: "2px 4px",
                            borderRadius: 4,
                            fontSize: "0.9em",
                            
                          }}
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },
                  }}
                >{closeUnclosedCodeBlocks(card.text)}</ReactMarkdown>
                 }
               {/* </Typography> */}
               <Typography sx={{p:1}} variant="caption" color={card.sender == "USER" ? "primary" : "success"}>
                 {formatDate(card.createdAt)}
               </Typography>
             </CardContent>
             
            </CardActionArea>
            {card.sender == 'MODEL' ? <CardActions disableSpacing>
                <IconButton
                    size="small"
                    aria-label="add to favorites"
                    onClick={() => toggleFavorite(card.id)} // Toggle favorite
                    >
                    <FavoriteIcon
                        size="small"
                        sx={{
                        color: favoritedCards.includes(card.id)
                            ? theme.palette.error.main // Highlighted when favorited
                            : theme.palette.action.disabled,
                        }}
                    />
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
            xs: `calc(100% -  64)px)`, // Full width on smaller viewports
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
        {!error && 
        <Button type="submit" variant="contained"  disabled={loadingBedrock}>
        {loadingBedrock ? "Loading..." : "Send"}
        </Button> }
        
      {/* </form> */}
      
      {error && <Button type="submit" variant="contained" color="red" disabled={loadingBedrock}>
          {error}
        </Button>}
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
