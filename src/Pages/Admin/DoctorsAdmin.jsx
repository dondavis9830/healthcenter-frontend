import { Box, Button, Grid, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material'
import * as React from 'react';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { addDoctorDetailsAPI, deleteDoctordetailAPI, editDoctordetailsAPI, getAlldetailsAboutDoctorsAPI } from '../../Services/ApiServices';

const style = {
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

export default function DoctorsAdmin() {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [doctors,setDoctors]=useState([])        // for display doctors details
  const [editId,setEditId]=useState(null)        // for check id for edit
  const [doctor,setDoctor]=useState({            // add single doctor details
    name:'',
    specialization:'',
    year:'',
    number:'',
    email:'',
    city:'',
    state:'',
    availabilityDay:"",
    availabilityTime:"",
    role:"Doctor"

  })
  console.log(doctor);
  

  const handleSubmit=()=>{                  // what kind of operation done by handleSubmit update or add
    if(editId){
      updateDoctorDetails()
    }else{
      addDoctorDetails()
    }
  }

  const updateDoctorDetails=async()=>{      // PATCH operation api fetching details
    try{
      const res = await editDoctordetailsAPI(editId,doctor)
      console.log(res);
      alert('edit successfully compleated .....')
      setDoctor({
        name:'',
        doctorID:'',
        specialization:'',
        year:'',
        number:'',
        email:'',
        city:'',
        state:'',
        availabilityDay:"",
        availabilityTime:"",
      })
      getDoctorsDetails()
      handleClose()
    }
    catch(err){

    }
  }


  const addDoctorDetails=async()=>{     // Post operation for add doctor
    if(doctor.name===''|| doctor.specialization===''|| doctor.year===''|| doctor.number===''|| doctor.email===''||  doctor.city===''|| doctor.state===''|| doctor.availabilityDay===""||  doctor.availabilityTime===''){
      alert('plz fill all the field.....')
      return
    }                 
    try{
      const res = await addDoctorDetailsAPI(doctor)
      console.log(res);
      alert('successfully added .....')
      getDoctorsDetails()
      handleClose()
      setDoctor({ name:'', specialization:'',  year:'', number:'', email:'', city:'', state:'',availabilityDay:"", availabilityTime:""})

    }
    catch(err){
      console.log(err);
    }
  }

  const getDoctorsDetails = async()=>{                  // GET operation calling for display data of doctors
    try{
      const res = await getAlldetailsAboutDoctorsAPI()
      console.log(res.data);
      setDoctors(res.data)
    }
    catch(err){
      console.log(err);
    }
  }

  React.useEffect(()=>{getDoctorsDetails()},[])

  const handleEdit=(item)=>{                               // edit button handling for open modal with data item
    setDoctor(item)
    setEditId(item.id)
    handleOpen()
  }

  const deleteData=async(id)=>{
    try{
      const res = deleteDoctordetailAPI(id)
      console.log(res);
      alert('delete compleated')
      getDoctorsDetails()
    }catch(err){
      console.log(err);
      
    }
  }

  return (
    <div>
      <Box>
        <Stack direction={{ xs: 'column', md: 'row' }} sx={{  minHeight: 100,justifyContent: 'space-between',alignItems: { xs: 'stretch', md: 'center' },px: 3,gap: 2,backgroundColor:'lightskyblue',m:1}}>
          <Typography variant="h4" sx={{fontWeight: 700,fontFamily: 'Lora, serif',borderBottom:2}}>Our Doctors</Typography>
          {/* <TextField value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search patient..." size="small" sx={{ width: { xs: '100%', md: 400 },'& .MuiOutlinedInput-root': {borderRadius: 3, backgroundColor: '#fff',}}}/> */}
        </Stack>
        <Stack direction={'row'} sx={{p:2,py:3,m:1,justifyContent:'space-between',backgroundColor:'aquamarine',borderRadius:'5px'}}>
          <Typography variant='h5' sx={{fontWeight:700,fontFamily:'-moz-initial'}}>Add Doctors to our family</Typography>
          <Button onClick={handleOpen}>Add </Button>
        </Stack>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
               
              >
                <Box sx={{...style,width:700}}>
                  <Paper sx={{height:'auto',p:1}}>
                    <Typography variant='h4' sx={{fontFamily:'-moz-initial',textAlign:'center'}}>Add Informations</Typography>
                    <Grid container spacing={2}>
                      <Grid size={4}>
                        <Typography sx={{py:2,fontWeight:700,}}>Name</Typography>
                        <Typography sx={{py:2,fontWeight:700,}}>doctorID</Typography>
                        <Typography sx={{py:2,fontWeight:700,}}>Specialization</Typography>
                        <Typography sx={{py:2,fontWeight:700,}}>Experience</Typography>
                        <Typography sx={{py:2,fontWeight:700,}}>Contact Number</Typography>
                        <Typography sx={{py:2,fontWeight:700,}}>Contact Email</Typography>
                        <Typography sx={{py:2,fontWeight:700,}}>City</Typography>
                        <Typography sx={{py:2,fontWeight:700,}}>State</Typography>
                        <Typography sx={{py:2,fontWeight:700,}}>Available Days</Typography>
                        <Typography sx={{py:2,fontWeight:700,}}>Available Time</Typography>
                      </Grid>
                      <Grid size={8}>
                        <TextField size='small' sx={{py:1}} fullWidth value={doctor.name} onChange={(e)=>setDoctor({...doctor,name:e.target.value})} />
                        <TextField size='small' sx={{py:1}} fullWidth value={doctor.doctorID} onChange={(e)=>setDoctor({...doctor,doctorID:e.target.value})} />
                        <TextField size='small' sx={{py:1}} fullWidth value={doctor.specialization} onChange={(e)=>setDoctor({...doctor,specialization:e.target.value})} />
                        <TextField size='small' sx={{py:1}} fullWidth value={doctor.year} onChange={(e)=>setDoctor({...doctor,year:e.target.value})} />
                        <TextField size='small' sx={{py:1}} fullWidth value={doctor.number} onChange={(e)=>setDoctor({...doctor,number:e.target.value})} />
                        <TextField size='small' sx={{py:1}} fullWidth value={doctor.email} onChange={(e)=>setDoctor({...doctor,email:e.target.value})} />
                        <TextField size='small' sx={{py:1}} fullWidth value={doctor.city} onChange={(e)=>setDoctor({...doctor,city:e.target.value})} />
                        <TextField size='small' sx={{py:1}} fullWidth value={doctor.state} onChange={(e)=>setDoctor({...doctor,state:e.target.value})} />
                        <Select 
                          size='small'
                          sx={{my:1}} 
                          fullWidth
                          value={doctor.availabilityDay} 
                          onChange={(e)=>setDoctor({...doctor,availabilityDay:e.target.value})}
                        >
                          <MenuItem value={'mon-sat'}>monday - saturday</MenuItem>
                          <MenuItem value={'mon-wed'}>monday - wednesday</MenuItem>
                          <MenuItem value={'wed-sat'}>wednesday - saturday</MenuItem>
                          <MenuItem value={'mon-sun'}>monday - sunday</MenuItem>
                          <MenuItem value={'tue-thu'}>tuesday - thursday</MenuItem>
                        </Select>
                        <Select  
                          size='small'
                          sx={{my:1}} 
                          fullWidth 
                          value={doctor.availabilityTime} 
                          onChange={(e)=>setDoctor({...doctor,availabilityTime:e.target.value})}
                        >
                          <MenuItem value={'09:00AM - 01:00PM'}>09:00AM - 01:00PM</MenuItem>
                          <MenuItem value={'10:00AM - 02:00PM'}>10:00AM - 02:00PM</MenuItem>
                          <MenuItem value={'05:00PM - 09:00PM'}>05:00PM - 09:00PM</MenuItem>
                          <MenuItem value={'01:30PM - 05:30PM'}>01:30PM - 05:30PM</MenuItem>
                          <MenuItem value={'10:00AM - 01:00PM'}>10:00AM - 01:00PM</MenuItem>
                        </Select>

                      </Grid>

                    </Grid>
                    <Stack direction={'row'} sx={{justifyContent:'center',alignItems:'center',gap:4,margin:2}}>
                      <Button onClick={handleSubmit} sx={{backgroundColor:'aqua',color:'blue',fontWeight:600}}>Add & Proceed</Button>
                      <Button onClick={handleClose} sx={{backgroundColor:'coral',color:'black'}}>close</Button>
                    </Stack>

                  </Paper>
                </Box>
              </Modal>
      </Box>
      {/* doctors list */}
      <Box>
        <Stack direction={'column'}>
          {
            doctors?.map(item=>(
              <Box key={item.id} sx={{m:1,p:1,boxShadow:"5"}}>
                <Box sx={{px:2,}}>
                  <Stack direction={'row'}>
                    <Typography variant='h4' sx={{py:1,paddingRight:5,fontWeight:700,fontFamily:'sans-serif',textTransform:'capitalize'}}> {item.doctorID}</Typography>
                    <Typography variant='h4' sx={{py:1,fontWeight:700,fontFamily:'sans-serif',textTransform:'capitalize'}}> {item.name}</Typography>
                  </Stack>
                   <Grid container spacing={2}>                 
                    <Grid size={2}>
                      <Typography sx={{py:1,fontWeight:700,}}>Specialized</Typography>
                      <Typography sx={{py:1,fontWeight:700,}}>Experiece of years</Typography>
                      <Typography sx={{py:1,fontWeight:700,}}>Contact Number</Typography>
                      <Typography sx={{py:1,fontWeight:700,}}>Contact Email</Typography>

                    </Grid>
                    <Grid size={4}>
                      <Typography sx={{py:1,fontWeight:700,textTransform:'capitalize'}}>: {item.specialization}</Typography>
                      <Typography sx={{py:1,fontWeight:700,textTransform:'capitalize'}}>: {item.year}</Typography>
                      <Typography sx={{py:1,fontWeight:700,textTransform:'capitalize'}}>: {item.number}</Typography>
                      <Typography sx={{py:1,fontWeight:700,}}>: {item.email}</Typography>

                    </Grid>
                    <Grid size={2}>
                      <Typography sx={{py:1,fontWeight:700}}>City</Typography>
                      <Typography sx={{py:1,fontWeight:700}}>State</Typography>
                      <Typography sx={{py:1,fontWeight:700}}>Available Days</Typography>
                      <Typography sx={{py:1,fontWeight:700}}>Available Times</Typography>
                    </Grid>
                    <Grid size={4}>
                      <Typography sx={{py:1,fontWeight:700,textTransform:'capitalize'}}>: {item.city}</Typography>
                      <Typography sx={{py:1,fontWeight:700,textTransform:'capitalize'}}>: {item.state}</Typography>
                      <Typography sx={{py:1,fontWeight:700,textTransform:'capitalize'}}>: {item.availabilityDay}</Typography>
                      <Typography sx={{py:1,fontWeight:700,textTransform:'capitalize'}}>: {item.availabilityTime}</Typography>
                    </Grid>

                  </Grid>
                </Box>
                <Box sx={{p:2}}>
                  <Button onClick={()=>handleEdit(item)} sx={{backgroundColor:'skyblue',color:'black',m:1}}>Edit</Button>
                  <Button onClick={()=>deleteData(item.id)} sx={{backgroundColor:'red',color:'white',m:1}}>Delete</Button>
                </Box>
    
              </Box>
            ))
          }
        </Stack>


      </Box>
    </div>
  )
}
