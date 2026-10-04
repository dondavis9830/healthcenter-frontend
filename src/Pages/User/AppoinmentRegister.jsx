
import {
  Box,
  Stack,
  Typography,
  TextField,
  Grid,
  Paper,
  MenuItem,
  Select,
  Button,
  Divider,
  InputLabel,
  FormControl
} from '@mui/material'

import React, { useEffect, useState } from 'react'

import {
  bookAppointmentAPI,
  getAlldetailsAboutDoctorsAPI
} from '../../Services/ApiServices'

import { useNavigate } from 'react-router-dom'

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import PersonIcon from '@mui/icons-material/Person'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import PhoneIcon from '@mui/icons-material/Phone'
import LocationOnIcon from '@mui/icons-material/LocationOn'


export default function AppoinmentRegister() {

  const [doctorsName, setDoctorsName] = useState([])

  const navigate = useNavigate()

  const [appoinment, setAppointment] = useState({
    name: "",
    age: "",
    gender: "",
    doctor: "",
    number: "",
    place: "",
    address: "",
  })


  // ---------------- SUBMIT APPOINTMENT ----------------

  const submitAppointment = async () => {

    console.log(appoinment)

    try {

      const res = await bookAppointmentAPI(appoinment)

      console.log(res)

      alert('Appointment request submitted......')

      navigate('/user')

    }
    catch (err) {

      console.log(err)

    }

  }


  // ---------------- GET DOCTORS ----------------

  const getDoctorsDetails = async () => {

    try {

      const res = await getAlldetailsAboutDoctorsAPI()

      console.log(res.data)

      setDoctorsName(
        res.data.map(item => item.name)
      )

    }
    catch (err) {

      console.log(err)

    }

  }


  useEffect(() => {
    getDoctorsDetails()
  }, [])


  return (

    <Box
      sx={{
        minHeight: '100vh',
        background:
          'linear-gradient(135deg, #eef8f8 0%, #f8fbfb 50%, #eaf5f5 100%)',

        py: {
          xs: 3,
          sm: 5,
          md: 7,
          lg: 8
        },

        px: {
          xs: 1.5,
          sm: 3,
          md: 5,
          lg: 8
        }
      }}
    >

      {/* MAIN CONTAINER */}

      <Box
        sx={{
          width: '100%',
          maxWidth: '1050px',
          mx: 'auto'
        }}
      >

        {/* ---------------- HEADER ---------------- */}

        <Box
          sx={{
            textAlign: 'center',
            mb: {
              xs: 3,
              sm: 4,
              md: 5
            }
          }}
        >

   


          <Typography
            sx={{
              fontSize: {
                xs: '1.8rem',
                sm: '2.2rem',
                md: '2.7rem',
              },fontWeight:700,
              fontFamily:'-moz-initial',
              color: '#173b3f',

            }}
          >
            Book Appointment
          </Typography>


        </Box>


        {/* ---------------- FORM PAPER ---------------- */}

        <Paper
          elevation={0}
          sx={{
            width: '100%',

            p: {
              xs: 2,
              sm: 3,
              md: 5,
              lg: 6
            },

            borderRadius: {
              xs: 3,
              sm: 4
            },

            border: '1px solid #e1eeee',

            backgroundColor: 'rgba(255,255,255,0.95)',

            boxShadow:
              '0 20px 50px rgba(23,59,63,0.10)'
          }}
        >


          {/* ---------------- PERSONAL DETAILS ---------------- */}

          <Stack
            direction="row"
            spacing={1.2}
            alignItems="center"
            sx={{
              mb: 2
            }}
          >

            <PersonIcon
              sx={{
                color: '#006d77',
                fontSize: 26
              }}
            />

            <Typography
              sx={{
                fontSize: {
                  xs: '1.05rem',
                  sm: '1.2rem'
                },

                fontWeight: 700,

                color: '#173b3f'
              }}
            >
              Personal Information
            </Typography>

          </Stack>


          <Divider
            sx={{
              mb: {
                xs: 2.5,
                sm: 3
              }
            }}
          />


          <Grid
            container
            spacing={{
              xs: 2,
              sm: 2.5,
              md: 3
            }}
          >

            {/* NAME */}

            <Grid size={{ xs: 12, sm: 8 }}>

              <TextField
                fullWidth
                label="Full Name"
                value={appoinment.name}

                onChange={(e) =>
                  setAppointment({
                    ...appoinment,
                    name: e.target.value
                  })
                }

                slotProps={{
                  input: {
                    startAdornment: (
                      <PersonIcon
                        sx={{
                          color: '#7b9698',
                          mr: 1
                        }}
                      />
                    )
                  }
                }}

                sx={inputStyle}
              />

            </Grid>


            {/* AGE */}

            <Grid size={{ xs: 12, sm: 4 }}>

              <TextField
                fullWidth
                type="number"
                label="Age"
                value={appoinment.age}

                onChange={(e) =>
                  setAppointment({
                    ...appoinment,
                    age: e.target.value
                  })
                }

                sx={inputStyle}
              />

            </Grid>


            {/* GENDER */}

            <Grid size={{ xs: 12, sm: 6 }}>

              <FormControl fullWidth>

                <InputLabel>
                  Gender
                </InputLabel>

                <Select
                  value={appoinment.gender}
                  label="Gender"

                  onChange={(e) =>
                    setAppointment({
                      ...appoinment,
                      gender: e.target.value
                    })
                  }

                  sx={selectStyle}
                >

                  <MenuItem value="">
                    Select Gender
                  </MenuItem>

                  <MenuItem value="male">
                    Male
                  </MenuItem>

                  <MenuItem value="female">
                    Female
                  </MenuItem>

                  <MenuItem value="Other">
                    Other
                  </MenuItem>

                </Select>

              </FormControl>

            </Grid>


            {/* DOCTOR */}

            <Grid size={{ xs: 12, sm: 6 }}>

              <FormControl fullWidth>

                <InputLabel>
                  Doctor
                </InputLabel>

                <Select
                  value={appoinment.doctor}
                  label="Doctor"

                  onChange={(e) =>
                    setAppointment({
                      ...appoinment,
                      doctor: e.target.value
                    })
                  }

                  sx={selectStyle}
                >

                  <MenuItem value="">
                    Select Doctor
                  </MenuItem>

                  {
                    doctorsName.map((item, index) => (

                      <MenuItem
                        key={index}
                        value={item}
                      >
                        {item}
                      </MenuItem>

                    ))
                  }

                </Select>

              </FormControl>

            </Grid>

          </Grid>


          {/* ---------------- CONTACT DETAILS ---------------- */}

          <Stack
            direction="row"
            spacing={1.2}
            alignItems="center"
            sx={{
              mt: {
                xs: 4,
                sm: 5
              },

              mb: 2
            }}
          >

            <PhoneIcon
              sx={{
                color: '#006d77'
              }}
            />

            <Typography
              sx={{
                fontSize: {
                  xs: '1.05rem',
                  sm: '1.2rem'
                },

                fontWeight: 700,

                color: '#173b3f'
              }}
            >
              Contact Information
            </Typography>

          </Stack>


          <Divider
            sx={{
              mb: {
                xs: 2.5,
                sm: 3
              }
            }}
          />


          <Grid
            container
            spacing={{
              xs: 2,
              sm: 2.5,
              md: 3
            }}
          >

            {/* NUMBER */}

            <Grid size={{ xs: 12, sm: 6 }}>

              <TextField
                fullWidth
                label="Contact Number"
                type="tel"
                value={appoinment.number}

                onChange={(e) =>
                  setAppointment({
                    ...appoinment,
                    number: e.target.value
                  })
                }

                slotProps={{
                  input: {
                    startAdornment: (
                      <PhoneIcon
                        sx={{
                          color: '#7b9698',
                          mr: 1
                        }}
                      />
                    )
                  }
                }}

                sx={inputStyle}
              />

            </Grid>


            {/* PLACE */}

            <Grid size={{ xs: 12, sm: 6 }}>

              <TextField
                fullWidth
                label="Place"
                value={appoinment.place}

                onChange={(e) =>
                  setAppointment({
                    ...appoinment,
                    place: e.target.value
                  })
                }

                slotProps={{
                  input: {
                    startAdornment: (
                      <LocationOnIcon
                        sx={{
                          color: '#7b9698',
                          mr: 1
                        }}
                      />
                    )
                  }
                }}

                sx={inputStyle}
              />

            </Grid>


            {/* ADDRESS */}

            <Grid size={{ xs: 12 }}>

              <TextField
                fullWidth
                label="Full Address"
                multiline
                rows={{
                  xs: 3,
                  sm: 4
                }}

                value={appoinment.address}

                onChange={(e) =>
                  setAppointment({
                    ...appoinment,
                    address: e.target.value
                  })
                }

                sx={inputStyle}
              />

            </Grid>

          </Grid>


          {/* ---------------- BUTTON ---------------- */}

          <Box
            sx={{
              mt: {
                xs: 3,
                sm: 4
              },

              display: 'flex',

              justifyContent: {
                xs: 'stretch',
                sm: 'flex-end'
              }
            }}
          >

            <Button
              fullWidth
              variant="contained"

              onClick={submitAppointment}

              sx={{
                width: {
                  xs: '100%',
                  sm: '220px'
                },

                py: {
                  xs: 1.3,
                  sm: 1.5
                },

                borderRadius: 2,

                fontSize: {
                  xs: '0.95rem',
                  sm: '1rem'
                },

                fontWeight: 700,

                textTransform: 'none',

                backgroundColor: '#006d77',

                boxShadow:
                  '0 8px 20px rgba(0,109,119,0.20)',

                '&:hover': {
                  backgroundColor: '#00545c',

                  boxShadow:
                    '0 10px 25px rgba(0,109,119,0.28)'
                }
              }}
            >
              Submit Appointment
            </Button>

          </Box>

        </Paper>

      </Box>

    </Box>
  )
}


/* ---------------- COMMON INPUT STYLE ---------------- */

const inputStyle = {

  '& .MuiOutlinedInput-root': {

    borderRadius: 2,

    backgroundColor: '#ffffff',

    transition: '0.2s',

    '&:hover fieldset': {
      borderColor: '#006d77'
    },

    '&.Mui-focused fieldset': {
      borderColor: '#006d77',
      borderWidth: 2
    }
  },

  '& .MuiInputLabel-root.Mui-focused': {
    color: '#006d77'
  }

}


/* ---------------- SELECT STYLE ---------------- */

const selectStyle = {

  borderRadius: 2,

  backgroundColor: '#ffffff',

  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#006d77'
  },

  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#006d77',
    borderWidth: 2
  }

}
