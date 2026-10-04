import React from 'react'
import AdminSidebar from '../../Components/Admin/AdminSidebar'
import AdminHeader from '../../Components/Admin/AdminHeader'
import { Outlet } from 'react-router-dom'
import { Box, Stack } from '@mui/material'



export default function AdminLayout() {

  return (
    <div>
      <Stack direction='row' sx={{m:1,gap:1,height:'98vh',overflow:'hidden'}}>
        <Box sx={{width:270,}}>
          <AdminSidebar/>
        </Box>
        <Box sx={{display:'flex',flex:1,flexDirection:'column',height:'100%'}}>
          <AdminHeader/>
            <Box sx={{border:2,mt:1,overflowY:'auto',flex:1}}>
              <Outlet />
            </Box>
        </Box>
      </Stack>

    </div>
  )
}
