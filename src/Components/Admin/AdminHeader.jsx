import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminHeader() {

  const navigete=useNavigate()
  const logout=()=>{
    sessionStorage.removeItem(`currentuser`)
    navigete('/')
  }
  

  const user = JSON.parse(sessionStorage.getItem('currentuser'))
  // console.log(user);
  const {name} = user

  

  return (
    <div >
      <Box sx={{position: 'sticky',top: 0,zIndex: 10,backgroundColor: 'info.main',height: 72,display: 'flex',alignItems: 'center',px: 4,}}>
        <Stack direction="row" sx={{width: '100%',justifyContent: 'space-between',alignItems: 'center',}}>
          <Typography variant="h4" sx={{textTransform: 'capitalize',fontWeight: 600,fontFamily:'-moz-initial'}}> Welcome Super Admin {name} ..!</Typography>
          <Button variant="contained" onClick={logout} sx={{backgroundColor: 'purple',px: 2,py: 1,color: 'white',fontWeight: 700,'&:hover': {backgroundColor: '#6a1b9a',},}}>Logout</Button>
        </Stack>
      </Box>
    </div>
  )
}
