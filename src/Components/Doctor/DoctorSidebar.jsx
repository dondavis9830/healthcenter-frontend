
import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import PendingActionsIcon from '@mui/icons-material/PendingActions'
import MedicationIcon from '@mui/icons-material/Medication'
import PeopleIcon from '@mui/icons-material/People'

export default function DoctorSidebar() {

  const location = useLocation()

  return (
    <Box
      sx={{width:'auto',minHeight:'100vh',backgroundColor:'#006d77',p:2,boxSizing:'border-box'}}
    >

      {/* CLINIC NAME */}

      <Box
        sx={{px:2,py:2.5,mb:3,borderBottom:'1px solid rgba(255,255,255,0.2)'}}
      >

        <Typography
          variant="h6"
          sx={{fontWeight:700,color:'#ffffff',fontFamily:'-moz-initial'}}
        >
          Dr. Don's
        </Typography>

        <Typography
          variant="body2"
          sx={{color:'rgba(255,255,255,0.7)',fontFamily:'-moz-initial'}}
        >
          Family Health Center
        </Typography>

      </Box>


      <Typography
        variant="caption"
        sx={{color:'rgba(255,255,255,0.55)',fontWeight:600,px:2}}
      >
        MENU
      </Typography>


      <Stack
        sx={{mt:1.5,gap:0.5}}
      >

        {/* HOME */}

        <Link
          to="/doctor"
          style={{textDecoration:'none'}}
        >

          <Box
            sx={{display:'flex',alignItems:'center',gap:2,px:2,py:1.4,borderRadius:2,color:'#ffffff',backgroundColor:location.pathname==='/doctor'?'rgba(255,255,255,0.18)':'transparent','&:hover':{backgroundColor:'rgba(255,255,255,0.1)'}}}
          >

            <HomeIcon />

            <Typography
              sx={{fontWeight:600}}
            >
              Home
            </Typography>

          </Box>

        </Link>


        {/* PENDING PATIENTS */}

        <Link
          to="/doctor/patients"
          style={{textDecoration:'none'}}
        >

          <Box
            sx={{display:'flex',alignItems:'center',gap:2,px:2,py:1.4,borderRadius:2,color:'#ffffff',backgroundColor:location.pathname==='/doctor/patients'?'rgba(255,255,255,0.18)':'transparent','&:hover':{backgroundColor:'rgba(255,255,255,0.1)'}}}
          >

            <PendingActionsIcon />

            <Typography
              sx={{fontWeight:600}}
            >
              Pending Patients
            </Typography>

          </Box>

        </Link>




        {/* ALL PATIENTS */}

        <Link
          to="/doctor/allPatients"
          style={{textDecoration:'none'}}
        >

          <Box
            sx={{display:'flex',alignItems:'center',gap:2,px:2,py:1.4,borderRadius:2,color:'#ffffff',backgroundColor:location.pathname==='/doctor/allPatients'?'rgba(255,255,255,0.18)':'transparent','&:hover':{backgroundColor:'rgba(255,255,255,0.1)'}}}
          >

            <PeopleIcon />

            <Typography
              sx={{fontWeight:600}}
            >
              My Patients
            </Typography>

          </Box>

        </Link>

      </Stack>

    </Box>
  )
}

