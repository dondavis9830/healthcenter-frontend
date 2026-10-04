import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { searchUserAPI } from '../../Services/ApiServices';



export default function UserRoute() {
  const navigate=useNavigate()

    const getUserDetails=async()=>{
      const user = JSON.parse(sessionStorage.getItem(`currentuser`))
        console.log(user);
        
      if(user){
        if(user.role==="user"){
          navigate('/user')
        }
        else{
          navigate('/register')
        }
      }
      else{
        alert('user not existing permmission not allowed')
        navigate('/')
      }
    }

    useEffect(()=>{getUserDetails()},[])
  
  return (
    <div>
     <Outlet/>
    </div>
  )
}

