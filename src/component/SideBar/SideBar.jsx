import React from 'react'
import { navigationMenu } from './SideBarNavigation'
import { Avatar, Button, Card, Divider, Menu, MenuItem } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
const Sidebar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card className='card h-screen flex flex-col justify-between py-5'>

      <div className='space-y-8 pl-5'>

        <div className='pt-2 pb-5'>

          <span className='logo font-bold text-3xl'>Social NetWorking</span>

        </div>

        <div className='space-y-8'>
          {navigationMenu.map((item) =>
            <div className='cursor-pointer flex space-x-3 items-center'>
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
            <Avatar src='https://cdn.pixabay.com/photo/2017/02/25/22/04/user-icon-2098873_1280.png' />
            <div>
              <p className='font-bold'>Nguyen Dinh Duong</p>
              <p className='opacity-70'>@nguyendinhduong</p>
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
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </Card>
  )
}

export default Sidebar