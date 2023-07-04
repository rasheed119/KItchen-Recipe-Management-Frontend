import React,{ useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import axios from 'axios';
import { Container, CssBaseline, Typography } from '@mui/material';
import Box from '@mui/material/Box';

function Homepage() {

  const [ recipe,setrecipe ] = useState([]);

  useEffect(()=>{
    const getdata = async () => {
      try {
        const response  = await axios.get("https://kitchen-recipe-backend-nu.vercel.app/recipes");
        setrecipe(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getdata();
  },[]);

  console.log(recipe)


  return (
    <>
    <Navbar/>
    <Container>
      <Box sx={{
        borderRadius : 5,
        m: 10,
        padding:5,
        display: 'flex',
        flexDirection: 'row'
      }} >
        <CssBaseline/>
        <Box sx={{mt:2,mb:2}} >
          <Typography variant='h5' component='h1' >
            Recipes
          </Typography>
        </Box>

      </Box>
    </Container>
    </>
  )
}

export default Homepage