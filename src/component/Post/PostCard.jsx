import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const PostCard = () => {
  return (
    <Card className=''>

      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            K
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Keqing "
        subheader="@keqing"
      />
       <CardMedia
        component="img"
        height="194"
        image="https://images7.alphacoders.com/129/thumb-440-1295692.webp"
        alt="Paella dish"
      />
       <CardContent>
        <Typography variant="body2" color="text.secondary">
          Keqing 
        </Typography>
      </CardContent>
      <CardActions className='flex justify-between' disableSpacing>
      <div>
        <IconButton>
          {true?<FavoriteIcon/>:<FavoriteBorderIcon/>}
        </IconButton>
        <IconButton>
          {<ShareIcon/>}
        </IconButton>
        <IconButton>
          {<ChatBubbleIcon/>}
        </IconButton>
      </div>
      <div>
        <IconButton>
          {true?<BookmarkIcon/>:<BookmarkBorderIcon/>}
        </IconButton>
      </div>
      </CardActions>
    </Card>
  )
}

export default PostCard