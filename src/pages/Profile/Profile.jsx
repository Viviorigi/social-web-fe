import { Avatar, Box, Button, Card, Tab, Tabs } from '@mui/material';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PostCard from '../../component/Post/PostCard';
import UserReelCard from '../../component/Reels/UserReelCard';
import { useDispatch, useSelector } from 'react-redux';
import ProfileModal from './ProfileModal';
import { getUserPostAction } from '../../Redux/Post/post.action';
import { findUserById, followUser } from '../../Redux/Auth/auth.action';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const Profile = () => {

  const { id } = useParams();

  const { auth } = useSelector(store => store)
  const [value, setValue] = React.useState('post');

  const [open, setOpen] = React.useState(false);
  const handleOpenProfileModal = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const tabs = [
    { value: 'post', name: 'Post' },
    { value: 'reels', name: 'Reels' },
    { value: 'saved', name: 'Saved' },
    { value: 'repost', name: 'Repost' }
  ]
  const { post } = useSelector(store => store);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findUserById(id))
    dispatch(getUserPostAction(id))
  }, [id, dispatch, post.posts])

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" })

  }
  const handleFollowUser = () => {
    dispatch(followUser(id))
    console.log('followuser');
  }

  const reels = [1, 1]
  const savedPost = [1, 1, 1]
  return (
    <Card className='my-10 w-[75%]'>

      <div className='rounded-md'>
        <div className='h-[18rem]'>
          <img
            className='w-full h-full rounded-t-md'
            src={auth?.findUser?.background || 'https://st4.depositphotos.com/13349494/23275/i/450/depositphotos_232755656-stock-photo-grey-shabby-wooden-material-black.jpg'} alt="" />
        </div>
      </div>
      <div className='px-10 flex justify-between items-start
      mt-5 h-[5rem]'>
        <Avatar sx={{ width: '10rem', height: '10rem' }} className='transform -translate-y-24'
          src={auth?.findUser?.avatar} />

        {auth?.findUser?.reqUser ? <Button onClick={handleOpenProfileModal} sx={{ borderRadius: '20px'}}  variant='outlined'>Edit Profile</Button> :
          <Button variant='outlined' onClick={handleFollowUser}>{!auth.findUser?.followed ? 'Follow' : 'UnFollow'}</Button>}

      </div>
      <div className='px-10 py-5'>

        <div>
          <h1 className='py-1 font-bold text-xl'>{auth.findUser?.firstName + " " + auth.findUser?.lastName}</h1>
          <p>@{auth.findUser?.firstName.toLowerCase() + "_" + auth.findUser?.lastName.toLowerCase()}</p>
        </div>

        <div className='flex gap-6 items-center py-3'>
          <span><BusinessCenterIcon /> Education</span>
          <span><PlaceIcon /> {auth.findUser?.location} </span>
          <span><CalendarMonthIcon /> Joined {formatDate(auth.findUser?.createdAt)} </span>
        </div>
        <div className='flex gap-6 items-center py-3'>
          <span>{post.posts.length} Post</span>
          <span>{auth.findUser?.follower.length} Follower</span>
          <span>{auth.findUser?.followings.length} Followings</span>
        </div>

        <div>
          <p>{auth.findUser?.bio}</p>
        </div>

      </div>
      <section>
        <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="wrapped label tabs example"
          >
            {tabs.map((item) => <Tab value={item.value} label={item.name} wrapped />)}
          </Tabs>
        </Box>
        <div className='flex justify-center '>
          {value === 'post' ? (
            <div className='space-y-5 w-[75%] my-10'>
              {post.posts.map((item) =>
                <div className='border border-slate-100 rounded-md'>
                  <PostCard item={item} />
                </div>
              )}
              {post.posts.length === 0 && <div className='text-xl font-bold'>You don't have post</div>}
            </div>
          ) : value === 'reels' ? (<div className='flex justify-center flex-wrap gap-2 my-10'>
            {reels.map((item) =>
              <div className='border border-slate-100 rounded-md'>
                <UserReelCard />
              </div>
            )}
          </div>) : value === 'saved' ? (<div className='space-y-5 w-[75%] my-10'>
            {savedPost.map((item) =>
              <div className='border border-slate-100 rounded-md'>
                <PostCard />
              </div>
            )}
          </div>) : value === 'repost' ? (
            <div>repost</div>
          ) : ('')}
        </div>
      </section>
      <ProfileModal open={open} handleClose={handleClose} />
    </Card>
  )
}

export default Profile