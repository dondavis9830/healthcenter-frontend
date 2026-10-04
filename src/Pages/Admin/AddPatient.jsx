import React, { useEffect, useState } from 'react'
import { addPatientAPI, deleteAppointmentAPI, getAlldetailsAboutDoctorsAPI, getPatientDetailsThroughIdAPI, getPhidAPI, updatedPhidAPI,  } from '../../Services/ApiServices';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Grid, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';




export default function AddPatient() {
    const [doctorsName,setDoctorsName]=useState([])
    const [doctors, setDoctors] = useState([])
    const [doctorsDepartment,setDoctorsDepartment]=useState([])
    const {id} = useParams()
    const [phidId,setPhidid]=useState('')
    
    const navigate=useNavigate()
    // console.log(doctorsName);
    // console.log(doctorsDepartment);
    

    const [patient,setPatient]=useState({
       name:"",
       age:"",
       gender:"",
       doctor:"",
       number:"",
       place:"",
       address:"", 
       PHID:``,
       status:'',
       department:"",
       schedule:'',
       bloodGroup:'',
       reports:{},
    })
    console.log(patient);
    delete patient.id
    

    const getIdDetails=async()=>{
        if(id){
          try{
            const res = await getPatientDetailsThroughIdAPI(id)
            console.log(res.data);
            setPatient(res.data)
          }
          catch(err){
            console.log(err);
          }
        }
    }
    useEffect(()=>{getIdDetails()},[])

    const getPhidNumber = async () => {           //get phid value
      try {
        const resp = await getPhidAPI();
        console.log(resp.data[0].PHID);
        setPhidid(resp.data[0].PHID);
        setPatient(prev => ({...prev,PHID: resp.data[0].PHID}));
      }
      catch (err) {
        console.log(err);
      }
    };
    useEffect(()=>{getPhidNumber()},[])

    const savePatient = async () => {
      if(patient.name==="" ||patient.age==="" ||patient.gender==="" ||patient.doctor==="" ||patient.number==="" ||patient.place==="" ||patient.address==="" ||patient.PHID==="" ||patient.status==="" ||patient.department==="" ||patient.schedule==="" ) {
        alert("Please fill all the fields");
        return;
      }
        try {
          const res = await addPatientAPI(patient);
          console.log(res.data);

          const nextPhid = Number(phidId)+1;   //value incrimenting for next patient
          console.log(nextPhid);                 
    
          const resp = await updatedPhidAPI(nextPhid);   //data patch doing
          console.log(resp.data);

          if(id){                                       //deleting data from appoinmet
            await deleteAppointmentAPI(id);
          }
          alert("Successfully patient details added");
          navigate("/admin/patients");
        }
        catch (err) {
          console.log(err);
        }
    };
    
    const getDoctorsDetails=async()=>{
      try{
        const res = await getAlldetailsAboutDoctorsAPI()
        console.log(res.data);
        setDoctors(res.data)      //
        setDoctorsName(res.data.map(item=>item.name))          // nead for select menu list
        setDoctorsDepartment(res.data.map(item=>({label:item.name,value:item.specialization})))        // nead for select menu list
      }
      catch(err){

        console.log(err);
      }
      
    }
    useEffect(()=>{getDoctorsDetails()},[])

    

  return (
    <div>
        <Box sx={{}}>
          <Stack direction={{ xs: 'column', md: 'row' }} sx={{  minHeight: 100,justifyContent: 'space-between',alignItems: { xs: 'stretch', md: 'center' },px: 3,gap: 2,backgroundColor:'lightskyblue',m:1}}>
            <Typography variant="h4" sx={{fontWeight: 700,fontFamily: 'Lora, serif',borderBottom:2}}>Add More Patient Details</Typography>
            {/* <TextField value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search patient..." size="small" sx={{ width: { xs: '100%', md: 400 },'& .MuiOutlinedInput-root': {borderRadius: 3, backgroundColor: '#fff',}}}/> */}
          </Stack>

        <Box  sx={{px:3,py:3}}>
            <Grid container spacing={4}  >
                <Grid size={2}>
                   <Stack direction='column' sx={{gap:1}}>
                        <Typography sx={{py:2,fontWeight:700,}}>PHID</Typography>
                        <Typography sx={{py:2,fontWeight:700,}}>Full Name</Typography>
                        <Typography sx={{py:2,fontWeight:700}}>Age</Typography>
                        <Typography sx={{py:2,fontWeight:700}}>Gender</Typography>
                        <Typography sx={{py:2,fontWeight:700}}>Blood Group</Typography>
                        <Typography sx={{py:2,fontWeight:700}}>Doctor</Typography>    
                        <Typography sx={{py:2,fontWeight:700}}>Department</Typography>
                     </Stack>                
                </Grid>
                <Grid size={4}>
                    <Stack direction='column' sx={{gap:1}}>
                        <TextField size='medium' value={patient.PHID} disabled onChange={(e)=>setPatient({...patient,PHID:e.target.value})} />
                        <TextField size='medium'  value={patient.name} onChange={(e)=>setPatient({...patient,name:e.target.value})} />
                        <TextField size='medium'  value={patient.age} onChange={(e)=>setPatient({...patient,age:e.target.value})} />
                        <Select 
                          size='medium' 
                          labelId="demo-simple-select-label"
                          id="gender"
                          value={patient.gender}
                          onChange={(e)=>setPatient({...patient,gender:e.target.value})}
                        >
                          <MenuItem value={"male"}>Male</MenuItem>
                          <MenuItem value={"female"}>Female</MenuItem>
                          <MenuItem value={"Other"}>Other</MenuItem>
                        </Select>
                                              <Select 
                          size='medium' 
                          labelId="demo-simple-select-label"
                          id="department"
                          value={patient.bloodGroup}
                          onChange={(e)=>setPatient({...patient,bloodGroup:e.target.value})}
                        >
                          <MenuItem value={"A+Ve"}>A+ve</MenuItem>
                          <MenuItem value={"A-Ve"}>A-ve</MenuItem>
                          <MenuItem value={"B+Ve"}>B+ve</MenuItem>
                          <MenuItem value={"B-Ve"}>B-ve</MenuItem>
                          <MenuItem value={"AB+Ve"}>AB+ve</MenuItem>
                          <MenuItem value={"AB-Ve"}>AB-ve</MenuItem>
                          <MenuItem value={"0+Ve"}>0+ve</MenuItem>
                          <MenuItem value={"O-Ve"}>O-ve</MenuItem>
                         
                      </Select>
                        <Select 
                          size='medium' 
                          labelId="demo-simple-select-label"
                          id="doctor"
                          value={patient.doctor}
                          onChange={(e)=>{ const selectedDoctor = doctors.find(item=>item.name === e.target.value)
                                          if(selectedDoctor){
                                             setPatient({...patient,doctor:selectedDoctor.name,schedule:'',department:selectedDoctor.specialization})
                                          }
                          }}
                        >
                          {
                            doctors.map(item=>(
                              <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
                            ))
                          }
                        </Select>
                        <TextField size="medium" value={patient.department} disabled />
                    </Stack>
                </Grid>
                <Grid size={2}>
                    <Stack sx={{gap:1}} >
                      <Typography sx={{py:2,fontWeight:700}}>Availability</Typography>
                      <Typography sx={{py:2,fontWeight:700}}>Sheduled date & time </Typography>
                      <Typography sx={{py:2,fontWeight:700}}>Status</Typography>
                      <Typography sx={{py:2,fontWeight:700}}>Contact Number</Typography>
                      <Typography sx={{py:2,fontWeight:700}}>Place</Typography>
                      <Typography sx={{py:2,fontWeight:700}}>Address</Typography>
                    </Stack>
                </Grid>
                <Grid size={4}>
                   <Stack sx={{gap:1}}>
                      <TextField size='medium'  fullWidth disabled value={doctors.find(item=>item.name===patient.doctor)?.availabilityTime||''} />
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker']}>
                          <DateTimePicker value={patient.schedule ? dayjs(patient.schedule) : null} onChange={(value)=>setPatient({...patient,schedule:value?value.format('YYYY-MM-DDTHH:mm'):""})} />
                        </DemoContainer>
                      </LocalizationProvider>
                      <Select 
                        size='medium' 
                        fullWidth 
                        id='status' 
                        value={patient.status} 
                        onChange={(e)=>setPatient({...patient,status:e.target.value})}
                      >
                        <MenuItem sx={{textTransform:'capitalize'}} value={'appointment confirmed'}>appointment confirmed</MenuItem>
                        <MenuItem sx={{textTransform:'capitalize'}} value={'consulted'}>counsulted</MenuItem>
                      </Select>
                      <TextField size='medium'  fullWidth value={patient.number} onChange={(e)=>setPatient({...patient,number:e.target.value})} />
                      <TextField size='medium'  fullWidth value={patient.place} onChange={(e)=>setPatient({...patient,place:e.target.value})} />
                      <TextField size='medium'  fullWidth rows={2} multiline value={patient.address} onChange={(e)=>setPatient({...patient,address:e.target.value})} />
                  </Stack>
                  <Stack direction={'row'} sx={{mx:3,pt:2,justifyContent:'space-between',}}>
                     <Button onClick={savePatient} sx={{backgroundColor:'cyan',px:2,color:'black',fontWeight:700,}}>Add Patient</Button>
                     <Button onClick={()=>navigate('/admin/patients')} sx={{backgroundColor:'orange',px:2,color:'black',fontWeight:700,}}>Cancel</Button>
                  </Stack> 
                </Grid>
               </Grid>
        </Box>


        </Box>

    </div>
  )
}
