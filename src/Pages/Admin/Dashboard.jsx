import {Box,Grid,Paper,Stack,Typography} from '@mui/material'
import React, { useEffect, useState } from 'react'
import {Pie,PieChart,Tooltip,Legend,ResponsiveContainer,Cell} from 'recharts'
import {getAlldetailsAboutDoctorsAPI, getAllPatientsDetailsAPI, showAppointmentsAPI} from '../../Services/ApiServices'
import { FaUserGroup } from "react-icons/fa6";
import { FaUserDoctor } from "react-icons/fa6";
import { MdOutlinePendingActions } from "react-icons/md";

export default function Dashboard() {
  const [patients, setPatients] = useState([])
  const [doctors, setDoctors] = useState([])
  const [appointments, setAppointments] = useState([])

  // GET ALL PATIENTS
  const getPatients = async () => {
    try {
      const res = await getAllPatientsDetailsAPI()
      console.log("Patients:", res.data)
      setPatients(res.data)

      const resp = await getAlldetailsAboutDoctorsAPI()
      console.log("Doctrs:",resp.data);
      setDoctors(resp.data)

      const response= await showAppointmentsAPI()
      console.log("Appointments",response.data);
      setAppointments(response.data)
      
    }
    catch (err) {
      console.log(err)
    }
  }

  const totalPatients = patients.length
  console.log(totalPatients);
  const totalDoctors=doctors.length
  console.log(totalDoctors);
  const pendingAppoinment = appointments.length
  console.log(pendingAppoinment);
  

  const disease=[...new Set(patients.map(item=>item.report?.disease))]
  console.log(disease);
  const chartdata=disease.map((dis)=>(
    {
      name:dis,
      value:patients.filter((item)=>item.report?.disease===dis).length
    }
  ))
  console.log(chartdata);
  const COLORS = ["#564eed","#195330","#806226","#8e644f","#3e6b93","#1a523d",];
  
  const department=[...new Set(patients.map(item=>item.department))]
  console.log(department);
  const chartdata2=department.map((dip)=>(
    {
      name2:dip,
      value2:patients.filter((item)=>item.department===dip).length
    }
  ))
  console.log(chartdata2);
  
  
  useEffect(()=>{getPatients()},[])

  return (
    <div>
      <Box sx={{minHeight: '100vh',backgroundColor: '#f7fafb',p: { xs: 1, sm: 2, md: 3}}}>
      {/* HEADER */}
      <Stack sx={{ minHeight: 90, justifyContent: 'center', px: {   xs: 2,   sm: 3 }, backgroundColor: 'lightskyblue', borderRadius: 2, mb: 3}}>
        <Typography variant="h4" sx={{   fontWeight: 700,   fontFamily: 'Lora, serif' }}> Dashboard </Typography>
      </Stack>
       <Grid container spacing={2}>
        {/* 1st card */}
        <Grid size={4}>
          <Paper sx={{boxShadow:5,display:'column',p:3,borderRadius:3}}>
            <Stack direction={'row'} sx={{justifyContent:'space-between',alignItems:'center'}}>
              <Typography variant='h6'><b>Total Patients</b></Typography>
              <Box sx={{width:50,height:50,backgroundColor:'lightpink',display:'flex',justifyContent:'center',alignItems:'center',borderRadius:1}}>
                <Typography variant='h4' sx={{color:'#1f68cd',display:'flex',justifyContent:'center',alignItems:'center'}}><FaUserGroup /></Typography>
              </Box>
            </Stack>
            <Typography variant='h4' sx={{fontFamily:'-moz-initial',fontWeight:1000}}>{totalPatients}</Typography>
            <Box  >
              <Typography variant='content'>Patients registered in </Typography> <br />
              <Typography variant='content'>the clinic</Typography>
            </Box>
          </Paper>
        </Grid>

        {/* 2nd card */}
        <Grid size={4}>
          <Paper sx={{boxShadow:5,display:'column',p:3,borderRadius:3}}>
            <Stack direction={'row'} sx={{justifyContent:'space-between',alignItems:'center'}}>
              <Typography variant='h6'><b>Total Doctors</b></Typography>
              <Box sx={{width:50,height:50,backgroundColor:'lightpink',display:'flex',justifyContent:'center',alignItems:'center',borderRadius:1}}>
                <Typography variant='h4' sx={{color:'#cd4a1f',display:'flex',justifyContent:'center',alignItems:'center'}}><FaUserDoctor /></Typography>
              </Box>
            </Stack>
            <Typography variant='h4' sx={{fontFamily:'-moz-initial',fontWeight:1000}}>{totalDoctors}</Typography>
            <Box  >
              <Typography variant='content'>Doctors Working in </Typography> <br />
              <Typography variant='content'>the clinic</Typography>
            </Box>
          </Paper>
        </Grid>

        {/* 3rd card */}
        <Grid size={4}>
          <Paper sx={{boxShadow:5,display:'column',p:3,borderRadius:3}}>
            <Stack direction={'row'} sx={{justifyContent:'space-between',alignItems:'center'}}>
              <Typography variant='h6'><b>Pending Appoinments</b></Typography>
              <Box sx={{width:50,height:50,backgroundColor:'lightpink',display:'flex',justifyContent:'center',alignItems:'center',borderRadius:1}}>
                <Typography variant='h4' sx={{color:'#1f68cd',display:'flex',justifyContent:'center',alignItems:'center'}}><MdOutlinePendingActions /></Typography>
              </Box>
            </Stack>
            <Typography variant='h4' sx={{fontFamily:'-moz-initial',fontWeight:1000}}>{pendingAppoinment}</Typography>
            <Box  >
              <Typography variant='content'>Pending  </Typography> <br />
              <Typography variant='content'>Appoinments</Typography>
            </Box>
          </Paper>
        </Grid>
        

       </Grid>

        {/* grid for patient details  */}
       <Grid container spacing={3} sx={{my:3}}>
        <Grid size={6} >
                {/* CHART 1 */}
      <Box sx={{ p:{ xs:2,sm: 3,md:4},backgroundColor:'#9fbbc2',m:2 }}>
        <Typography variant="h4" sx={{fontWeight: 700,mb: 2,textAlign: 'center',fontFamily:'-moz-initial'}}>Patients Diagnostis Details </Typography>
          <Box sx={{   width: '100%',   height: {     xs: 300,     sm: 350,     md: 400   } }}> 
            <ResponsiveContainer width="100%" height="100%">   
              <PieChart>     
              <Pie       
                activeShape={{ fill:'blue' }}
                     
                data={chartdata}       
                dataKey="value"       
                nameKey="name"       
                cx="50%"       
                cy="50%"       
                outerRadius="65%"       
                label       
                isAnimationActive={true} >       
                {         
                  chartdata.map((item, index) => (         
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>))
                }     
              </Pie>     
              <Tooltip />     
              <Legend />   
              </PieChart> 
            </ResponsiveContainer>
           </Box>

    </Box>


        </Grid>
        <Grid size={6} >
                {/* CHART 2*/}
      <Box sx={{ p:{ xs:2,sm: 3,md:4},backgroundColor:'#82bac7',m:2 }}>
        <Typography variant="h4" sx={{fontWeight: 700,mb: 2,textAlign: 'center',fontFamily:'-moz-initial'}}>Each Department patient List  </Typography>
          <Box sx={{   width: '100%',   height: {     xs: 300,     sm: 350,     md: 400   } }}> 
            <ResponsiveContainer width="100%" height="100%">   
              <PieChart>     
              <Pie       
                activeShape={{ fill:'blue' }}
                     
                data={chartdata2}       
                dataKey="value2"       
                nameKey="name2"       
                cx="50%"       
                cy="50%"       
                outerRadius="65%"       
                label       
                isAnimationActive={true} >       
                {         
                  chartdata2.map((item, index) => (         
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>))
                }     
              </Pie>     
              <Tooltip />     
              <Legend />   
              </PieChart> 
            </ResponsiveContainer>
           </Box>

    </Box>


        </Grid>
       </Grid>
    </Box>

    </div>
  )

}