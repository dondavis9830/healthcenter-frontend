import { Stack, Typography } from '@mui/material'
import React from 'react'


export default function Profile() {
  return (
    <div>
      <Stack direction={{ xs: 'column', md: 'row' }} sx={{  minHeight: 100,justifyContent: 'space-between',alignItems: { xs: 'stretch', md: 'center' },px: 3,gap: 2,backgroundColor:'lightskyblue',m:1}}>
        <Typography variant="h4" sx={{fontWeight: 700,fontFamily: 'Lora, serif',borderBottom:2}}>Profile</Typography>
          {/* <TextField value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search patient..." size="small" sx={{ width: { xs: '100%', md: 400 },'& .MuiOutlinedInput-root': {borderRadius: 3, backgroundColor: '#fff',}}}/> */}
      </Stack>
    </div>
  )
}
