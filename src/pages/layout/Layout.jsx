import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbaar from '../../component/navbaar/Navbaar'

const Layout = () => {
  return (
    <>
        <Navbaar/>
        <Outlet/>
    </>

  )
}

export default Layout