import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material'

import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

import { useNavigate } from 'react-router-dom'

export default function Header() {

  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const user = JSON.parse(sessionStorage.getItem('currentuser'))

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const logout = () => {
    sessionStorage.removeItem('currentuser')
    navigate('/')
    handleClose()
  }

  const handleNavigate = (path) => {
    navigate(path)
    setMobileOpen(false)
  }

  return (

    <AppBar
      position="sticky"
      sx={{
        bgcolor: '#006d77'
      }}
    >

      <Toolbar
        sx={{
          minHeight: { xs: 64, sm: 70 },
          px: { xs: 2, sm: 3, md: 4 },
          justifyContent: 'space-between'
        }}
      >

        {/* LOGO */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 0.5, sm: 1 },
            cursor: 'pointer',
            minWidth: 0
          }}
          onClick={() => navigate('/')}
        >

          <LocalHospitalIcon
            sx={{
              fontSize: { xs: 27, sm: 32 }
            }}
          />

          <Typography
            fontWeight="bold"
            sx={{
              fontSize: {
                xs: '0.95rem',
                sm: '1.15rem',
                md: '1.25rem'
              },
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            Dr. Don's Family Health Center
          </Typography>

        </Box>


        {/* DESKTOP NAVIGATION */}
        <Box
          sx={{
            display: {
              xs: 'none',
              md: 'flex'
            },
            alignItems: 'center',
            gap: 0.5
          }}
        >

          <Button
            color="inherit"
            onClick={() => navigate('/')}
          >
            Home
          </Button>



          {/* USER */}
          {user ? (

            <>

              <Avatar
                sx={{
                  ml: 1,
                  width: 38,
                  height: 38,
                  cursor: 'pointer'
                }}
                onClick={handleMenu}
              >
                {user.name?.charAt(0).toUpperCase()}
              </Avatar>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >

                <MenuItem
                  onClick={() => {
                    navigate('/user/profile')
                    handleClose()
                  }}
                >
                  My Profile
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    navigate('/user/appoinmentreg')
                    handleClose()
                  }}
                >
                  Book Appointment
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    navigate('/user/myAppoinment')
                    handleClose()
                  }}
                >
                  My Appointments
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    navigate('/user/myReport')
                    handleClose()
                  }}
                >
                  My Reports
                </MenuItem>

                <MenuItem onClick={logout}>
                  Logout
                </MenuItem>

              </Menu>

            </>

          ) : (

            <Button
              variant="contained"
              color="secondary"
              sx={{ ml: 1 }}
              onClick={() => navigate('/LOGIN')}
            >
              Login
            </Button>

          )}

        </Box>


        {/* MOBILE */}
        <Box
          sx={{
            display: {
              xs: 'flex',
              md: 'none'
            },
            alignItems: 'center',
            gap: 1
          }}
        >

          {/* User Avatar on mobile */}
          {user && (
            <Avatar
              sx={{
                width: 35,
                height: 35,
                cursor: 'pointer'
              }}
              onClick={handleMenu}
            >
              {user.name?.charAt(0).toUpperCase()}
            </Avatar>
          )}

          {/* Hamburger */}
          <IconButton
            color="inherit"
            onClick={() => setMobileOpen(true)}
          >
            <MenuIcon />
          </IconButton>

        </Box>

      </Toolbar>


      {/* MOBILE DRAWER */}

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >

        <Box
          sx={{
            width: {
              xs: 260,
              sm: 300
            },
            height: '100%',
            bgcolor: '#006d77',
            color: 'white'
          }}
        >

          {/* Drawer Header */}

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 2,
              borderBottom: '1px solid rgba(255,255,255,0.2)'
            }}
          >

            <Typography
              fontWeight="bold"
              sx={{
                fontSize: '1.1rem'
              }}
            >
              Dr.Don's Family <br /> Health center
            </Typography>

            <IconButton
              onClick={() => setMobileOpen(false)}
              sx={{
                color: 'white'
              }}
            >
              <CloseIcon />
            </IconButton>

          </Box>


          {/* Mobile Menu */}

          <List>

            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleNavigate('/')}
              >
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>


            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleNavigate('/doctors')}
              >
                <ListItemText primary="Doctors" />
              </ListItemButton>
            </ListItem>


            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleNavigate('/service')}
              >
                <ListItemText primary="Services" />
              </ListItemButton>
            </ListItem>


            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleNavigate('/about')}
              >
                <ListItemText primary="About" />
              </ListItemButton>
            </ListItem>


            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleNavigate('/contact')}
              >
                <ListItemText primary="Contact" />
              </ListItemButton>
            </ListItem>


            {/* Logged in user */}

            {user ? (

              <>

                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => handleNavigate('/user/profile')}
                  >
                    <ListItemText primary="My Profile" />
                  </ListItemButton>
                </ListItem>


                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => handleNavigate('/user/appoinmentreg')}
                  >
                    <ListItemText primary="Book Appointment" />
                  </ListItemButton>
                </ListItem>


                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => handleNavigate('/user/myAppoinment')}
                  >
                    <ListItemText primary="My Appointments" />
                  </ListItemButton>
                </ListItem>


                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => handleNavigate('/user/myReport')}
                  >
                    <ListItemText primary="My Reports" />
                  </ListItemButton>
                </ListItem>


                <ListItem disablePadding>
                  <ListItemButton onClick={logout}>
                    <ListItemText primary="Logout" />
                  </ListItemButton>
                </ListItem>

              </>

            ) : (

              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => handleNavigate('/LOGIN')}
                >
                  <ListItemText primary="Login" />
                </ListItemButton>
              </ListItem>

            )}

          </List>

        </Box>

      </Drawer>

    </AppBar>
  )
}