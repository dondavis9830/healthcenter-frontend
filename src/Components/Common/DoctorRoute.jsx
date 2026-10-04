import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'


export default function DoctorRoute() {
  const navigate=useNavigate()
      const getUserDetails=async()=>{
        const doctor = JSON.parse(sessionStorage.getItem(`currentuser`))
          console.log(doctor);
          
        if(doctor){
          if(doctor.role==="Doctor"){
            navigate('/doctor')
          }
          else{
            alert('you dont have permission for this action')
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
