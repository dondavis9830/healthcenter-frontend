
import React, { useEffect, useState } from 'react'

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography
} from '@mui/material'

import MedicalServicesIcon from '@mui/icons-material/MedicalServices'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import StarIcon from '@mui/icons-material/Star'
import SchoolIcon from '@mui/icons-material/School'
import WorkHistoryIcon from '@mui/icons-material/WorkHistory'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

import { useNavigate } from 'react-router-dom'

import {
  getAlldetailsAboutDoctorsAPI
} from '../../Services/ApiServices'


export default function Home() {

  const navigate = useNavigate()

  const [doctors, setDoctors] = useState([])


  // ==============================
  // GET DOCTORS
  // ==============================

  const getDoctors = async () => {

    try {

      const res = await getAlldetailsAboutDoctorsAPI()

      console.log(res.data)

      setDoctors(res.data)

    } catch (error) {

      console.log(error)

    }

  }


  useEffect(() => {
    getDoctors()
  }, [])


  // ==============================
  // APPOINTMENT
  // ==============================

  const handleAppointment = () => {

    const user = JSON.parse(
      sessionStorage.getItem('currentuser')
    )

    if (user) {

      navigate('/user/appoinmentreg')

    } else {

      navigate('/LOGIN')

    }

  }


  return (

    

    <Box
      sx={{
        backgroundColor: '#f7fafb',
        overflow: 'hidden'
      }}
    >


      {/* =====================================================
                              HERO
      ===================================================== */}

      <Box
        id="home"
        sx={{
          minHeight: {
            xs: 'auto',
            md: '600px'
          },

          py: {
            xs: 7,
            sm: 8,
            md: 10
          },

          background:
            'linear-gradient(135deg,#e6f5f5 0%,#ffffff 70%)',

          display: 'flex',
          alignItems: 'center'
        }}
      >

        <Container maxWidth="lg">

          <Grid
            container
            spacing={{
              xs: 5,
              md: 7
            }}
            alignItems="center"
          >

            {/* HERO CONTENT */}

            <Grid
              size={{
                xs: 12,
                md: 6
              }}
            >

              <Typography
                sx={{
                  color: '#006d77',
                  fontWeight: 700,
                  mb: 2,
                  fontSize: {
                    xs: '0.95rem',
                    sm: '1rem'
                  }
                }}
              >
                Welcome to Dr. Don's Family Health Center
              </Typography>


              <Typography
                variant="h1"
                sx={{
                  fontWeight: 700,
                  color: '#173b3f',
                  lineHeight: 1.1,
                  mb: 3,

                  fontSize: {
                    xs: '2.4rem',
                    sm: '3.3rem',
                    md: '4.3rem'
                  }
                }}
              >
                Your Health,
                <br />
                Our Priority.
              </Typography>


              <Typography
                sx={{
                  color: 'text.secondary',
                  lineHeight: 1.8,
                  mb: 4,
                  maxWidth: 560,

                  fontSize: {
                    xs: '0.95rem',
                    sm: '1.05rem'
                  }
                }}
              >
                Compassionate healthcare with experienced
                doctors and modern medical services for you
                and your family.
              </Typography>


              <Stack
                direction={{
                  xs: 'column',
                  sm: 'row'
                }}
                spacing={2}
                sx={{
                  width: {
                    xs: '100%',
                    sm: 'auto'
                  }
                }}
              >

                <Button
                  variant="contained"
                  size="large"
                  onClick={handleAppointment}
                  sx={{
                    backgroundColor: '#006d77',
                    px: 3,
                    py: 1.5,
                    borderRadius: 2,

                    width: {
                      xs: '100%',
                      sm: 'auto'
                    },

                    '&:hover': {
                      backgroundColor: '#00545c'
                    }
                  }}
                >
                  Book Appointment
                </Button>


                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => {
                    document
                      .getElementById('doctors')
                      ?.scrollIntoView({
                        behavior: 'smooth'
                      })
                  }}
                  sx={{
                    color: '#006d77',
                    borderColor: '#006d77',
                    px: 3,
                    py: 1.5,
                    borderRadius: 2,

                    width: {
                      xs: '100%',
                      sm: 'auto'
                    }
                  }}
                >
                  Our Doctors
                </Button>

              </Stack>

            </Grid>


            {/* HERO VISUAL */}

            <Grid
              size={{
                xs: 12,
                md: 6
              }}
            >

              <Box
                sx={{
                  height: {
                    xs: 280,
                    sm: 360,
                    md: 420
                  },

                  backgroundColor: '#006d77',
                  borderRadius: {
                    xs: 4,
                    md: 6
                  },

                  position: 'relative',

                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',

                  overflow: 'hidden'
                }}
              >
                <img width='750' src="https://wallpapers.com/images/hd/mbbs-three-doctors-l6mpzm2z8xq90u8e.jpg" alt="" />


              </Box>

            </Grid>

          </Grid>

        </Container>

      </Box>


      {/* =====================================================
                              ABOUT
      ===================================================== */}

      <Box id="about">

        <Container
          maxWidth="lg"
          sx={{
            py: {
              xs: 7,
              sm: 8,
              md: 10
            }
          }}
        >

          <Grid
            container
            spacing={{
              xs: 5,
              md: 7
            }}
            alignItems="center"
          >

            <Grid
              size={{
                xs: 12,
                md: 6
              }}
            >

              <Box
                sx={{
                  height: {
                    xs: 280,
                    sm: 350,
                    md: 380
                  },

                  backgroundColor: '#006d77',

                  borderRadius: {
                    xs: 4,
                    md: 5
                  },

                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow:'hidden'
                }}
              >

             <img width='600' src="https://static.vecteezy.com/system/resources/previews/001/226/828/non_2x/doctor-consulting-a-patient-free-photo.jpg" alt="" />
              </Box>

            </Grid>


            <Grid
              size={{
                xs: 12,
                md: 6
              }}
            >

              <Typography
                sx={{
                  color: '#006d77',
                  fontWeight: 700,
                  letterSpacing: 1
                }}
              >
                ABOUT US
              </Typography>


              <Typography
                sx={{
                  fontWeight: 700,
                  color: '#173b3f',
                  mt: 1,
                  mb: 3,

                  fontSize: {
                    xs: '2rem',
                    sm: '2.5rem',
                    md: '3rem'
                  }
                }}
              >
                Healthcare that puts you first.
              </Typography>


              <Typography
                color="text.secondary"
                sx={{
                  lineHeight: 1.9,
                  mb: 2
                }}
              >
                Dr. Don's Family Health Center is committed
                to providing reliable and compassionate medical
                care for individuals and families.
              </Typography>


              <Typography
                color="text.secondary"
                sx={{
                  lineHeight: 1.9,
                  mb: 3
                }}
              >
                Our experienced healthcare professionals work
                together to provide quality treatment in a
                comfortable and caring environment.
              </Typography>


              <Button
                variant="contained"
                onClick={() => {
                  document
                    .getElementById('contact')
                    ?.scrollIntoView({
                      behavior: 'smooth'
                    })
                }}
                sx={{
                  backgroundColor: '#006d77',
                  borderRadius: 2,
                  px: 3,

                  '&:hover': {
                    backgroundColor: '#00545c'
                  }
                }}
              >
                Contact Us
              </Button>

            </Grid>

          </Grid>

        </Container>

      </Box>


      {/* =====================================================
                              SERVICES
      ===================================================== */}

      <Box
        id="services"
        sx={{
          backgroundColor: '#eaf5f5',
          py: {
            xs: 7,
            sm: 8,
            md: 10
          }
        }}
      >

        <Container maxWidth="lg">

          <Box
            sx={{
              textAlign: 'center',
              mb: {
                xs: 4,
                md: 6
              }
            }}
          >

            <Typography
              sx={{
                color: '#006d77',
                fontWeight: 700
              }}
            >
              OUR SERVICES
            </Typography>


            <Typography
              sx={{
                mt: 1,
                fontWeight: 700,
                color: '#173b3f',

                fontSize: {
                  xs: '2rem',
                  sm: '2.5rem',
                  md: '3rem'
                }
              }}
            >
              Healthcare Services
            </Typography>


            <Typography
              color="text.secondary"
              sx={{
                mt: 1,
                px: 2
              }}
            >
              Complete healthcare solutions for you and
              your family.
            </Typography>

          </Box>


          <Grid
            container
            spacing={{
              xs: 2,
              sm: 3
            }}
          >

            {[
              {
                icon: <MedicalServicesIcon />,
                title: 'General Consultation',
                text:
                  'Professional consultation and diagnosis from experienced doctors.'
              },

              {
                icon: <EventAvailableIcon />,
                title: 'Appointment Booking',
                text:
                  'Easily schedule appointments with your preferred doctor.'
              },

              {
                icon: <HealthAndSafetyIcon />,
                title: 'Patient Care',
                text:
                  'Personalized healthcare focused on your comfort and well-being.'
              }
            ].map((service, index) => (

              <Grid
                key={index}
                size={{
                  xs: 12,
                  sm: 6,
                  md: 4
                }}
              >

                <Card
                  sx={{
                    height: '100%',
                    borderRadius: 3,
                    boxShadow: 2,

                    transition: '0.3s',

                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 5
                    }
                  }}
                >

                  <CardContent
                    sx={{
                      p: {
                        xs: 3,
                        sm: 4
                      }
                    }}
                  >

                    {React.cloneElement(
                      service.icon,
                      {
                        sx: {
                          fontSize: 50,
                          color: '#006d77',
                          mb: 2
                        }
                      }
                    )}


                    <Typography
                      variant="h6"
                      fontWeight={700}
                    >
                      {service.title}
                    </Typography>


                    <Typography
                      color="text.secondary"
                      sx={{
                        mt: 1,
                        lineHeight: 1.7
                      }}
                    >
                      {service.text}
                    </Typography>

                  </CardContent>

                </Card>

              </Grid>

            ))}

          </Grid>

        </Container>

      </Box>


      {/* =====================================================
                              DOCTORS
      ===================================================== */}


