import { Avatar, Card, CardHeader, IconButton } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { searchUserAction } from '../../Redux/Auth/auth.action';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { createChat } from '../../Redux/message/message.action';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchUser = () => {
  const [username, setUserName] = useState('');
  const dispatch = useDispatch();
  const { auth, message } = useSelector(store => store);
  const location = useLocation();
  const handleSearchUser = (e) => {
    setUserName(e.target.value)

    dispatch(searchUserAction(username))
  }
  const handleClickChat = (id) => {
    dispatch(createChat({userId:id}))
  }
  const navigate= useNavigate();

  return (
    <div >
      <div className='py-5 relative'>
        <input className='bg-transparent border border-[#3b4054] outline-none w-full 
          px-5 py-3 rounded-full' placeholder='search user...'
          onChange={handleSearchUser}
          type="text" />
        {username && auth.searchUser.length > 0 && ( // Ensure auth.searchUser has items before mapping
          <div className='absolute w-full z-10 top-[4.5rem]'>
            {auth.searchUser.map((item) => (
              <Card key={item.id} className='cursor-pointer border-none' onClick={location.pathname==='/message' ? () => handleClickChat(item.id) : () => navigate(`/profile/${item.id}`) }>
                <CardHeader
                  avatar={<Avatar src={item?.avatar} />}
                  title={`${item.firstName} ${item.lastName}`}
                  subheader={`@${item.firstName.toLowerCase()}${item.lastName.toLowerCase()}`}
                  action={
                    <IconButton>
                      <MoreHorizIcon />
                    </IconButton>
                  }
                />

              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchUser