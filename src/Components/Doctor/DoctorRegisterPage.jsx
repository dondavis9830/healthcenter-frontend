import React, { useState } from 'react'
import { Stack,Typography,TextField,Button,Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { registerUserAPI, searchDoctorEmailAPI } from '../../Services/ApiServices';

export default function DoctorRegisterPage() {
      const navigate = useNavigate();
      const [confirmPassword, setConfirmPassword] = React.useState("");
    
      // state have given temporary data for dont have any issue while running
      const [user, setUser] =React.useState({
        name: "",
        email: "",
        password: "",
        role: "Doctor"
      });

      const handleRegister=async()=>{
            if(user.email==""  || user.name=="" || user.password=="" ){
              alert('plz enter a valid details')
              return
            }
            if(user.password!=confirmPassword){
                alert('password Not Matching')
                return
            }
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(user.email)) {
               alert("Please enter a valid email address");
               return;
            }
            try{
                const res = await searchDoctorEmailAPI(user.email)
                console.log(res.data[0]);
                if(res.data[0]){
                  alert('email matched')

                  try{
                    const resp=await registerUserAPI(user)
                    console.log(resp);
                    
                  }
                  catch(err){
                    console.log(err);
                  }
                  
                }else{
                    alert('mail not existing')
                }
            }
            catch(err){
                console.log(err);
            }
            console.log(user);
            
        
      }

  return (
    <div> 
    <Stack sx={{minHeight: "100vh",justifyContent: "center",alignItems: "center",px: 2}}>
      <Paper sx={{width: "100%",maxWidth: 400,padding: { xs: 2.5, sm: 4}}}>
        <Stack spacing={2}>
          <Typography variant="h4" textAlign="center"> Doctor Registration Page</Typography>
          <TextField label="Name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value }) } fullWidth/>
          <TextField label="Email" type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value }) } fullWidth />
          <TextField label="Password" type="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value }) } fullWidth/>
          <TextField label="Confirm Password" type="password" value={confirmPassword} onChange={(e) =>setConfirmPassword(e.target.value)} fullWidth />
          <Button variant="contained" onClick={handleRegister} fullWidth>Register</Button>
          <Typography textAlign="center"> Already have an account?{" "} <Link to="/login"> Login </Link></Typography>
        </Stack>
      </Paper>
    </Stack>
    </div>
  )
}
