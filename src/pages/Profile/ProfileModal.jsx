import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { updateProfileAction } from '../../Redux/Auth/auth.action';
import { Avatar, Button, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  outline:'none',
  overFlow:'scroll-y',
  borderRadius: 3
};

export default function ProfileModal({open, handleClose}) {

  const dispatch =useDispatch();
  const {auth}=useSelector(store => store)
  const handleSubmit= (values)=>{
    console.log("values",values);
  }
  const formik=useFormik({
    initialValues:{
      firstName:"",
      lastName:""
    },
    onSubmit:(values,)=>{
      console.log('value',values);
      dispatch(updateProfileAction(values))
      handleClose()
    }
  })
  return (
    <div>
  
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-3'>
                <IconButton onClick={handleClose}>
                  <CloseIcon/>
                </IconButton>
                <p>Edit Profile</p>
              </div>
              <Button type='submit' onSubmit={handleSubmit}>Save</Button>
            </div>
            <div>
              <div className='h-[15rem]'>
                <img className='w-full h-full rounded-md' 
                  src="https://c.wallhere.com/photos/cd/1a/Genshin_Impact_Keqing_Genshin_Impact_closed_eyes_violin_Piukute062_artwork_anime_girls_dress-2095787.jpg!d" 
                  alt="" />
              </div>
              <div className='pl-5'>
                <Avatar 
                  className='transform -translate-y-20'
                  sx={{width:'10rem',height:'10rem'}}
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxaK34xF4FJxegCoiqO5yJ3IJH7Ujezp3Srwi6mL1XqA&s'
                />
              </div>
              <div className='space-y-3'>
                <TextField
                  fullWidth
                  id="firstName"
                  name="firstName"
                  label="firstName"
                  value={auth.user?.firstName? auth.user?.firstName : formik.values.firstName}
                  onChange={formik.handleChange}
                />
                 <TextField
                  fullWidth
                  id="lastName"
                  name="lastName"
                  label="lastName"
                  value={auth.user?.lastName? auth.user?.lastName : formik.values.lastName}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}