
import React,{useEffect,useState} from 'react'
import {getAllPatientsDetailsAPI} from '../../Services/ApiServices'
import {
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'

export default function AllPatientsList() {

  const [patients,setPatients] = useState([])

  const getDoctorsPatients = async () => {
    try {
      const currentUser = JSON.parse(
        sessionStorage.getItem('currentuser')
      )

      const res = await getAllPatientsDetailsAPI()

      const ownPatients = res.data.filter(item =>
        item.doctor?.toLowerCase().includes(
          currentUser.name.toLowerCase()
        )
      )

      setPatients(ownPatients)
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getDoctorsPatients()
  },[])

  return (
    <Box>

      <Stack
        sx={{
          minHeight:100,
          justifyContent:'center',
          px:3,
          backgroundColor:'lightskyblue',
          m:1
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight:700,
            fontFamily:'Lora, serif'
          }}
        >
          My Patients
        </Typography>
      </Stack>

      <TableContainer
        component={Paper}
        sx={{mx:1,boxShadow:3}}
      >
        <Table>

          <TableHead>
            <TableRow>
              <TableCell><b>PHID</b></TableCell>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Age</b></TableCell>
              <TableCell><b>Gender</b></TableCell>
              <TableCell><b>Doctor</b></TableCell>
              <TableCell><b>Department</b></TableCell>
              <TableCell><b>Blood Group</b></TableCell>
              <TableCell><b>Status</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {patients.length > 0 ? (
              patients.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.PHID}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.age}</TableCell>
                  <TableCell>{item.gender}</TableCell>
                  <TableCell>{item.doctor}</TableCell>
                  <TableCell>{item.department}</TableCell>
                  <TableCell>{item.bloodGroup}</TableCell>
                  <TableCell>{item.status}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No patients found
                </TableCell>
              </TableRow>
            )}
          </TableBody>

        </Table>
      </TableContainer>

    </Box>
  )
}
