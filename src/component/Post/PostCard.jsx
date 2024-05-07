import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useDispatch, useSelector } from 'react-redux';
import { createCommentAction, likePostAction } from '../../Redux/Post/post.action';
import { isLikeByReqUser } from '../../utils/isLikedByReqUser';
import { useLocation, useNavigate } from 'react-router-dom';

const PostCard = ({ item }) => {
  const [showComments, setShowComments] = useState(false);
  const dispatch = useDispatch();
  const { post, auth } = useSelector(store => store);
  const navigate = useNavigate();

  const handleShowComment = () => setShowComments(!showComments)
  const handleCreateComment = (content) => {
    const reqData = {
      postId: item.id,
      data: {
        content
      }
    }
    dispatch(createCommentAction(reqData))
  }
  const location = useLocation();
  const handleLikePost = () => {
    dispatch(likePostAction(item.id))
  }



  return (
    <Card className=''>

      <CardHeader
        avatar={
          <Avatar  aria-label="recipe" src={item?.user.avatar}>

          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={item?.user.firstName ? item?.user.firstName + ' ' + item?.user.lastName : ''}
        subheader={item?.user.firstName ? '@' + item?.user.firstName.toLowerCase() + '' + item?.user.lastName.toLowerCase() : ''}
        onClick={() => navigate(`/profile/${item?.user.id}`)}
      />
      {/* <CardMedia
        component="img"
        height="194"
        image={item?.image ? item?.image : ''}
        alt="Paella dish"
      /> */}

      <img className='w-full max-h-[50rem] object-contain ' src={item?.image ? item?.image : ''} alt="" />
      {item?.video ? <video controls className="w-full max-h-[50rem] object-contain " src={item?.video} /> : ''}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {item?.caption ? item?.caption : ''}
        </Typography>
      </CardContent>
      <CardActions className='flex justify-between' disableSpacing>
        <div>
          <IconButton onClick={handleLikePost}>
            {location.pathname === "/" && isLikeByReqUser(auth.user.id, item) ? <FavoriteIcon sx={{ fill: 'red' }} /> : <FavoriteBorderIcon />}
          </IconButton>
          {item.liked.length}
          <IconButton>
            {<ShareIcon />}
          </IconButton>
          <IconButton onClick={handleShowComment}>
            {<ChatBubbleIcon />}
          </IconButton>
          {item.comments.length}
        </div>
        <div>
          <IconButton>
            {true ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
        </div>
      </CardActions>

      {showComments && <section>

        <div className='flex items-center space-x-5 mx-3 my-5'>

          <Avatar src={auth?.user.avatar} />
          <input onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleCreateComment(e.target.value)
              console.log('enter pressed', e.target.value);
              e.target.value = ''
            }
          }} className='w-full 
            outline-none 
            bg-transparent 
            border border-[#3b4054] rounded-full px-5 py-2' type="text"
            placeholder='write your comment...'
          />

        </div>
        <Divider />

        <div className='mx-3 space-y-2 my-5 text-xs'>

          {item?.comments && item?.comments.map((comment) => <div className='flex items-center space-x-5'>
            <Avatar sx={{ height: '2rem', width: '2rem', fontSize: '.8rem' }} src={comment.user?.avatar}>
            </Avatar>
            <div className="rounded-2xl bg-gray-100 p-3"> {/* Thêm lớp rounded-lg để tạo góc tròn cho nội dung */}
              <div className='text-md' >
                <p>{comment.user.firstName+' '+comment.user.lastName}</p>
                <p >{comment.content}</p>
              </div>
            </div>

          </div>)}


        </div>

      </section>}

    </Card>
  )
}

export default PostCard