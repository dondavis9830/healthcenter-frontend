
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
    handleClose()
    setMobileOpen(false)
    navigate('/')
  }

  const handleNavigate = (path) => {
    navigate(path)
    setMobileOpen(false)
    handleClose()
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
          px: { xs: 2, sm: 3, md: 6 },
          py: { xs: 0.5, sm: 1, md: 1 },
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
                md: '1.8rem'
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
            sm: 'none',
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

          {user ? (
            <Box  sx={{
                display: {
                xs: 'none',
                sm: 'none',
                md: 'flex'
              },
              alignItems: 'center',
              gap: 0.5
             }}>
              <Typography
                variant="h6"
                sx={{
                  pl: 3
                }}
              >
                Welcome {user.name}
              </Typography>

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
                  onClick={() => handleNavigate('/user/profile')}
                >
                  My Profile
                </MenuItem>

                <MenuItem
                  onClick={() => handleNavigate('/user/appoinmentreg')}
                >
                  Book Appointment
                </MenuItem>

                <MenuItem
                  onClick={() => handleNavigate('/user/myAppoinment')}
                >
                  My Appointments
                </MenuItem>

                <MenuItem
                  onClick={() => handleNavigate('/user/myReport')}
                >
                  My Reports
                </MenuItem>

                <MenuItem onClick={logout}>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              sx={{ ml: 1 }}
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
          )}
        </Box>

        {/* MOBILE NAVIGATION */}
     <Box
  sx={{
    display: {
      xs: 'flex',
      sm: 'flex',
      md: 'none'
    },
    alignItems: 'center',
    gap: 1
  }}
>
  {user && (
    <Avatar

      sx={{
        display: {
      xs: 'none',
      sm: 'none',
      md: 'flex'
    },
        width: 35,
        height: 35,
        cursor: 'pointer'
      }}
      onClick={handleMenu}
    >
      {user.name?.charAt(0).toUpperCase()}
    </Avatar>
  )}

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
          {/* DRAWER HEADER */}
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
              Dr. Don's Family
              <br />
              Health Center
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

          {/* MOBILE MENU */}
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleNavigate('/')}
              >
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>

            {user ? (
              <>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => handleNavigate('/user/appoinmentreg')}
                  >
                    <ListItemText primary="Book Appointment" />
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
                  onClick={() => handleNavigate('/login')}
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