<Box id="doctors">

  <Container
    maxWidth="lg"
    sx={{
      py: {
        xs: 6,
        sm: 8,
        md: 10
      }
    }}
  >

    {/* SECTION TITLE */}

    <Box
      sx={{
        textAlign: 'center',
        mb: {
          xs: 4,
          md: 6
        }
      }}
    >

      <Typography
        sx={{
          color: '#006d77',
          fontWeight: 700,
          letterSpacing: 1
        }}
      >
        OUR TEAM
      </Typography>

      <Typography
        sx={{
          mt: 1,
          fontWeight: 700,
          color: '#173b3f',
          fontSize: {
            xs: '2rem',
            sm: '2.5rem',
            md: '3rem'
          }
        }}
      >
        Meet Our Doctors
      </Typography>

      <Typography
        color="text.secondary"
        sx={{
          mt: 1,
          px: 2
        }}
      >
        Experienced doctors dedicated to providing quality healthcare.
      </Typography>

    </Box>


    {/* DOCTORS */}

    <Grid
      container
      spacing={{
        xs: 2,
        sm: 3,
        md: 4
      }}
    >

      {doctors.map((doctor) => (

        <Grid
          key={doctor.id}
          size={{
            xs: 12,
            sm: 6,
            md: 4,
            lg: 3
          }}
        >

          <Card
            sx={{
              height: '100%',
              borderRadius: 3,
              border: '1px solid #e0eeee',
              boxShadow: 1,
              transition: '0.3s',

              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: 4
              }
            }}
          >

            <CardContent
              sx={{
                p: {
                  xs: 2.5,
                  sm: 3
                }
              }}
            >

              {/* DOCTOR NAME */}

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: '#173b3f',
                  mb: 0.5,
                  wordBreak: 'break-word'
                }}
              >
                {doctor.name}
              </Typography>


              {/* SPECIALIZATION */}

              <Typography
                sx={{
                  color: '#006d77',
                  fontWeight: 600,
                  mb: 2
                }}
              >
                {doctor.specialization}
              </Typography>


              <Divider sx={{ mb: 2 }} />


              {/* EXPERIENCE */}

              <Box sx={{ mb: 1.5 }}>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Experience
                </Typography>

                <Typography
                  fontWeight={600}
                  color="#173b3f"
                >
                  {doctor.year} years
                </Typography>

              </Box>


              {/* AVAILABLE TIME */}

              <Box sx={{ mb: 1.5 }}>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Available Time
                </Typography>

                <Typography
                  fontWeight={600}
                  color="#173b3f"
                >
                  {doctor.availabilityTime}
                </Typography>

              </Box>


              {/* AVAILABLE DAYS */}

              <Box sx={{ mb: 2.5 }}>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Available Days
                </Typography>

                <Typography
                  fontWeight={600}
                  color="#173b3f"
                  sx={{
                    wordBreak: 'break-word'
                  }}
                >
                  {doctor.availabilityDay}
                </Typography>

              </Box>


              {/* APPOINTMENT BUTTON */}

              <Button
                fullWidth
                variant="contained"
                onClick={handleAppointment}
                sx={{
                  backgroundColor: '#006d77',
                  borderRadius: 2,
                  py: 1.2,

                  '&:hover': {
                    backgroundColor: '#00545c'
                  }
                }}
              >
                Book Appointment
              </Button>

            </CardContent>

          </Card>

        </Grid>

      ))}

    </Grid>

  </Container>

