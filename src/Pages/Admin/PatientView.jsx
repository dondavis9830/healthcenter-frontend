import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { viewPatientDetailsAPI } from '../../Services/ApiServices';
import { Box, Button, Grid, Paper, Stack, Typography } from '@mui/material';


export default function PatientView() {
    const {id}=useParams()
    console.log(id);
    const [patient,setPatient]=useState({})

    const getPatientDetails=async()=>{
        const res = await viewPatientDetailsAPI(id)
        console.log(res);
        setPatient(res.data)
        
    }
    useEffect(()=>{getPatientDetails()},[])

    
  return (
    <div>
        <Stack direction={'row'} sx={{justifyContent:'space-evenly',}}>
           <Paper sx={{minHeight:'auto',mt:2,p:2,boxShadow:10,pb:6,minWidth:'600px'}}>
            <Typography variant='h5' sx={{textAlign:'center',fontWeight:700,my:2,fontFamily:'-moz-initial',textDecoration:'underline',color:'blue'}}>Patient Informations</Typography>
            <Stack sx={{m:3}}>
                <Typography variant='h6' sx={{fontWeight:700,fontFamily:'-moz-initial'}}>Demographic Informations</Typography>
                <Typography sx={{width:'80%',fontWeight:700,borderBottom:2}}></Typography>
            </Stack>           
            <Grid container spacing={2} sx={{mx:3}}>
                <Grid direction='column' size={6} >
                    <Typography sx={{}}>PHID</Typography>
                    <Typography sx={{}}>Full Name</Typography>
                    <Typography sx={{}}>Age</Typography>
                    <Typography sx={{}}>Gender</Typography>
                    <Typography sx={{}}>Address</Typography>
     
                </Grid>
                <Grid direction='column' size={6}>
                    <Typography sx={{fontWeight:700,textDecoration:'capitalized'}}>: {patient.PHID}</Typography>
                    <Typography sx={{fontWeight:700,textDecoration:'capitalized'}}>: {patient.name}</Typography>
                    <Typography sx={{fontWeight:700}}>: {patient.age}</Typography>
                    <Typography sx={{fontWeight:700,textDecoration:'capitalized'}}>: {patient.gender}</Typography>
                    <Typography sx={{fontWeight:700,textDecoration:'capitalized'}}>: {patient.address}</Typography>
                </Grid>

            </Grid>
            <Stack  sx={{m:3}} >
                <Typography variant='h6' sx={{fontWeight:700,fontFamily:'-moz-initial'}}>Additional Informations</Typography>
                <Typography sx={{width:'80%',fontWeight:700,borderBottom:2}}></Typography>
            </Stack> 
            <Grid container spacing={3} sx={{mx:3}}>
                <Grid direction='column' size={6} >
                    <Typography sx={{}}>Place</Typography>
                    <Typography sx={{}}>Contact Number</Typography>
                    <Typography sx={{}}>Status</Typography>
                </Grid>
                <Grid direction='column' size={6} >
                    <Typography sx={{fontWeight:700}}>: {patient.place}</Typography>
                    <Typography sx={{fontWeight:700}}>: {patient.number}</Typography>                       
                    <Typography sx={{fontWeight:700}}>: {patient.status}</Typography>                        
                </Grid>
            </Grid>
            <Stack  sx={{m:3}} >
                <Typography variant='h6' sx={{fontWeight:700,fontFamily:'-moz-initial'}}>Medical Informations</Typography>
                <Typography sx={{width:'80%',fontWeight:700,borderBottom:2}}></Typography>
            </Stack> 
            <Grid container spacing={3} sx={{mx:3}}>
                <Grid direction='column' size={6}>
                    <Typography sx={{}}>Visited Doctor</Typography>
                    <Typography sx={{}}>Disease</Typography>
                    <Typography sx={{}}>Blood Group</Typography>
                </Grid>
                <Grid direction='column' size={6} >
                    <Typography sx={{fontWeight:700}}>: {patient.doctor}</Typography>
                    <Typography sx={{fontWeight:700}}>: {patient.report?.disease}</Typography>                       
                    <Typography sx={{fontWeight:700}}>: {patient.bloodGroup}</Typography>                        
                </Grid>
            </Grid>

            {/* <Button sx={{m:1,bgcolor:'lightgreen',ml:3}}>View Reports</Button> */}




        </Paper>
      </Stack>

    </div>
  )
}
