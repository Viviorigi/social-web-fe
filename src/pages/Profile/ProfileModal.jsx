import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { updateProfileAction } from '../../Redux/Auth/auth.action';
import { Avatar, Backdrop, Button, CircularProgress, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { uploadToCloudinary } from '../../utils/uploadToCloudinary';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  outline: 'none',
  overFlow: 'scroll-y',
  borderRadius: 3
};

export default function ProfileModal({ open, handleClose }) {

  const dispatch = useDispatch();
  const { auth } = useSelector(store => store)
  const handleSubmit = (values) => {
    console.log("values", values);
  }
  const [selectAvatar, setSelectAvatar] = React.useState();
  const [selectBackground, setSelectBackground] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: auth.user?.firstName,
      lastName: auth.user?.lastName,
      bio: auth.user?.bio,
      location: auth.user?.location,
      avatar: auth.user?.avatar,
      background: auth.user?.background
    },
    onSubmit: (values) => {
      console.log('value', values);
      dispatch(updateProfileAction(values))
      handleClose()
    }
  })
  const handleSelectAvatar = async (event) => {
    setIsLoading(true);
    const avatarUrl = await uploadToCloudinary(event.target.files[0], 'image')
    setSelectAvatar(avatarUrl);
    setIsLoading(false);
    formik.setFieldValue('avatar', avatarUrl)
  }
  const handleSelectBackground = async (event) => {
    setIsLoading(true);
    const backgroundUrl = await uploadToCloudinary(event.target.files[0], 'image')
    setSelectBackground(backgroundUrl);
    setIsLoading(false);
    formik.setFieldValue('background', backgroundUrl)
  }

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
                  <CloseIcon />
                </IconButton>
                <p>Edit Profile</p>
              </div>
              <Button type='submit' onSubmit={handleSubmit}>Save</Button>
            </div>
            <div>
              <div>
              <div className='h-[15rem] relative'>
                <img className='w-full h-full rounded-md'
                  src={selectBackground || auth?.user.background || 'https://st4.depositphotos.com/13349494/23275/i/450/depositphotos_232755656-stock-photo-grey-shabby-wooden-material-black.jpg' }
                  alt="" />
                <label htmlFor='background' className=' w-full h-full absolute top-0 left-0   bg-black bg-opacity-60'>
                    <input
                      id='background'
                      type="file"
                      className='opacity-0'
                      accept='image/*'
                      onChange={handleSelectBackground}
                      name='background'
                    />
                    <AddPhotoAlternateIcon sx={{ fill: 'white', fontSize: '60px' }} className=' mt-20' />
                  </label>
              </div>
              </div>
              <div className='pl-5 relative'>
                <div className='relative'>
                  <Avatar
                    className='transform -translate-y-20'
                    sx={{ width: '10rem', height: '10rem' }}
                    src={selectAvatar || auth?.user.avatar}
                  />
                  <label htmlFor='avatar' className=' w-[10rem] h-[10rem] top-0 left-0 absolute -translate-y-20 rounded-full   bg-black bg-opacity-60'>
                    <input
                      id='avatar'
                      type="file"
                      className='opacity-0'
                      accept='image/*'
                      onChange={handleSelectAvatar}
                      name='avatar'
                    />
                    <AddPhotoAlternateIcon sx={{ fill: 'white', fontSize: '40px' }} className='ml-16 mt-7' />
                  </label>
                </div>
              </div>
              <div className='space-y-8'>
                <TextField
                  fullWidth
                  id="firstName"
                  name="firstName"
                  label="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}

                />
                <TextField
                  fullWidth
                  id="lastName"
                  name="lastName"
                  label="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  sx={{ mb: '10px' }}
                  id="bio"
                  name="bio"
                  label="bio"
                  value={formik.values.bio}
                  onChange={formik.handleChange}
                />
                <TextField
                  fullWidth
                  sx={{ height: '50px' }}
                  id="location"
                  name="location"
                  label="location"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                />
              </div>
              <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
                onClick={handleClose}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}