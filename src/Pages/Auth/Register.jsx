
import React, { useState } from "react";
import { Stack,Typography,TextField,Button,Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { checkUseridAndEmailAPI, getAlldetailsAboutDoctorsAPI, registerUserAPI } from "../../Services/ApiServices";

export default function Register() {
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");

  // state have given temporary data for dont have any issue while running
  const [user, setUser] = useState({
    name: "",
    userID: "",
    email: "",
    password: "",
    role: "user"
  });

  // FUNCTION FOR REGISTRATION
  const handleRegister = async () => {

    // Check empty fields
    if (!user.userID ||!user.name || !user.email || !user.password || !confirmPassword) {
      alert("Please fill the fields");
    }


    // Check password
    if (user.password !== confirmPassword) {
      alert("Passwords do not match");
    }

    // Check email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(user.email)) {
      alert("Please enter a valid email address");
    }

    else{
      try {
        const resp=await checkUseridAndEmailAPI(user.email)
        console.log(resp.data);

        if(resp.data.length>0){
          alert('Try Another UesrID or Email....')
        }
        else{
          const res = await registerUserAPI(user);
          console.log(res);
          // status checking and alert giving
            if(res.status===201){
              alert("Registration successful");
              navigate("/login");
            }
          }
      } 
      catch (err) {
        console.log(err);
        alert("Registration failed");
      }
    }
  };


  return (
    <div>
      <Stack
      sx={{
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        px: 2
      }}
    >

      <Paper
        sx={{
          width: "100%",
          maxWidth: 400,
          padding: {
            xs: 2.5,
            sm: 4
          }
        }}
      >

        <Stack spacing={2}>

          <Typography
            variant="h4"
            textAlign="center"
          >
            User Registration Page
          </Typography>


          <TextField
            label="Name"
            value={user.name}
            onChange={(e) =>
              setUser({
                ...user,
                name: e.target.value
              })
            }
            fullWidth
          />
          <TextField
            label="UserID"
            value={user.userID}
            onChange={(e) =>
              setUser({
                ...user,
                userID: e.target.value
              })
            }
            fullWidth
          />


          <TextField
            label="Email"
            type="email"
            value={user.email}
            onChange={(e) =>
              setUser({
                ...user,
                email: e.target.value
              })
            }
            fullWidth
          />


          <TextField
            label="Password"
            type="password"
            value={user.password}
            onChange={(e) =>
              setUser({
                ...user,
                password: e.target.value
              })
            }
            fullWidth
          />


          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            fullWidth
          />


          <Button
            variant="contained"
            onClick={handleRegister}
            fullWidth
          >
            Register
          </Button>


          <Typography textAlign="center">Already have an account?{" "}<Link to="/login">Login</Link></Typography>
          <Typography textAlign="center">Are you a doctor?{" "}<Link to="/doctorRegister">Doctor register</Link></Typography>

        </Stack>

      </Paper>

    </Stack>
    </div>
  );
}

