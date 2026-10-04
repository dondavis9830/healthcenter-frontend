import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'



export default function AdminRoute() {

    const navigate=useNavigate()

    const getAdminDetails=async()=>{
      const user = JSON.parse(sessionStorage.getItem(`currentuser`))
        console.log(user);
        
      if(user){
        if(user.role==="admin"){
          navigate('/admin')
        }else(
          navigate('/login')
        )
      }
      else{
        alert('admin not existing.permmision not allowed')
          navigate('/')
        
      }

    }

    useEffect(()=>{getAdminDetails()},[])

  return(
    <div>
      <Outlet/>
    </div>
  )
   
}
