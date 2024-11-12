import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Checkbox, DialogContentText, FormControlLabel, Grid, Input, Radio, RadioGroup, TextField, TextareaAutosize, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


import { styled } from '@mui/material/styles';



export default function FormDialog({ open, handleClose, date, hour, id, admin }) {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    phone: '',
    email: '',
    comments: '',
    selectedOption: id ? '' : 'tretman',
  });
  const navigate = useNavigate();


  const clearData = () => {
    setFormData({
      name: '',
      lastname: '',
      phone: '',
      email: '',
      comments: '',
      selectedOption: '',
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
      date: date,
      hour: hour,
      selectedOption: formData.selectedOption,
      zakljucen: null,
    }
    if(admin) sendData.zakljucen = "Da";
    if(id){
      axios.post(`http://localhost:3001/update/${id}`, sendData)
      .then(() => {
        navigate('/admin');
        window.location.reload();
        // If you want to navigate after the request, do it here
      })
      .catch((error) => {
        console.error(error); // Handle any errors
      });
    }
    else{
      // Make a POST request to the server
      axios.post('http://localhost:3001/spasi', sendData)
      .then(() => {
        admin ? navigate('/admin') : navigate('/');
        
        window.location.reload();
        // If you want to navigate after the request, do it here
      })
      .catch((error) => {
        console.error(error); // Handle any errors
    });
    }
    
  }

  function handleRadioChange(event) {
    setFormData({ ...formData, selectedOption: event.target.value });
  }
      const [open2, setOpen2] = React.useState(false);

      const handleClickOpen = () => {
        setOpen2(true);
      };

      const handleClose2 = () => {
        setOpen2(false);
      };



  console.log(formData)
    return (
      <Box>
        <Dialog open={open} onClose={() => {handleClose(); clearData()}}>
          <DialogTitle>{id ? "Izmijenite podatke o terminu odabrane osobe" : "Rezervišite vaš termin"}</DialogTitle>
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
                  <Typography>Ukratko opišite razlog dolaska</Typography>
                    <TextField
                      name="comments"
                      value={formData.comments}
                      onChange={handleChange}
                      placeholder='Komentar'
                      fullWidth
                      multiline
                      rows = {3}
                      autoComplete="off"
                    />
                  </Grid>
                 { /*
                  <Grid item xs={12}>
                    <Typography>Označite tačan razlog vašeg dolaska* </Typography>
                    
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue= {id ? '':"tretman"}
                    name="selectedOption"
                    value={formData.selectedOption} // Ensure the selected value is reflected in the radio buttons
                    onChange={handleRadioChange}
                  >
                    <FormControlLabel value="tretman" control={<Radio />} label="Tretman" />
                    <FormControlLabel value="pregled" control={<Radio />} label="Pregled" />
                  </RadioGroup>

                  </Grid>*/}
                  <Grid idem xs = {12} sm ={6} marginTop="20px" marginLeft='18px'>
                      <Typography sx ={{fontSize: "10px"}}>Polja označena sa * su obavezna i ako ostanu prazna nećete moći završiti rezervaciju !</Typography>
                      <Typography sx ={{fontSize: "10px"}}>U polje za komentar napišite sve što mislite da je bitno fizioterapeutu da zna prije pregleda.</Typography>

                  </Grid>
                </Grid>
              </DialogContent>
          
          <DialogActions>
          
            <Button onClick={() => {handleClose(); clearData()}}>Cancel</Button>
            <Button 
              onClick={handleClickOpen} 
              disabled = {id ? !(formData.name !== '' || formData.lastname !== '' || formData.phone !== '' || formData.email !== '' || formData.selectedOption !== '' || formData.comments !== '') 
                                :!(formData.name !== '' && formData.lastname !== '' && formData.phone !== '' ) } >
                Potvrdi 
            </Button> 
            
          </DialogActions>
        </Dialog>
        <Dialog
        open={open2}
        onClose={handleClose2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {id ? "Da li ste sigurni da želite izmijeniti ovaj termin?" :"Vaš termin će biti potvrđen na broj telefona koji ste unijeli!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {id && "Da li ste sigurni da želite ovaj termin?"}
            Vaš {formData.selectedOption} je {date} u {hour} sati
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2}>Ne</Button>
          <Button onClick={handleSubmit} autoFocus>
            Da, siguran sam
          </Button>
        </DialogActions>
      </Dialog>
      </Box>
    );
  }
