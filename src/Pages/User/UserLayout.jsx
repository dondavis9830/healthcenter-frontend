import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../Components/User/Header'
import Footer from '../../Components/User/Footer'

export default function UserLayout() {
  return (
    <div>
      <Header/>
      <Outlet/>
    </div>
  )
}