</Box>



      {/* =====================================================
                         FEEDBACK
      ===================================================== */}

      <Box
        id="feedback"
        sx={{
          backgroundColor: '#eaf5f5',
          py: {
            xs: 7,
            sm: 8,
            md: 10
          }
        }}
      >

        <Container maxWidth="lg">

          <Box
            sx={{
              textAlign: 'center',
              mb: {
                xs: 4,
                md: 6
              }
            }}
          >

            <Typography
              sx={{
                color: '#006d77',
                fontWeight: 700
              }}
            >
              PATIENT FEEDBACK
            </Typography>


            <Typography
              sx={{
                mt: 1,
                fontWeight: 700,
                color: '#173b3f',

                fontSize: {
                  xs: '2rem',
                  sm: '2.5rem',
                  md: '3rem'
                }
              }}
            >
              What Our Patients Say
            </Typography>

          </Box>


          <Grid
            container
            spacing={{
              xs: 2,
              md: 4
            }}
          >

            {[
              {
                name: 'Anjali',
                message:
                  'The doctors were very friendly and explained everything clearly. I had a wonderful experience.'
              },

              {
                name: 'Rahul',
                message:
                  'Booking an appointment was very easy. The staff and doctors provided excellent care.'
              },

              {
                name: 'Meera',
                message:
                  'A clean and comfortable clinic with professional doctors. Highly recommended.'
              }
            ].map((feedback, index) => (

              <Grid
                key={index}
                size={{
                  xs: 12,
                  md: 4
                }}
              >

                <Card
                  sx={{
                    height: '100%',
                    borderRadius: 3,
                    boxShadow: 2
                  }}
                >

                  <CardContent
                    sx={{
                      p: {
                        xs: 3,
                        sm: 4
                      }
                    }}
                  >

                    <Stack
                      direction="row"
                      sx={{ mb: 2 }}
                    >

                      {[1, 2, 3, 4, 5].map((star) => (

                        <StarIcon
                          key={star}
                          sx={{
                            color: '#f5b942',
                            fontSize: 20
                          }}
                        />

                      ))}

                    </Stack>


                    <Typography
                      color="text.secondary"
                      sx={{
                        lineHeight: 1.8,
                        mb: 3
                      }}
                    >
                      "{feedback.message}"
                    </Typography>


                    <Typography
                      fontWeight={700}
                      color="#173b3f"
                    >
                      {feedback.name}
                    </Typography>


                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Patient
                    </Typography>

                  </CardContent>

                </Card>

              </Grid>

            ))}

          </Grid>

        </Container>

      </Box>


      {/* =====================================================
                              CONTACT
      ===================================================== */}

      <Box id="contact">

        <Container
          maxWidth="lg"
          sx={{
            py: {
              xs: 7,
              sm: 8,
              md: 10
            }
          }}
        >

          <Box
            sx={{
              textAlign: 'center',
              mb: {
                xs: 4,
                md: 6
              }
            }}
          >

            <Typography
              sx={{
                color: '#006d77',
                fontWeight: 700
              }}
            >
              CONTACT US
            </Typography>


            <Typography
              sx={{
                mt: 1,
                fontWeight: 700,
                color: '#173b3f',

                fontSize: {
                  xs: '2rem',
                  sm: '2.5rem',
                  md: '3rem'
                }
              }}
            >
              Get In Touch
            </Typography>

          </Box>


          <Grid
            container
            spacing={{
              xs: 4,
              md: 6
            }}
          >

            {/* CONTACT DETAILS */}

            <Grid
              size={{
                xs: 12,
                md: 5
              }}
            >

              <Stack spacing={4}>

                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="flex-start"
                >

                  <LocationOnIcon
                    sx={{
                      color: '#006d77',
                      fontSize: 35
                    }}
                  />

                  <Box>

                    <Typography fontWeight={700}>
                      Address
                    </Typography>

                    <Typography
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                    >
                      Dr. Don's Family Health Center
                    </Typography>

                  </Box>

                </Stack>


                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                >

                  <PhoneIcon
                    sx={{
                      color: '#006d77',
                      fontSize: 30
                    }}
                  />

                  <Box>

                    <Typography fontWeight={700}>
                      Phone
                    </Typography>

                    <Typography
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                    >
                      +91 98765 43210
                    </Typography>

                  </Box>

                </Stack>


                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                >

                  <EmailIcon
                    sx={{
                      color: '#006d77',
                      fontSize: 30
                    }}
                  />

                  <Box sx={{ minWidth: 0 }}>

                    <Typography fontWeight={700}>
                      Email
                    </Typography>

                    <Typography
                      color="text.secondary"
                      sx={{
                        mt: 0.5,
                        wordBreak: 'break-word'
                      }}
                    >
                      info@drdonhealthcare.com
                    </Typography>

                  </Box>

                </Stack>

              </Stack>

            </Grid>


            {/* CONTACT FORM */}

            <Grid
              size={{
                xs: 12,
                md: 7
              }}
            >

              <Stack spacing={2}>

                <TextField
                  fullWidth
                  label="Your Name"
                />

                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                />

                <TextField
                  fullWidth
                  label="Message"
                  multiline
                  rows={5}
                />

                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    alignSelf: {
                      xs: 'stretch',
                      sm: 'flex-start'
                    },

                    backgroundColor: '#006d77',
                    px: 4,
                    borderRadius: 2,

                    '&:hover': {
                      backgroundColor: '#00545c'
                    }
                  }}
                >
                  Send Message
                </Button>

              </Stack>

            </Grid>

          </Grid>

        </Container>

      </Box>


      {/* =====================================================
                              FOOTER
      ===================================================== */}

      <Box
        sx={{
          backgroundColor: '#173b3f',
          color: 'white',
          pt: {
            xs: 6,
            md: 8
          },
          pb: 3
        }}
      >

        <Container maxWidth="lg">

          <Grid
            container
            spacing={{
              xs: 4,
              md: 6
            }}
          >

            {/* BRAND */}

            <Grid
              size={{
                xs: 12,
                sm: 6,
                md: 4
              }}
            >

              <Stack spacing={1.5}>

                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                >

                  <LocalHospitalIcon
                    sx={{
                      color: '#83c5be'
                    }}
                  />

                  <Typography
                    variant="h6"
                  >
                    Dr.Don's Family Health Center 
                  </Typography>

                </Stack>


                <Typography
                  variant="body2"
                  sx={{
                    color:
                      'rgba(255,255,255,0.7)',
                    lineHeight: 1.8
                  }}
                >
                  Family Health Center providing
                  compassionate and reliable healthcare
                  for individuals and families.
                </Typography>

              </Stack>

            </Grid>


            {/* QUICK LINKS */}

            <Grid
              size={{
                xs: 12,
                sm: 6,
                md: 3
              }}
            >

              <Typography
                fontWeight={700}
                sx={{ mb: 2 }}
              >
                Quick Links
              </Typography>


              <Stack spacing={1}>

                {[
                  ['Home', 'home'],
                  ['About', 'about'],
                  ['Services', 'services'],
                  ['Doctors', 'doctors'],
                  ['Feedback', 'feedback'],
                  ['Contact', 'contact']
                ].map(([name, id]) => (

                  <Typography
                    key={id}
                    variant="body2"
                    onClick={() => {
                      document
                        .getElementById(id)
                        ?.scrollIntoView({
                          behavior: 'smooth'
                        })
                    }}
                    sx={{
                      color:
                        'rgba(255,255,255,0.7)',
                      cursor: 'pointer',

                      '&:hover': {
                        color: '#ffffff'
                      }
                    }}
                  >
                    {name}
                  </Typography>

                ))}

              </Stack>

            </Grid>


            {/* CONTACT */}

            <Grid
              size={{
                xs: 12,
                md: 5
              }}
            >

              <Typography
                fontWeight={700}
                sx={{ mb: 2 }}
              >
                Contact Us
              </Typography>


              <Stack spacing={1.5}>

                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="flex-start"
                >

                  <LocationOnIcon
                    sx={{
                      color: '#83c5be'
                    }}
                  />

                  <Typography
                    variant="body2"
                    sx={{
                      color:
                        'rgba(255,255,255,0.7)'
                    }}
                  >
                    Dr. Don's Family Health Center
                  </Typography>

                </Stack>


                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                >

                  <PhoneIcon
                    sx={{
                      color: '#83c5be'
                    }}
                  />

                  <Typography
                    variant="body2"
                    sx={{
                      color:
                        'rgba(255,255,255,0.7)'
                    }}
                  >
                    +91 98765 43210
                  </Typography>

                </Stack>


                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                >

                  <EmailIcon
                    sx={{
                      color: '#83c5be'
                    }}
                  />

                  <Typography
                    variant="body2"
                    sx={{
                      color:
                        'rgba(255,255,255,0.7)',
                      wordBreak: 'break-word'
                    }}
                  >
                    drdon'shelthcenter@gmail.com
                  </Typography>

                </Stack>

              </Stack>

            </Grid>

          </Grid>


          <Divider
            sx={{
              my: 4,
              borderColor:
                'rgba(255,255,255,0.15)'
            }}
          />


          <Typography
            variant="body2"
            sx={{
              textAlign: 'center',
              color:
                'rgba(255,255,255,0.55)'
            }}
          >
            © {new Date().getFullYear()} Dr. Don's
            Family Health Center. All rights reserved.
          </Typography>

        </Container>

      </Box>

    </Box>
  )
}
