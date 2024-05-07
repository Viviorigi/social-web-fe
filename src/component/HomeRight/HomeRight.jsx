import React, { useEffect } from 'react'
import SearchUser from '../SearchUser/SearchUser'
import PopularUserCard from './PopularUserCard'
import { Card } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUser } from '../../Redux/Auth/auth.action'
const HomeRight = () => {
  const dispatch =useDispatch();
  const {auth}= useSelector(store=>store);
  useEffect(()=>{
    dispatch(getAllUser());
  },[]);
  console.log(auth);
  
  return (
    <div className='pr-5'>

      <SearchUser />

      <Card className='p-5'>
        <div className='flex justify-between py-5 items-center'>
          <p className='font-semibold opacity-70'>Suggestion for you</p>
          <p className='text-xs font-semibold opacity-95'>ViewAll</p>
        </div>

        <div className=''>
          {auth?.listUser.slice(0, 5).map((item=><PopularUserCard item={item} />))}
        </div>
      </Card>



    </div>
  )
}

export default HomeRight