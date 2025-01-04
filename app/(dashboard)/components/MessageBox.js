import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid2';

import { useLatestThread } from '../contexts/LatestThreadContext';
import { useRightPanel } from '../contexts/RightPanelContext';

const cards = [
  {
    id: 1,
    title: 'Plants',
    description: 'Plants are essential for all life.',
  },
  {
    id: 2,
    title: 'Animals',
    description: 'Animals are a part of nature.',
  },
  {
    id: 3,
    title: 'Humans',
    description: 'Humans depend on plants and animals for survival.',
  },
];

function SelectActionCard({response}) {
  const [selectedCard, setSelectedCard] = React.useState(0);
  const [thread, setThread] = React.useState(null);
  const { latestThread, loading } = useLatestThread();
  
  
//   React.useEffect(() => {

//   }, [response]);

  return (
    <Box
      sx={{
        width: '100%',
        // display: 'flex-column',
        flexGrow: 1,
        
      }}
    >
      <Grid direction="row" container spacing={2}  >
        {!loading ? latestThread.messages.map((card, index) => (
         
         
         <React.Fragment>
            
            <Grid container sx={{width: "100%", justifyContent: "left"}}>
         
                {card.sender == "USER" ? <Grid size={"grow"} sx={{}}></Grid> : null}
                <Grid  sx={{ maxWidth: card.sender == "MODEL" ? "50vw":"40%"}}>
                    <Card key={card.id}  sx={{width: "fit-content", borderRadius: "10px",}}>
           <CardActionArea
             onClick={() => setSelectedCard(index)}
             data-active={selectedCard === index ? '' : undefined}
             sx={{
                 textAlign: card.sender == "MODEL" ? "left":"right",
                 
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
               <Typography sx={{p:1}} variant="caption" color={card.sender == "USER" ? "primary" : "success"}>
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
