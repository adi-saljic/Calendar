import { Box, Input, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import "../forms.css";
import { useNavigate, useLocation, Link } from 'react-router-dom';

import axios from 'axios';

axios.defaults.withCredentials = true;

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async () => {
    axios.post('http://localhost:3001/admin/logged', formData)
    .then(() => {
      navigate('/admin') ;
    })
    .catch((error) => {
      if (error.response && error.response.status === 403) {
        console.error('Unauthorized (403) error:', error);
        navigate('/admin/login')
      } else {
        console.error('An error occurred:', error);
        // Handle other errors
      }
    });
       


  }




  const handleChange = (e) => {
    // Update the formData state when input fields change
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
 
  return (

        <Box display='flex' justifyContent='center' alignContent='center' paddingTop='5%'>
          <Box className="container">
          <h2 className="naslov">Prijava</h2>
            <Box className="kupac-info">
                    <Typography>Email</Typography>
                    <Input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
              <Typography>Lozinka</Typography>
                    <Input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
            </Box>
            <Box className="button">
              <input onClick={handleSubmit} type='submit' value='Prijavi se' />
            </Box>
            <Box className="button">
              <a href="/" className="txt-button">Nazad na početnu</a>
            </Box>
        </Box>
        </Box>
     
    
  )
}

export default Login;
