import { Avatar, Box, Button, Card, Tab, Tabs } from '@mui/material';
import React from 'react'
import { useParams } from 'react-router-dom'
import PostCard from '../../component/Post/PostCard';
import UserReelCard from '../../component/Reels/UserReelCard';


const Profile = () => {

  const { id } = useParams();

  const [value, setValue] = React.useState('post');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const tabs = [
    { value: 'post', name: 'Post' },
    { value: 'reels', name: 'Reels' },
    { value: 'saved', name: 'Saved' },
    { value: 'repost', name: 'Repost' }
  ]
  const posts = [1, 1, 1, 1]
  const reels =[1,1]
  const savedPost=[1,1,1]
  const reposts=[1,1,1,1]
  return (
    <Card className='my-10 w-[75%]'>

      <div className='rounded-md'>
        <div className='h-[15rem]'>
          <img
            className='w-full h-full rounded-t-md'
            src="https://c.wallhere.com/photos/cd/1a/Genshin_Impact_Keqing_Genshin_Impact_closed_eyes_violin_Piukute062_artwork_anime_girls_dress-2095787.jpg!d" alt="" />
        </div>
      </div>
      <div className='px-10 flex justify-between items-start
      mt-5 h-[5rem]'>
        <Avatar sx={{ width: '10rem', height: '10rem' }} className='transform -translate-y-24'
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxaK34xF4FJxegCoiqO5yJ3IJH7Ujezp3Srwi6mL1XqA&s' />

        {true ? <Button sx={{ borderRadius: '20px' }} variant='outlined'>Edit Profile</Button> : <Button variant='outlined'>Follow</Button>}

      </div>
      <div className='px-10 py-5'>

        <div>
          <h1 className='py-1 font-bold text-xl'>Keqing</h1>
          <p>@keqing</p>
        </div>

        <div className='flex gap-6 items-center py-3'>
          <span>41 Post</span>
          <span>35 Followers</span>
          <span>5 Following</span>
        </div>

        <div>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
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
              {posts.map((item) =>
                <div className='border border-slate-100 rounded-md'>
                  <PostCard />
                </div>
              )}
            </div>
          ) : value === 'reels' ? (<div className='flex justify-center flex-wrap gap-2 my-10'>
            {reels.map((item)=>
             <div className='border border-slate-100 rounded-md'>
             <UserReelCard />
           </div>
          )}
          </div>) : value === 'saved' ? (<div className='space-y-5 w-[75%] my-10'>
            {savedPost.map((item)=>
             <div className='border border-slate-100 rounded-md'>
              <PostCard />
           </div>
          )}
          </div>) : value === 'repost' ? (
          <div>repost</div>
        ) : ('')}
        </div>
      </section>
    </Card>
  )
}

export default Profile