import { Box, Button, Grid, MenuItem, Modal, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { deletePatientDetailsAPI, editPatientDetails, getAlldetailsAboutDoctorsAPI, getAllPatientsDetailsAPI } from '../../Services/ApiServices';
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';




const style = {          // style for modal
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function PatientsRecord() {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [doctors,setDoctors]=useState([])        
  const [doctorsName,setDoctorsName]=useState([])
  const [doctorsDepartment,setDoctorsDepartment]=useState([])

  const navigate=useNavigate()
  const [patient,setPatient]=useState([])
  const [search,setSearch]=useState('')
  const [dummyPatients,setDummyPatients]=useState([])
  const [editPatient,setEditPatient]=useState({})
  const [id,setId]=useState(null)

  const handleEdit=async(item)=>{        // item passed through handleEdit for edit patient data 
    console.log(item);
    setEditPatient(item)
    setId(item.id)
    handleOpen()
  }

  const updatePatientdetails=async()=>{       //upadating patient details
    try{
      const res = await editPatientDetails(id,editPatient)
      console.log(res);
      alert('edit successfully compleated......')
      handleClose()
      getAllDetailsOfPatients()
    }
    catch(err){
      console.log((err));
      
    }
  }

  const getDoctorsDetails=async()=>{         // get all doctors details
    try{
      const res = await getAlldetailsAboutDoctorsAPI()
      console.log(res.data);
      setDoctors(res.data)
      setDoctorsName(res.data.map(item=>item.name))          // nead for select menu list
      setDoctorsDepartment(res.data.map(item=>({label:item.name,value:item.specialization})))        // nead for select menu list
    }
    catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{getDoctorsDetails()},[])
  

  const getAllDetailsOfPatients=async()=>{           //get all patient details
    const res = await getAllPatientsDetailsAPI()
    console.log(res.data);
    setPatient(res.data)
    setDummyPatients(res.data)

  }

  useEffect(()=>{getAllDetailsOfPatients()},[])

  const searchPatientName=useMemo(()=>{            //search function for sarch name bay patient
    setPatient(dummyPatients.filter(item=>item.name.toLowerCase().includes(search.toLowerCase())))
  },[search])

  const deletePatientData=async(id)=>{            //delete patient
    try{
       const doctor = JSON.parse(sessionStorage.getItem(`currentuser`))
       console.log(doctor);
         
      if(doctor.role=="Doctor"){
        alert('you have no permissions')
      }
      const res = await deletePatientDetailsAPI(id)
      console.log(res);
      alert('Delete Successfully compleated.....')
      getAllDetailsOfPatients()
    }
    catch(err){
      console.log(err);
    }
  }
  

  return (
    <div>

      <Stack direction={{ xs: 'column', md: 'row' }} sx={{  minHeight: 100,justifyContent: 'space-between',alignItems: { xs: 'stretch', md: 'center' },px: 3,gap: 2,backgroundColor:'lightskyblue',m:1}}>
        <Typography variant="h4" sx={{fontWeight: 700,fontFamily: 'Lora, serif',borderBottom:2}}>Patient Records</Typography>
        <TextField value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search patient..." size="medium" sx={{ width: { xs: '100%', md: 400 },'& .MuiOutlinedInput-root': {borderRadius: 3, backgroundColor: '#fff',}}}/>
      </Stack>
      <Stack direction={'row'} sx={{p:2,py:3,m:1,justifyContent:'space-between',backgroundColor:'aquamarine',borderRadius:'5px'}}>
        <Typography variant='h4' sx={{fontWeight:700,fontFamily:'-moz-initial'}}>Add Patient</Typography>
        <Button onClick={()=>navigate('/admin/addPatient')}>Add </Button>
      </Stack>
      <Box sx={{m:1,mt:3}}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align='left'><Typography variant='h6' sx={{fontWeight:700}}>PHID</Typography></TableCell>
                <TableCell align='left' ><Typography variant='h6' sx={{fontWeight:700}}  >Patient Name</Typography></TableCell>
                <TableCell align="center"><Typography variant='h6' sx={{fontWeight:700}}>Disease</Typography></TableCell>
                <TableCell align="center"><Typography variant='h6' sx={{fontWeight:700}}>Contact Number</Typography></TableCell>
                <TableCell align="center"><Typography variant='h6' sx={{fontWeight:700}}>Reports</Typography></TableCell>
                <TableCell align="center"><Typography variant='h6' sx={{fontWeight:700}}>Details</Typography></TableCell>
                <TableCell align="center"><Typography variant='h6' sx={{fontWeight:700}}>Edit</Typography></TableCell>
                <TableCell align="center"><Typography variant='h6' sx={{fontWeight:700}}>Deleate</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {
              patient.length>0?patient.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align='left'>{item.PHID}</TableCell>
                  <TableCell align='left' >{item.name}</TableCell>
                  <TableCell align="center">{item.report?.disease}</TableCell>
                  <TableCell align="center">{item.number}</TableCell>
                  <TableCell align="center"><Button sx={{backgroundColor:'green',color:'white'}} onClick={()=>navigate(`/admin/patientReport/${item.id}`)} >View</Button></TableCell>
                  <TableCell align="center"><Button sx={{backgroundColor:'blue',color:'white'}} onClick={()=>navigate(`/admin/view/${item.id}`)}>View</Button></TableCell>
                  <TableCell align="center"><Button sx={{backgroundColor:'darkorchid',color:'white'}} onClick={()=>handleEdit(item)}>Edit</Button></TableCell>
                  <TableCell align="center"><Button sx={{backgroundColor:'red',color:'white'}} onClick={()=>deletePatientData(item.id)}>Delete</Button></TableCell>
                </TableRow>
              )).reverse()
              : (search ? <TableCell colSpan={8} sx={{fontWeight:700,backgroundColor:'skyblue',textAlign:'center',fontSize:20,fontFamily:'-moz-initial'}}>Patient Not Found</TableCell> 
                        : <TableCell colSpan={8} sx={{fontWeight:700,backgroundColor:'skyblue',textAlign:'center',fontSize:20,fontFamily:'-moz-initial'}} >Patient Details Empty</TableCell>)

            }
                                {/* <Button  onClick={() => {window.open(`https://wa.me/91${item.number}?text=${encodeURIComponent(`Your appointmet scheduled on ${item.schedule}`)}`,'_blank')}}>{item.number}</Button> */}

            </TableBody>
          </Table>
        </TableContainer>
              <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{...style,width:'auto'}}>
          <Paper sx={{p:2,minWidth:1000}} >
              <Grid container spacing={4}  >
                <Grid size={2}>
                   <Stack direction='column' sx={{gap:1}}>
                        <Typography sx={{py:2,fontWeight:700,}}>PHID</Typography>
                        <Typography sx={{py:2,fontWeight:700,}}>Full Name</Typography>
                        <Typography sx={{py:2,fontWeight:700}}>Age</Typography>
                        <Typography sx={{py:2,fontWeight:700}}>Gender</Typography>
                        <Typography sx={{py:2,fontWeight:700}}>Doctor</Typography>    
                        <Typography sx={{py:2,fontWeight:700}}>Department</Typography>
                     </Stack>                
                </Grid>
                <Grid size={4}>
                    <Stack direction='column' sx={{gap:1}}>
                        <TextField value={editPatient.PHID} disabled onChange={(e)=>setEditPatient({...editPatient,PHID:e.target.value})} />
                        <TextField value={editPatient.name} onChange={(e)=>setEditPatient({...editPatient,name:e.target.value})} />
                        <TextField value={editPatient.age} onChange={(e)=>setEditPatient({...editPatient,age:e.target.value})} />
                        <Select 
                          labelId="demo-simple-select-label"
                          id="gender"
                          value={editPatient.gender}
                          onChange={(e)=>setEditPatient({...editPatient,gender:e.target.value})}
                        >
                          <MenuItem value={"male"}>Male</MenuItem>
                          <MenuItem value={"female"}>Female</MenuItem>
                          <MenuItem value={"Other"}>Other</MenuItem>
                        </Select>
                        <Select 
                          labelId="demo-simple-select-label"
                          id="doctor"
                          value={editPatient.doctor || ''}
                          onChange={(e)=>{ const selectedDoctor = doctors.find(item=>item.name===e.target.value)
                                           if(selectedDoctor){
                                            setEditPatient({...editPatient,doctor:selectedDoctor.name,department:selectedDoctor.specialization})
                                           }
                          }}
                        >
                          {
                            doctorsName.map(item=>(
                              <MenuItem key={item} value={item}>{item}</MenuItem>
                            ))
                          }
                        </Select>
                        <TextField value={editPatient.department || ''} disabled fullWidth ></TextField>
                    </Stack>
                </Grid>
                <Grid size={2}>
                    <Stack sx={{gap:1}} >
                      <Typography sx={{py:2,fontWeight:700}}>Blood Group</Typography>
                      <Typography sx={{py:2,fontWeight:700}}>Availability</Typography>
                      <Typography sx={{py:2,fontWeight:700}}>Sheduled date and time </Typography>
                      <Typography sx={{py:2,fontWeight:700}}>Status</Typography>
                      <Typography sx={{py:2,fontWeight:700}}>Contact Number</Typography>
                      <Typography sx={{py:2,fontWeight:700}}>Place</Typography>
                      <Typography sx={{py:2,fontWeight:700}}>Address</Typography>
                    </Stack>
                </Grid>
                <Grid size={4}>
                   <Stack sx={{gap:1}}>
                      <Select 
                          labelId="demo-simple-select-label"
                          id="department"
                          value={editPatient.bloodGroup}
                          onChange={(e)=>setEditPatient({...editPatient,bloodGroup:e.target.value})}
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
                      <TextField fullWidth disabled value={doctors.find(item=>item.name === editPatient.doctor)?.availabilityTime || ''} ></TextField>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker']}>
                          <DateTimePicker value={editPatient.schedule ? dayjs(editPatient.schedule) : null} onChange={(value)=>setEditPatient({...editPatient,schedule:value?value.format('YYYY-MM-DD HH:mm a'):""})} />
                        </DemoContainer>
                      </LocalizationProvider>
                      <TextField fullWidth value={editPatient.status} onChange={(e)=>setEditPatient({...editPatient,status:e.target.value})} />
                      <TextField fullWidth value={editPatient.number} onChange={(e)=>setEditPatient({...editPatient,number:e.target.value})} />
                      <TextField fullWidth value={editPatient.place} onChange={(e)=>setEditPatient({...editPatient,place:e.target.value})} />
                      <TextField fullWidth rows={3} multiline value={editPatient.address} onChange={(e)=>setEditPatient({...editPatient,address:e.target.value})} />
                   </Stack>
                </Grid>
                <Button onClick={updatePatientdetails} sx={{backgroundColor:'cyan',px:2,py:1,color:'black',fontWeight:700,}}>Save & Proceed</Button>
            </Grid>
          </Paper>
        </Box>
      </Modal>
      </Box>
    </div>
  )
}
