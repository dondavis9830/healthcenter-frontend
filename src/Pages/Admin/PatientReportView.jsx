import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPatientThroughIdAPI } from '../../Services/ApiServices'
import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'

export default function PatientReportView() {

  const [patientDetails,setPatientDetails] = useState({})
  const { id } = useParams()

  const getPatientReport = async () => {
    try {
      const res = await getPatientThroughIdAPI(id)
      console.log(res.data)
      setPatientDetails(res.data)
    } catch(err) {
      console.log('Error while fetching',err)
    }
  }

  useEffect(() => {
    getPatientReport()
  },[id])

  return (
    <Box>

      <Stack
        direction="row"
        sx={{justifyContent:'space-between',alignItems:'center',m:5}}
      >
        <Typography variant="h5" fontWeight={600}>
          Patient Report
        </Typography>

        <Button variant="contained">
          Download
        </Button>
      </Stack>

      <Stack direction="row" sx={{justifyContent:'center'}}>

        <Paper
          sx={{
            width:600,
            mx:5,
            my:1,
            p:3,
            boxShadow:5,
            minHeight:600,
            display:'flex',
            flexDirection:'column'

          }}
        >

          {/* HEADER */}

          <Box
            sx={{
              borderBottom:'2px solid',
            }}
          >

            <Stack
              sx={{
                alignItems:'center',
                textAlign:'center'
              }}
            >

              <Typography variant="h5" sx={{fontWeight:700,fontFamily:'-moz-initial'}}>
                Dr. Don's Family Health Center
              </Typography>

              <Typography>
                KUTTUR, THRISSUR - 680013
              </Typography>

              <Typography>
                PH: 9544598386
              </Typography>

              <Typography
                variant="p"
                sx={{mt:1,fontWeight:500}}
              >
                PRESCRIPTION SLIP
              </Typography>

            </Stack>

          </Box>


          {/* PATIENT DETAILS */}

          <Box
            sx={{
              px:2,
              borderBottom:'2px solid'
            }}
          >

            <Stack
              direction="row"
              sx={{
                justifyContent:'space-between',
              }}
            >

              {/* LEFT SIDE */}

              <Stack spacing={1}>

                <Typography>
                  <b>PHID:</b> {patientDetails.PHID}
                </Typography>

                <Typography>
                  <b>Patient Name:</b> {patientDetails.name}
                </Typography>

                <Typography>
                  <b>Age:</b> {patientDetails.age}
                </Typography>

                <Typography>
                  <b>Gender:</b> {patientDetails.gender}
                </Typography>

              </Stack>


              {/* RIGHT SIDE */}

              <Stack spacing={1}>

                <Typography>
                  <b>Doctor:</b> {patientDetails.doctor}
                </Typography>

                <Typography>
                  <b>Department:</b> {patientDetails.department}
                </Typography>

                <Typography>
                  <b>Blood Group:</b> {patientDetails.bloodGroup}
                </Typography>

                <Typography>
                  <b>Disease:</b> {patientDetails.report?.disease}
                </Typography>

              </Stack>

            </Stack>

          </Box>


          {/* PRESCRIPTION */}

          <Box sx={{borderBottom:'2px solid'}}>

            <Typography
              variant="h6"
              
              sx={{fontWeight:700,fontFamily:'-moz-initial',mt:1}}
            >
              Medicine Prescribed
            </Typography>

            <Table>

              <TableHead>

                <TableRow>

                  <TableCell><b>Drug</b></TableCell>
                  <TableCell><b>Strength</b></TableCell>
                  <TableCell><b>Dosage</b></TableCell>
                  <TableCell><b>Frequency</b></TableCell>
                  <TableCell><b>Route</b></TableCell>
                  <TableCell><b>Duration</b></TableCell>

                </TableRow>

              </TableHead>


              <TableBody>

                {
                  patientDetails.report?.prescription?.length > 0

                  ?

                  patientDetails.report.prescription.map((item,index) => (

                    <TableRow key={index}>

                      <TableCell>
                        {item.drug}
                      </TableCell>

                      <TableCell>
                        {item.strength}
                      </TableCell>

                      <TableCell>
                        {item.dosage}
                      </TableCell>

                      <TableCell>
                        {item.frequency}
                      </TableCell>

                      <TableCell>
                        {item.route}
                      </TableCell>

                      <TableCell>
                        {item.duration}
                      </TableCell>

                    </TableRow>

                  ))

                  :

                  <TableRow>

                    <TableCell
                      colSpan={6}
                      sx={{alignItems:'center'}}
                    >
                      No prescription found
                    </TableCell>

                  </TableRow>
                }

              </TableBody>

            </Table>

          </Box>
          <Box sx={{px:3,mt:1,marginTop:'auto'}}>
            <Typography variant='caption'>Disclaimer: This is an electronically generated document and doesn,t require a physical signature.</Typography>
            <Typography variant='caption' >If you develop any symptoms / side effects,please contact your nearest health facility</Typography>
            <Stack direction={'row'} >
              <Typography variant='caption' >printed on : </Typography>
            </Stack>

          </Box>

        </Paper>

      </Stack>

    </Box>
  )
}