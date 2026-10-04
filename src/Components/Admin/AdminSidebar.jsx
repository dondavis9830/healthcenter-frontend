import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'



export default function AdminSidebar() {
  return (
    <div>
      <Box sx={{bgcolor:'info.main',height:700,p:1,}}>
        <Box sx={{backgroundColor:'beige',p:2, }}>
          <Typography variant='h5'>Health Center</Typography>
        </Box>
        <Stack direction={'column'} sx={{gap:2,px:3,pt:5}}>
          <Link style={{textDecoration:'none',color:"black"}} to={'/admin'}><Typography sx={{}} variant='h6'>Dashboard</Typography></Link>
          <Link style={{textDecoration:'none',color:"black"}} to={'/admin/doctors'}><Typography sx={{}} variant='h6'>Doctors Record</Typography></Link>
          <Link style={{textDecoration:'none',color:"black"}} to={'/admin/addPatient'}><Typography sx={{}} variant='h6'>Add Patient</Typography></Link>
          <Link style={{textDecoration:'none',color:"black"}} to={'/admin/appoinment'}><Typography sx={{}} variant='h6'>Appoinment Requests</Typography></Link>
          <Link style={{textDecoration:'none',color:"black"}} to={'/admin/patients'}><Typography sx={{}} variant='h6'>Patients Record</Typography></Link>
          <Link style={{textDecoration:'none',color:"black"}} to={'/admin/reports'}><Typography sx={{}} variant='h6'>Patients Reports Pdf</Typography></Link>
        </Stack>
      </Box>
    </div>
  )
}