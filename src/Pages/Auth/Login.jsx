import { useState } from 'react'
import { Paper, Stack, TextField, Typography, Button} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { searchUserAPI } from '../../Services/ApiServices'




export default function Login() {
  
  const navigate=useNavigate()
  const [userID,setUserID]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')


  const handleLogin=async()=>{

    if(email==""|| password==""||userID=="" ){
      alert('plz enter a valid details')
      return
      }

    try{
      const res = await searchUserAPI(
        encodeURIComponent(email),
        encodeURIComponent(password),
        encodeURIComponent(userID)
      )
      if (!Array.isArray(res.data) || res.data.length === 0) {
        alert("Invalid Email, Password or User ID")
        return
      }

      const user = res.data[0]
      sessionStorage.setItem(`currentuser`,JSON.stringify(user))
      alert(`${user.name} login successfully compeated`)

          switch (user.role) { 
            case "user": navigate('/user') 
              break 
            case "admin": navigate('/admin') 
              break 
            case 'Doctor' : navigate('/doctor')
              break
            default: alert("Invalid role") }
    }
    catch{
      alert('Unable to contact the login service. Please try again in a moment.')
    }

  }


  return (
    <div>
    <Stack sx={{minHeight: "100vh",justifyContent: "center",alignItems: "center",px: 2}}>
      <Paper sx={{width: "100%",maxWidth: 400,padding: {xs: 2.5,sm: 4}}}>
        <Stack spacing={2}>
          <Typography variant="h4" sx={{textAlign:"center"}}>Login</Typography>
          <TextField label="userID" type="userID" value={userID}onChange={(e) =>setUserID(e.target.value)} fullWidth/>
          <TextField label="Email" type="email" value={email}onChange={(e) =>setEmail(e.target.value)} fullWidth/>
          <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth />
          <Button variant="contained" onClick={handleLogin} fullWidth >Login</Button>
          <Typography sx={{textAlign:"center"}}>You Dont have an account?{" "}<Link to='/register' >Register</Link></Typography>
        </Stack>
      </Paper>
    </Stack>      
    </div>
  )
}
