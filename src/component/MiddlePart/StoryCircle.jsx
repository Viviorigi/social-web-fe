import { Avatar } from '@mui/material'
import React from 'react'

const StoryCircle = () => {
  
  return (
    <div>
      <div className='flex flex-col items-center mr-4 cursor-pointer'>
        <Avatar sx={{ width: '5rem', height: '5rem' }}
        src='https://i.pinimg.com/736x/5a/86/cf/5a86cf39991bd3768d1829b160f1e6be.jpg' 
        >
        </Avatar>
        <p>Codewith...</p>
      </div>
    </div>
  )
}

export default StoryCircle