import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate,Link } from 'react-router-dom';
import * as yup from "yup";
import { useFormik } from "formik";
import axios from 'axios';
import { useCookies } from 'react-cookie'

const login_validation_schema = yup.object({
  username : yup.string().required("Username is Required"),
  password : yup.string().required("Password is Required")
}) 



const defaultTheme = createTheme();

function Login() {

  const [ show, setshow ] = useState(false);

const {values,handleChange,handleSubmit,handleBlur,errors,touched} = useFormik({
  initialValues : {
    username : "",
    password : ""
  },
  validationSchema : login_validation_schema,
  onSubmit : (user_data)=>{
    onsub(user_data)
  }
})

const [,setCookie] = useCookies(["access_token"]);

const onsub = async(user_data) =>{

  try {
    setshow(true)
    const data = await axios.post("https://kitchen-recipe-backend-nu.vercel.app/auth/login",user_data);
    if(data.data.message === 'Invalid Password' || data.data.message === 'User Not Found , Please register to Continue'){
      alert(data.data.message);
      setshow(false)
    }else{
      alert("Login Successfull")
      setCookie("access_token",data.data.token);
      window.localStorage.setItem("userID",data.data.id);
      navigate("/")
    }
  } catch (error) {
    setshow(false);
    alert(error.message);
    console.log(error);
  }
}

  const navigate = useNavigate();

  return (
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
            Sign in
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
            { !show ?  
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            :
            <Box sx={{ display : 'flex' , alignItems : 'center' , justifyContent : 'center'}} >
              <CircularProgress/>
            </Box>
            }
            </form>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={()=>navigate("/")}
            >
              Back to Home Page
            </Button>
            <Grid container>
              <Grid item xs={12} >
                <Box sx={{ display : 'flex' , alignItems : 'center' , justifyContent : 'center'}} >
                  <Link to={"/register"}>
                    {"Don't have an account? Sign Up"}
                  </Link>   
                </Box>        
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default Login;