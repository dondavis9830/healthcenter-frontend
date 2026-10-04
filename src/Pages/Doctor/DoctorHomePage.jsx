
import React from 'react'
import {
  Box,
  Button,
  Paper,
  Stack,
  Typography
} from '@mui/material'
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import PeopleIcon from '@mui/icons-material/People'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useNavigate } from 'react-router-dom'

export default function DoctorHomePage() {

  const navigate = useNavigate()

  const currentUser = JSON.parse(sessionStorage.getItem('currentuser'))

  return (
    <Box
      sx={{minHeight:'78vh',background:'#f5f9fc',display:'flex',alignItems:'center',justifyContent:'center',p:{xs:2,md:4}}}
    >
      <Paper
        elevation={0}
        sx={{width:'100%',maxWidth:1200,minHeight:550,borderRadius:5,overflow:'hidden',border:'1px solid #e2e8f0'}}
      >
        <Stack
          direction={{xs:'column',md:'row'}}
          sx={{minHeight:550}}
        >
          {/* LEFT SIDE */}
          <Box
            sx={{flex:1.2,p:{xs:4,md:7},display:'flex',flexDirection:'column',justifyContent:'center',background:'linear-gradient(135deg,#e7f7fa 0%,#f7fcfd 100%)'}}
          >
            <Stack
              direction="row"
              spacing={1.5}
              
              sx={{mb:4,alignItems:"center"}}
            >
              <MedicalServicesIcon
                sx={{fontSize:42,color:'#008c95'}}
              />
              <Typography
                variant="h6"
                sx={{fontWeight:700,color:'#17454a'}}
              >
                Dr. Don Healthcare Clinic
              </Typography>
            </Stack>
            <Typography
              sx={{color:'#008c95',fontWeight:600,mb:1}}
            >
              WELCOME BACK, DOCTOR
            </Typography>

            <Typography
              variant="h2"
              sx={{fontWeight:800,color:'#173b40',fontSize:{xs:42,md:58},lineHeight:1.1,mb:2}}
            >
              {currentUser?.name || 'Doctor'}
            </Typography>


            <Typography
              sx={{fontSize:18,color:'#60777b',maxWidth:520,lineHeight:1.7,mb:4}}
            >
              Manage your appointments, view your patients,
              and provide better healthcare from one place.
            </Typography>


            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate('/doctor/patients')}
              sx={{width:'fit-content',px:3.5,py:1.5,borderRadius:3,backgroundColor:'#008c95',fontWeight:700,textTransform:'none',fontSize:16,'&:hover':{backgroundColor:'#006f76'}}}
            >
              View My Patients
            </Button>

          </Box>


          {/* RIGHT SIDE */}

          <Box
            sx={{flex:0.8,p:{xs:3,md:5},display:'flex',flexDirection:'column',justifyContent:'center',gap:2.5,backgroundColor:'#ffffff'}}
          >

            <Typography
              variant="h5"
              sx={{fontWeight:700,color:'#173b40',mb:1}}
            >
              Your Dashboard
            </Typography>


            {/* APPOINTMENTS */}

            <Paper
              elevation={0}
              sx={{p:2.5,borderRadius:3,border:'1px solid #e2eeee',backgroundColor:'#f8fcfc'}}
            >

              <Stack
                direction="row"
                spacing={2}
                sx={{alignItems:"center"}}
              >

                <Box
                  sx={{width:52,height:52,borderRadius:2.5,display:'flex',alignItems:'center',justifyContent:'center',backgroundColor:'#e0f5f5'}}
                >

                  <CalendarMonthIcon
                    sx={{color:'#008c95'}}
                  />

                </Box>

                <Box>

                  <Typography
                    variant="h6"
                    sx={{fontWeight:700}}
                  >
                    Appointments
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    View your scheduled appointments
                  </Typography>

                </Box>

              </Stack>

            </Paper>


            {/* PATIENTS */}

            <Paper
              elevation={0}
              sx={{p:2.5,borderRadius:3,border:'1px solid #e2eeee',backgroundColor:'#f8fcfc'}}
            >

              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
              >

                <Box
                  sx={{width:52,height:52,borderRadius:2.5,display:'flex',alignItems:'center',justifyContent:'center',backgroundColor:'#e0f5f5'}}
                >

                  <PeopleIcon
                    sx={{color:'#008c95'}}
                  />

                </Box>

                <Box>

                  <Typography
                    variant="h6"
                    sx={{fontWeight:700}}
                  >
                    My Patients
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Access your patient records
                  </Typography>

                </Box>

              </Stack>

            </Paper>


            {/* DOCTOR PORTAL */}

            <Paper
              elevation={0}
              sx={{p:2.5,borderRadius:3,border:'1px solid #e2eeee',backgroundColor:'#f8fcfc'}}
            >

              <Typography
                variant="body2"
                sx={{color:'#008c95',fontWeight:600,mb:0.5}}
              >
                DOCTOR PORTAL
              </Typography>

              <Typography
                variant="body1"
                sx={{color:'#536b6f',lineHeight:1.6}}
              >
                Everything you need to manage your
                patients and appointments efficiently.
              </Typography>

            </Paper>

          </Box>

        </Stack>

      </Paper>

    </Box>
  )
}

