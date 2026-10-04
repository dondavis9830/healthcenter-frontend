import React from 'react'
import DoctorHeader from '../../Components/Doctor/DoctorHeader'
import { Outlet } from 'react-router-dom'
import DoctorSidebar from '../../Components/Doctor/DoctorSidebar'
import { Box,Stack } from '@mui/material'

export default function DoctorLayout() {
  return (
    <div>
       <Stack direction='row' sx={{m:1,gap:1,height:'98vh',overflow:'hidden'}}>
              <Box sx={{width:270,}}>
                <DoctorSidebar/>
              </Box>
              <Box sx={{display:'flex',flex:1,flexDirection:'column',height:'100%'}}>
                <DoctorHeader/>
                  <Box sx={{border:2,mt:1,overflowY:'auto',flex:1}}>
                    <Outlet />
                  </Box>
              </Box>
            </Stack>
    </div>
  )
}
