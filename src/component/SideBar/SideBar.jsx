import React from 'react'
import { navigationMenu } from './SideBarNavigation'
import { Avatar, Button, Card, Divider, Menu, MenuItem } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';

const Sidebar = () => {

  const {auth}=useSelector(store => store)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate=useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate= (item) =>{
    if(item.title === 'Profile'){
      navigate(`/profile/${auth.user?.id}`)
    }else{
      navigate(item.path)
    }
    
  }
  const profile=async ()=>{
   await navigate(`/profile/${auth.user?.id}`)
   handleClose()
  }
  const jwt=localStorage.getItem('jwt')
  const logout= async ()=>{
    await axios.post('http://localhost:8080/auth/logout',null,{
      headers: {
        "Authorization": `Bearer ${jwt}`
      }
    })
    await localStorage.removeItem('jwt');
    window.location.href = '/';
  }

  return (
    <Card className='card h-screen flex flex-col justify-between py-5'>

      <div className='space-y-8 pl-5'>

        <div className='pt-2 pb-5'>

          <span className='logo font-bold text-3xl'>Social NetWorking</span>

        </div>

        <div className='space-y-8'>
          {navigationMenu.map((item) =>
            <div onClick={()=>handleNavigate(item)} className='cursor-pointer flex space-x-3 items-center'>
              {item.icon}
              <p className='text-xl'>{item.title}</p>
            </div>
          )}
        </div>

      </div>
      <div>
        <Divider />
        <div className='pl-5 flex items-center justify-between pt-5'>
          <div className=' flex items-center space-x-3'>
            <Avatar src={auth?.user?.avatar} />
            <div>
              <p className='font-bold'>{auth.user?.firstName +" "+auth.user?.lastName}</p>
              <p className='opacity-70'>@{auth.user?.firstName.toLowerCase() +"_"+auth.user?.lastName.toLowerCase()}</p>
            </div>
          </div>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
           <MoreHorizIcon/>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={profile}>My profile</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </Card>
  )
}

export default Sidebar