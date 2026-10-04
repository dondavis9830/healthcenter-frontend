import React, { useEffect, useState } from 'react'
import { showAppointmentsAPI } from '../../Services/ApiServices';
import { Box, Button, Grid, Paper, Stack, Typography } from '@mui/material';
import {  useNavigate } from 'react-router-dom';



export default function Appoinmet() {
  const navigate=useNavigate()

  const [appointments,setAppointments]=useState()
  
  const showAppointments=async()=>{
    try{
      const res = await showAppointmentsAPI()
      console.log(res.data);
      setAppointments(res.data)
      
    }
    catch(err){
      console.log(err);
    }
    
  }
  useEffect(()=>{showAppointments()},[])
  

  return (
  <div>
    <Box sx={{}}>
      <Stack direction={{ xs: 'column', md: 'row' }} sx={{  minHeight: 100,justifyContent: 'space-between',alignItems: { xs: 'stretch', md: 'center' },px: 3,gap: 2,backgroundColor:'lightskyblue',m:1}}>
        <Typography variant="h4" sx={{fontWeight: 700,fontFamily: 'Lora, serif',borderBottom:2}}>Appoinments</Typography>
        {/* <TextField value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search patient..." size="small" sx={{ width: { xs: '100%', md: 400 },'& .MuiOutlinedInput-root': {borderRadius: 3, backgroundColor: '#fff',}}}/> */}
      </Stack>

  <Stack direction="row" sx={{flexWrap: 'wrap', gap:5 ,mt:2 ,p:1,}}>
    {
     appointments?.length>0?appointments.map(item => (
      <Paper key={item.id}  sx={{ p: 2, width:700,boxShadow:20 }}  >
        <Typography variant='h5' sx={{fontWeight:700,textTransform:'capitalize',mb:1}}>{item.name}</Typography>
        <Grid container spacing={2} >
          <Grid size={2}>
            
            <Stack direction="column" sx={{ gap: 1 }}>
              <Typography>Age</Typography>
              <Typography>Gender</Typography>
              <Typography>Contact Number</Typography>
            </Stack>
          </Grid>
          <Grid size={4}>
            <Stack direction="column" sx={{ gap: 1 }}>
              <Typography sx={{fontWeight:700}}>: {item.age}</Typography>
              <Typography sx={{fontWeight:700,textTransform:'capitalize'}}>: {item.gender}</Typography>
              <Typography sx={{fontWeight:700,textTransform:'capitalize'}}>: {item.number}</Typography>
            </Stack>
          </Grid>
          <Grid size={2}>
            <Stack direction="column" sx={{ gap: 1 }}>
              <Typography>Doctor</Typography>
              <Typography>Place</Typography>
              <Typography>Address</Typography>
            </Stack>
          </Grid>
          <Grid size={4}>
            <Stack direction="column" sx={{ gap: 1 }}>
              <Typography sx={{fontWeight:700,textTransform:'capitalize'}}>: {item.doctor}</Typography>
              <Typography sx={{fontWeight:700,textTransform:'capitalize'}}>: {item.place}</Typography>
              <Typography sx={{overflowWrap:'break-word',fontWeight:700,textTransform:'capitalize'}}>: {item.address}</Typography>
            </Stack>
          </Grid>
        </Grid>
        <Button onClick={()=>navigate(`/admin/addPatient/${item.id}`)} sx={{mt:2,bgcolor:'lavender'}}>Add patient</Button>
      </Paper>
    )):
    <Box>
      <Typography variant='h4' sx={{fontFamily:'-moz-initial'}}>Appoinments Now Empty</Typography>
    </Box>
    }
  </Stack>
  
</Box>
</div>
  )
}
