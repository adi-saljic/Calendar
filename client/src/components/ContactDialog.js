import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Input,  TextField, Typography } from '@mui/material';
import axios from 'axios';

export default function ContactDialog({open, handleClose}) {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    phone: '',
    email: '',
    comments: '',
  });
  const clearData = () => {
    setFormData({
      name: '',
      lastname: '',
      phone: '',
      email: '',
      comments: '',
    })
  }


  const handleChange = (e) => {
    // Update the formData state when input fields change
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission
    const sendData = {
      name: formData.name,
      lastname: formData.lastname,
      phone: formData.phone,
      email: formData.email,
      comments: formData.comments,
    }
      axios.post(`http://localhost:3001/message`, sendData)
      .then(() => {
        clearData();
        window.location.reload();
        // If you want to navigate after the request, do it here
      })
      .catch((error) => {
        console.error(error); // Handle any errors
      });
    }
    return (
      <Box>
        <Dialog open={open} onClose={() => {handleClose(); clearData()}}>
              <DialogTitle>{"Pošaljite poruku, upit, primjedbu ili pohvalu"}</DialogTitle>
              <DialogContent>
                <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography>Ime*</Typography>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography>Prezime*</Typography>
                    <Input
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <Typography>Broj telefona*</Typography>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <Typography>Email</Typography>
                    <Input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                  <Typography>Poruka*</Typography>
                    <TextField
                      name="comments"
                      value={formData.comments}
                      onChange={handleChange}
                      fullWidth
                      multiline
                      rows={5}
                      variant='outlined'
                    />
                  </Grid>
                </Grid>
              </DialogContent>
                <DialogActions>
                  <Button onClick={() => {handleClose(); clearData()}}>Cancel</Button>
                  <Button 
                    onClick={handleSubmit}
                    disabled = {!(formData.name !== '' && formData.lastname !== '' && formData.phone !== ''  && formData.comments !== '')} >
                      Potvrdi 
                  </Button> 
                </DialogActions>
        </Dialog>
      </Box>
    );
  }
