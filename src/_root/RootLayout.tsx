import React from 'react'
import TopBar from './../components/maincomponents/TopBar';
import BottomBar from '@/components/maincomponents/BottomBar';
import SideBar from '@/components/maincomponents/SideBar';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className='w-full md:flex'>
      <TopBar />
      <SideBar />
      <section className='flex flex-1 h-[100vh]' >
        <Outlet />
      </section>
      <div className='flex flex-1'>
        
      </div>
      <BottomBar />
    </div>
  )
}

export default RootLayout