
import React,{useEffect,useState} from 'react'
import {getAllPatientsDetailsAPI,editPatientDetails} from '../../Services/ApiServices'
import {
  Box,
  Button,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import Modal from '@mui/material/Modal'

const style = {
  position:'absolute',
  top:'50%',
  left:'50%',
  transform:'translate(-50%,-50%)',
  width:'90%',
  maxWidth:1200,
  maxHeight:'90vh',
  overflowY:'auto',
  bgcolor:'background.paper',
  boxShadow:24,
  p:3,
  borderRadius:2
}

export default function OwnPatientsList() {

  const [open,setOpen] = useState(false)
  const [patients,setPatients] = useState([])
  const [patient,setPatient] = useState({})
  const [disease,setDisease] = useState('')

  const [medicines,setMedicines] = useState([
    {
      drug:'',
      strength:'',
      dosage:'',
      frequency:'',
      route:'',
      duration:''
    }
  ])


  // Get doctor's own patients

  const getDoctorsOwnPatients = async () => {

    try {

      const currentUser = JSON.parse(
        sessionStorage.getItem('currentuser')
      )

      console.log('Current doctor:',currentUser)

      const res = await getAllPatientsDetailsAPI()

      console.log('All patients:',res.data)

      const ownPatients = res.data.filter(item =>
          (item.doctor?.toLowerCase().includes((currentUser.name.toLowerCase()))
          &&(item.status?.toLowerCase() === 'appointment confirmed'))
      )

      console.log("Doctor's patients:",ownPatients)
      setPatients(ownPatients)
    }
    catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getDoctorsOwnPatients()
  },[])


  // Open prescription modal

  const addPrescription = (item) => {
    setPatient(item)
    setDisease('')
    setMedicines([
      {
        drug:'',
        strength:'',
        dosage:'',
        frequency:'',
        route:'',
        duration:''
      }
    ])
    setOpen(true)
  }
  // Close modal
  const handleClose = () => {
    setOpen(false)
    setPatient({})
  }

  // Add new medicine row
  const addMedicine = () => {setMedicines([...medicines,
      {
        drug:'',
        strength:'',
        dosage:'',
        frequency:'',
        route:'',
        duration:''
      }
    ])

  }


  // Update medicine

  const updateMedicine = (index,field,value) => {
    const updatedMedicines = [...medicines]
    updatedMedicines[index][field] = value
    setMedicines(updatedMedicines)
  }
  // Save prescription to patient report

  const savePrescription = async () => {

    if(!disease){
      alert('please select a disease')
      return
    }

    // Check empty fields
    const invalidMedicine = medicines.some(item =>
      !item.drug ||
      !item.strength ||
      !item.dosage ||
      !item.frequency ||
      !item.route ||
      !item.duration
    )
    if(invalidMedicine) {
      alert('Please fill all medicine fields')
      return
    }
    try {
      const updatedPatient = {...patient,report: { ...patient.report,disease:disease, prescription: medicines },status:'Completed'}
      console.log('Patient before update:',updatedPatient)

      const res = await editPatientDetails( patient.id, updatedPatient)
      console.log('Updated patient:',res)

      alert('Prescription added successfully')
      handleClose()
      getDoctorsOwnPatients()
    }
    catch(err) {console.log(err)
      alert('Something went wrong')
    }
  }

  return (
    <Box>
      {/* PAGE HEADER */}
      <Stack
        direction={{xs:'column',md:'row'}}
        sx={{
          minHeight:100,
          justifyContent:'space-between',
          alignItems:{xs:'stretch',md:'center'},
          px:3,
          gap:2,
          backgroundColor:'lightskyblue',
          m:1
        }}
      >

        <Typography
          variant="h4"
          sx={{
            fontWeight:700,
            fontFamily:'Lora, serif',
            borderBottom:2
          }}
        >
          My Patients
        </Typography>

      </Stack>


      {/* PATIENT TABLE */}

      <Box sx={{mx:1,boxShadow:20}}>

        <TableContainer component={Paper}>

          <Table>

            <TableHead>

              <TableRow>

                <TableCell>
                  <b>PHID</b>
                </TableCell>

                <TableCell>
                  <b>Patient Name</b>
                </TableCell>

                <TableCell>
                  <b>Doctor</b>
                </TableCell>

                <TableCell>
                  <b>Appointment</b>
                </TableCell>

                <TableCell>
                  <b>Status</b>
                </TableCell>

                <TableCell>
                  <b>Prescription</b>
                </TableCell>

              </TableRow>

            </TableHead>


            <TableBody>

              {
                patients.length > 0

                ?

                patients.map(item => (

                  <TableRow key={item.id}>

                    <TableCell>
                      {item.PHID}
                    </TableCell>

                    <TableCell>
                      {item.name}
                    </TableCell>

                    <TableCell>
                      {item.doctor}
                    </TableCell>

                    <TableCell>
                      {item.schedule}
                    </TableCell>

                    <TableCell>
                      {item.status}
                    </TableCell>

                    <TableCell>

                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => addPrescription(item)}
                      >
                        ADD
                      </Button>

                    </TableCell>

                  </TableRow>

                ))

                :

                <TableRow>

                  <TableCell
                    colSpan={6}
                    align="center"
                  >
                    No patients found
                  </TableCell>

                </TableRow>

              }

            </TableBody>

          </Table>

        </TableContainer>


        {/* PRESCRIPTION MODAL */}

        <Modal
          open={open}
          onClose={handleClose}
        >

          <Box sx={style}>

            {/* PATIENT DETAILS */}

            <Paper sx={{p:2,mb:3}}>

              <Typography
                variant="h6"
                sx={{
                  fontWeight:700,
                  mb:2
                }}
              >
                Patient Details
              </Typography>


              <Stack
                direction={{xs:'column',sm:'row'}}
                spacing={4}
                flexWrap="wrap"
              >

                <Typography>
                  <b>PHID:</b> {patient.PHID}
                </Typography>

                <Typography>
                  <b>Name:</b> {patient.name}
                </Typography>

                <Typography>
                  <b>Age:</b> {patient.age}
                </Typography>

                <Typography>
                  <b>Gender:</b> {patient.gender}
                </Typography>

                <Typography>
                  <b>Doctor:</b> {patient.doctor}
                </Typography>

                <Typography>
                  <b>Department:</b> {patient.department}
                </Typography>

                <Typography>
                  <b>Blood Group:</b> {patient.bloodGroup}
                </Typography>

                <Typography>
                  <b>Status:</b> {patient.status}
                </Typography>



              </Stack>

            </Paper>


            {/* PRESCRIPTION */}

            <Paper sx={{p:3}}>

              <Typography
                variant="h6"
                sx={{
                  fontWeight:700,
                  mb:2
                }}
              >
                Add Prescription
              </Typography>
              <Stack spacing={1} sx={{mb:3}}>
  <Typography fontWeight={600}>Disease</Typography>
  <Select
    fullWidth
    displayEmpty
    value={disease}
    onChange={(e)=>setDisease(e.target.value)}
  >
    <MenuItem value="">Select Disease</MenuItem>
    <MenuItem value="Fever">Fever</MenuItem>
    <MenuItem value="Common Cold">Common Cold</MenuItem>
    <MenuItem value="Cough">Cough</MenuItem>
    <MenuItem value="Flu">Flu</MenuItem>
    <MenuItem value="Headache">Headache</MenuItem>
    <MenuItem value="Diabetes">Diabetes</MenuItem>
    <MenuItem value="Hypertension">Hypertension</MenuItem>
    <MenuItem value="Asthma">Asthma</MenuItem>
  </Select>
</Stack>


              <TableContainer
                sx={{
                  overflowX:'auto',
                  border:'1px solid #ddd'
                }}
              >

                <Table>

                  <TableHead>

                    <TableRow>

                      <TableCell>
                        <b>Drug</b>
                      </TableCell>

                      <TableCell>
                        <b>Strength</b>
                      </TableCell>

                      <TableCell>
                        <b>Dosage</b>
                      </TableCell>

                      <TableCell>
                        <b>Frequency</b>
                      </TableCell>

                      <TableCell>
                        <b>Route</b>
                      </TableCell>

                      <TableCell>
                        <b>Duration</b>
                      </TableCell>

                      <TableCell>
                        <b>Action</b>
                      </TableCell>

                    </TableRow>

                  </TableHead>

                  <TableBody>

                    {
                      medicines.map((item,index) => (

                        <TableRow key={index}>

                          {/* DRUG */}

                          <TableCell sx={{minWidth:150}}>

                            <Select
                              size="small"
                              fullWidth
                              value={item.drug}
                              displayEmpty
                              onChange={(e) =>
                                updateMedicine(
                                  index,
                                  'drug',
                                  e.target.value
                                )
                              }
                            >

                              <MenuItem value="">
                                Select Drug
                              </MenuItem>

                              <MenuItem value="Paracetamol">
                                Paracetamol
                              </MenuItem>

                              <MenuItem value="Amoxicillin">
                                Amoxicillin
                              </MenuItem>

                              <MenuItem value="Azithromycin">
                                Azithromycin
                              </MenuItem>

                              <MenuItem value="Cetirizine">
                                Cetirizine
                              </MenuItem>

                              <MenuItem value="Ibuprofen">
                                Ibuprofen
                              </MenuItem>

                            </Select>

                          </TableCell>


                          {/* STRENGTH */}

                          <TableCell sx={{minWidth:120}}>

                            <Select
                              size="small"
                              fullWidth
                              value={item.strength}
                              displayEmpty
                              onChange={(e) =>
                                updateMedicine(
                                  index,
                                  'strength',
                                  e.target.value
                                )
                              }
                            >

                              <MenuItem value="">
                                Select
                              </MenuItem>

                              <MenuItem value="250 mg">
                                250 mg
                              </MenuItem>

                              <MenuItem value="500 mg">
                                500 mg
                              </MenuItem>

                              <MenuItem value="650 mg">
                                650 mg
                              </MenuItem>

                              <MenuItem value="1000 mg">
                                1000 mg
                              </MenuItem>

                            </Select>

                          </TableCell>


                          {/* DOSAGE */}

                          <TableCell sx={{minWidth:120}}>

                            <Select
                              size="small"
                              fullWidth
                              value={item.dosage}
                              displayEmpty
                              onChange={(e) =>
                                updateMedicine(
                                  index,
                                  'dosage',
                                  e.target.value
                                )
                              }
                            >

                              <MenuItem value="">
                                Select
                              </MenuItem>

                              <MenuItem value="1 tablet">
                                1 tablet
                              </MenuItem>

                              <MenuItem value="2 tablets">
                                2 tablets
                              </MenuItem>

                              <MenuItem value="5 ml">
                                5 ml
                              </MenuItem>

                              <MenuItem value="10 ml">
                                10 ml
                              </MenuItem>

                            </Select>

                          </TableCell>


                          {/* FREQUENCY */}

                          <TableCell sx={{minWidth:140}}>

                            <Select
                              size="small"
                              fullWidth
                              value={item.frequency}
                              displayEmpty
                              onChange={(e) =>
                                updateMedicine(
                                  index,
                                  'frequency',
                                  e.target.value
                                )
                              }
                            >

                              <MenuItem value="">
                                Select
                              </MenuItem>

                              <MenuItem value="Once daily">
                                Once daily
                              </MenuItem>

                              <MenuItem value="Twice daily">
                                Twice daily
                              </MenuItem>

                              <MenuItem value="Three times daily">
                                Three times daily
                              </MenuItem>

                              <MenuItem value="As needed">
                                As needed
                              </MenuItem>

                            </Select>

                          </TableCell>


                          {/* ROUTE */}

                          <TableCell sx={{minWidth:120}}>

                            <Select
                              size="small"
                              fullWidth
                              value={item.route}
                              displayEmpty
                              onChange={(e) =>
                                updateMedicine(
                                  index,
                                  'route',
                                  e.target.value
                                )
                              }
                            >

                              <MenuItem value="">
                                Select
                              </MenuItem>

                              <MenuItem value="Oral">
                                Oral
                              </MenuItem>

                              <MenuItem value="Topical">
                                Topical
                              </MenuItem>

                              <MenuItem value="Injection">
                                Injection
                              </MenuItem>

                              <MenuItem value="Inhalation">
                                Inhalation
                              </MenuItem>

                            </Select>

                          </TableCell>


                          {/* DURATION */}

                          <TableCell sx={{minWidth:120}}>

                            <Select
                              size="small"
                              fullWidth
                              value={item.duration}
                              displayEmpty
                              onChange={(e) =>
                                updateMedicine(
                                  index,
                                  'duration',
                                  e.target.value
                                )
                              }
                            >

                              <MenuItem value="">
                                Select
                              </MenuItem>

                              <MenuItem value="3 days">
                                3 days
                              </MenuItem>

                              <MenuItem value="5 days">
                                5 days
                              </MenuItem>

                              <MenuItem value="7 days">
                                7 days
                              </MenuItem>

                              <MenuItem value="10 days">
                                10 days
                              </MenuItem>

                              <MenuItem value="14 days">
                                14 days
                              </MenuItem>

                            </Select>

                          </TableCell>




                        </TableRow>

                      ))
                    }

                  </TableBody>

                </Table>

              </TableContainer>


              {/* ADD MEDICINE */}

              <Button
                variant="outlined"
                sx={{mt:2}}
                onClick={addMedicine}
              >
                + Add Medicine
              </Button>


              {/* BUTTONS */}

              <Stack
                direction="row"
                spacing={2}
                sx={{
                  justifyContent:'flex-end',
                  mt:3
                }}
              >

                <Button
                  variant="outlined"
                  onClick={handleClose}
                >
                  Cancel
                </Button>

                <Button
                  variant="contained"
                  onClick={savePrescription}
                >
                  Save Prescription
                </Button>

              </Stack>

            </Paper>

          </Box>

        </Modal>

      </Box>

    </Box>

  )

}
