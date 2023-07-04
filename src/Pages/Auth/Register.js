import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate} from 'react-router-dom';
import * as yup from "yup";
import { useFormik } from "formik";
import axios from 'axios';

const Sign_in_validation_schema = yup.object({
  username : yup.string().required("Username is Required").min(10,"Username should have atleast 10 characters").max(20,"Username should not exceed above 20 Character"),
  password : yup.string().required("Password is Required").min(8,"Password should contain atleat 8 Characters").max(20,"Password should not exceed above 20 Characters"),
  re_enter_password : yup.string().oneOf([yup.ref("password"),null],"Password must match").required("Reset password is required")
})


const defaultTheme = createTheme();

function Register() {

  const [ show, setshow ] = useState(false);

  const {values,handleChange,handleSubmit,handleBlur,errors,touched} = useFormik({
    initialValues : {
      username : "",
      password : "",
      re_enter_password : ""
    },
    validationSchema : Sign_in_validation_schema ,
    onSubmit : (user_data)=>{
      onsub(user_data)
    }
  })
  
  
  const onsub = async(user_data) =>{
    try {
      setshow(true);
      const data = await axios.post("https://kitchen-recipe-backend-nu.vercel.app/auth/register",user_data);
      alert(data.data.message);
      if(data.data.message === "User already exsists"){
        setshow(false)
      }else{
        navigate("/auth");
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  const navigate = useNavigate();
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box  sx={{ mt: 1 }}>
            <form onSubmit={handleSubmit} >

            { touched.username && errors.username ?
              <TextField
              error
              margin="normal"
              id="outlined-error"
              fullWidth
              label="Username"
              name="username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              helperText={errors.username}
            />
              :
              <TextField
              margin="normal"
              fullWidth
              label="Username"
              name="username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
            />
            }
            { touched.password && errors.password ? 
            <TextField
             error
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              onChange={handleChange}
              value={values.password}
              onBlur={handleBlur}
              type="password"
              id="outlined-error"
              helperText={errors.password}
            />
            : 
            <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            onChange={handleChange}
            value={values.password}
            onBlur={handleBlur}
            type="password"
            id="password"
          />
            }
            { touched.re_enter_password && errors.re_enter_password ?
            <TextField
            error
            margin="normal"
            fullWidth
            name="re_enter_password"
            label="Re-enter Password"
            onChange={handleChange}
            value={values.re_enter_password}
            onBlur={handleBlur}
            type="password"
            id="outlined-error"
            helperText={errors.re_enter_password}
            />
          :
            <TextField
            margin="normal"
            fullWidth
            name="re_enter_password"
            label="Re-enter Password"
            onChange={handleChange}
            value={values.re_enter_password}
            onBlur={handleBlur}
            type="password"
            id="Re-enter password"
          />
            }
            { !show ?  
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign UP
            </Button>
            :
            <Box sx={{ display : 'flex',alignItems : 'center',justifyContent : 'center',mt : 2, mb: 2 }} >
              <CircularProgress/>
            </Box>
           }
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={()=>navigate("/auth")}
            >
              Back to login Page
            </Button>
            </form>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </>
  )
}

export default Register