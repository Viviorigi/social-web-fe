import { Avatar, Button, CardHeader } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'


const PopularUserCard = ({item}) => {
  const navigate = useNavigate();
  return (
    <div>
        <CardHeader
        avatar={
          <Avatar src={item.avatar}  aria-label="recipe">
          </Avatar>
        }
        action={
          <Button size='small'>
            Follow
          </Button>
        }
        title={item?.firstName ? item?.firstName + ' ' + item?.lastName : ''}
        subheader={item?.firstName ? '@' + item?.firstName.toLowerCase() + '' + item?.lastName.toLowerCase() : ''}
        onClick={() => navigate(`/profile/${item.id}`)}
      />
    </div>
  )
}

export default PopularUserCard