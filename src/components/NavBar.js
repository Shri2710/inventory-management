import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleUser } from '../store/slices/userSlice';
import Switch from '@mui/material/Switch';
import '../styles/NavBar.css';
import LogoutIcon from '@mui/icons-material/Logout';

const NavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector(state=>state.user);

  const handleToggleUser = ()=>{
    dispatch(toggleUser());
  }
  return (
    <div className='nav-bar-container'>
      <div className='toggle'>
      <div>admin</div>
      <Switch onChange={handleToggleUser} style={{color:'grey'}} defaultChecked={user === 'user'} className='switch' />
      <div className='mr-20'>user</div>
      </div>
      <div className='logo'>
        <LogoutIcon  />
      </div>
    </div>
  )
}

export default NavBar