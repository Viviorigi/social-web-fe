import { Avatar, Button, CardHeader } from '@mui/material'
import React from 'react'

import { red } from '@mui/material/colors';
const PopularUserCard = () => {
  return (
    <div>
        <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <Button size='small'>
            Follow
          </Button>
        }
        title="Duong"
        subheader="@duong"
      />
    </div>
  )
}

export default PopularUserCard