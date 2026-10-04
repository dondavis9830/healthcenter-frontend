
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Toolbar,
  Typography
} from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import LogoutIcon from '@mui/icons-material/Logout'

export default function DoctorHeader() {

  const navigate = useNavigate()

  const user = JSON.parse(
    sessionStorage.getItem('currentuser')
  )

  const logout = () => {
    sessionStorage.removeItem('currentuser')
    navigate('/')
  }

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{background:'linear-gradient(90deg,#006d77,#008c95)',py:2}}
    >

      <Toolbar
        sx={{justifyContent:'space-between',px:{xs:2,md:4}}}
      >

        {/* LOGO AND CLINIC NAME */}

        <Box
          sx={{display:'flex',alignItems:'center',gap:1.5}}
        >

          {/* <Box
            sx={{width:44,height:50,borderRadius:2.5,display:'flex',alignItems:'center',justifyContent:'center',backgroundColor:'rgba(255,255,255,0.15)'}}
          >

            <LocalHospitalIcon
              sx={{fontSize:28,color:'#ffffff'}}
            />

          </Box> */}

          <Box>

            <Typography
              variant="h4"
              sx={{fontWeight:800,fontFamily:'-moz-initial',color:'white',}}
            >
              Dr. Don's Family Health Center
            </Typography>

            <Typography
              variant="caption"
              sx={{color:'rgba(255,255,255,0.75)',letterSpacing:1}}
            >
              DOCTOR PORTAL
            </Typography>

          </Box>

        </Box>


        {/* DOCTOR PROFILE */}

        <Box
          sx={{display:'flex',alignItems:'center',gap:{xs:1,md:2}}}
        >

          <Box
            sx={{display:{xs:'none',sm:'block'},textAlign:'right'}}
          >

            <Typography
              sx={{fontWeight:700,color:'#ffffff',lineHeight:1.2}}
            >
              {user?.name || 'Doctor'}
            </Typography>

            <Typography
              variant="caption"
              sx={{color:'rgba(255,255,255,0.75)'}}
            >
              {user?.role || 'Doctor'}
            </Typography>

          </Box>


          <Avatar
            sx={{width:44,height:44,backgroundColor:'#ffffff',color:'#007780',fontWeight:800,textTransform:'uppercase',boxShadow:'0 3px 10px rgba(0,0,0,0.15)'}}
          >
            {user?.name?.charAt(0)}
          </Avatar>


          <Button
            variant="outlined"
            startIcon={<LogoutIcon />}
            onClick={logout}
            sx={{color:'#ffffff',borderColor:'rgba(255,255,255,0.5)',borderRadius:2.5,textTransform:'none',fontWeight:700,px:{xs:1.5,md:2.5},minWidth:{xs:0,md:100},'&:hover':{borderColor:'#ffffff',backgroundColor:'rgba(255,255,255,0.12)'}}}
          >
            <Box
              component="span"
              sx={{display:{xs:'none',sm:'inline'}}}
            >
              Logout
            </Box>
          </Button>

        </Box>

      </Toolbar>

    </AppBar>
  )
}

