import { Avatar, Backdrop, CircularProgress, Grid, IconButton } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import WestIcon from '@mui/icons-material/West';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SearchUser from '../../component/SearchUser/SearchUser';
import './Message.css'
import UserChatCard from './UserChatCard';
import ChatMessage from './ChatMessage';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage, getAllChats } from '../../Redux/message/message.action';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { uploadToCloudinary } from '../../utils/uploadToCloudinary';
import SockJS from 'sockjs-client';
import Stom from 'stompjs'

const message = () => {

  const dispatch = useDispatch();
  const { auth, message } = useSelector(store => store);

  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [selectedImage, SetSelectedImage] = useState();
  const [loading, setLoading] = useState(false);
  const chatContainerRef=useRef(null);

  useEffect(() => {
    dispatch(getAllChats())
  }, [])

  const handleSelectImage = async (e) => {
    setLoading(true)
    console.log('handle select image ...');
    const imgUrl = await uploadToCloudinary(e.target.files[0], 'image')
    SetSelectedImage(imgUrl);
    setLoading(false)
  }
  const navigate = useNavigate()
  const backtoHome = () => {
    navigate('/')
  }

  const handleCreateMessage = (value) => {
    const message = {
      chatId: currentChat.id,
      content: value,
      image: selectedImage
    }
    dispatch(createMessage({message:message,sendMessageToServer}))
  }

  useEffect(() => {
    setMessages([...messages, message.message])
  }, [message.message])
  

  const [stompClient, setStomClient] = useState(null);

  useEffect(() => {
    const sock = new SockJS('http://localhost:8080/ws')
    const stomp = Stom.over(sock);
    setStomClient(stomp);

    stomp.connect({},onConnect,onError)
  
  },[])

  const onConnect = ()=>{
    console.log('websocket connected...');
  }
  const onError = (error)=>{
    console.log('err...',error);
  }

  useEffect(()=>{
    if(stompClient &&  currentChat && auth.user){
      console.log('yes it coming ');
      const subscription  = stompClient.subscribe(`/user/${currentChat.id}/private`,
      onMessageReceive)
      
      console.log(subscription);

      // return () => {
      //   subscription.unsubscribe();
      // };
    }
  }, [currentChat, auth.user])

  const sendMessageToServer= (newMessage)=>{
    if(stompClient && newMessage){
      stompClient.send(`/app/chat/${currentChat?.id.toString()}`,{},JSON.stringify(newMessage))
    }
  }

  const onMessageReceive= (payload)=>{
    const recivedMessage= JSON.parse(payload.body)
    console.log('message receive from websocket',recivedMessage);
    setMessages([...messages,recivedMessage])
  }

  useEffect(()=>{
      if(chatContainerRef.current){
        chatContainerRef.current.scrollTop=chatContainerRef.current.scrollHeight;
      }
    },[messages])
  return (
    <div>
      <Grid container className='h-screen overflow-y-hidden'>
        <Grid className='px-5' item xs={3}>
          <div className='flex h-full justify-between space-x-2'>
            <div className='w-full'>
              <div className='flex space-x-4 items-center py-5' onClick={backtoHome}>
                <WestIcon />
                <h1 className='text-xl font-bold'>Home</h1>
              </div>

              <div className='h-[83vh]'>
                <div className=''>
                  <SearchUser />
                </div>

                <div ref={chatContainerRef} className='h-full space-y-4 mt-5 overflow-y-scroll hideScrollbar'>
                  {
                    message.chats.map((item) => {
                      return <div onClick={() => {
                        setCurrentChat(item)
                        setMessages(item.messages)
                      }}>
                        <UserChatCard chat={item} />
                      </div>

                    })
                  }

                </div>

              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={9} className='h-full'>
          {currentChat ? <div>

            <div className='flex justify-between items-center border-l p-5'>

              <div className='flex items-center space-x-3'>

                <Avatar src={currentChat?.users[1]?.avatar} />
                <p>{auth.user?.id === currentChat.users[0]?.id ? currentChat.users[1].firstName + ' ' + currentChat.users[1].lastName :
                  currentChat.users[0].firstName + ' ' + currentChat.users[0].lastName}</p>

              </div>

              <div className='flex space-x-3' >
                <IconButton >
                  <AddIcCallIcon sx={{ fill: 'black' }} />
                </IconButton>

                <IconButton>
                  <VideoCallIcon sx={{ fill: 'black' }} />
                </IconButton>
              </div>
            </div>

            <div className='hideScrollbar overflow-y-scroll h-[82vh] px-2 space-y-5 py-5'>
              {messages.map((item) => <ChatMessage item={item} />)}
            </div>

            <div className='sticky bottom-0 border-1'>
              {selectedImage && <img className='w-[5rem] h-[5rem] object-cover px-2' src={selectedImage} alt="" />}
              <div className='py-5 flex items-center justify-center space-x-5'>

                <input
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.target.value) {
                      handleCreateMessage(e.target.value)
                      SetSelectedImage('')
                      e.target.value = ''
                    }
                  }}
                  className='bg-transparent border border-[#3b40544] rounded-full 
                  w-[90%] py-3 px-5'
                  type="text" placeholder='type message....' />
                <div>
                  <input type="file" accept='image/*' onChange={handleSelectImage} className='hidden' id='image-input' />
                  <label htmlFor="image-input">
                    <AddPhotoAlternateIcon />
                  </label>
                </div>
              </div>
            </div>
          </div> :
            <div className='h-full space-y-5 flex flex-col justify-center items-center'>
              <ChatBubbleOutlineIcon sx={{ fontSize: '10rem' }} />
              <p className='text-3xl font-semibold'>No Chat Selected</p>
            </div>}
        </Grid>
      </Grid>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}

export default message