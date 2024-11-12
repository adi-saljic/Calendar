import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Checkbox, DialogContentText, FormControlLabel, Grid, Input, Radio, RadioGroup, TextField, TextareaAutosize, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


import { styled } from '@mui/material/styles';



export default function FormDialog({ open, handleClose, date, hour, id }) {
  const [formData, setFormData] = useState({
    ime: '',
    prezime: '',
    broj_telefona: '',
    email: '',
    komentar: '',
    id: '',
    vrsta_pregleda: 'tretman',
    datum: '',
    vrijeme: '',
  });
  const [updateData, setUpdateData] = useState({
    ime: '',
    prezime: '',
    broj_telefona: '',
    email: '',
    komentar: '',
    id: '',
    vrsta_pregleda: 'tretman',
    datum: '',
    vrijeme: '',
  });
  const navigate = useNavigate();


  const clearData = () => {
    setFormData({
      ime: '',
      prezime: '',
      broj_telefona: '',
      email: '',
      komentar: '',
      id: '',
      vrsta_pregleda: 'tretman',
      datum: '',
      vrijeme: '',
    })
    setUpdateData(
      {ime: '',
      prezime: '',
      broj_telefona: '',
      email: '',
      komentar: '',
      id: '',
      vrsta_pregleda: 'tretman',
      datum: '',
      vrijeme: '',}
    )
  }
  console.log("ID ",id)
  useEffect(() => {
    if(id){
      console.log("ID ",id)
      axios.get(`http://localhost:3001/admin/${id}`).then((response) => {
        console.log("Response ",response.data.termin)
        setFormData({ ...formData, ...response.data.termin });
        console.log(formData)
      });
    }
    
  }, [id]);


  const handleChange = (e) => {
    // Update the formData state when input fields change
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };


  function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission
    const sendData = {
      name: updateData.ime,
      lastname: updateData.prezime,
      phone: updateData.broj_telefona,
      email: updateData.email,
      comments: updateData.komentar,
      date: updateData.datum,
      hour: updateData.vrijememe,
      selectedOption: updateData.vrsta_pregleda
    }
    // Make a POST request to the server
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

  function handleRadioChange(event) {
    setFormData({ ...updateData, selectedOption: event.target.value });
  }
      const [open2, setOpen2] = React.useState(false);

      const handleClickOpen = () => {
        setOpen2(true);
      };

      const handleClose2 = () => {
        setOpen2(false);
      };



  console.log(hour)
    return (
      <Box>
        <Dialog open={open} onClose={() => {handleClose(); clearData()}}>
          <DialogTitle>Rezervisite vas termin</DialogTitle>
          <DialogContent>
          <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography>Ime</Typography>
                    <Input
                      name="name"
                      placeholder={formData.ime}
                      value={updateData.ime}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography>Prezime</Typography>
                    <Input
                      name="lastname"
                      placeholder={formData.prezime}
                      value={updateData.prezime}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <Typography>Broj telefona</Typography>
                    <Input
                      name="phone"
                      placeholder={formData.broj_telefona}
                      value={updateData.broj_telefona}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <Typography>Email</Typography>
                    <Input
                      name="email"
                      placeholder={formData.email}
                      value={updateData.email}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                  <Typography>Komentar</Typography>
                    <TextField
                      name="comments"
                      placeholder={formData.komentar}
                      value={updateData.komentar}
                      onChange={handleChange}
                      fullWidth
                      sx={{height:'40px'}}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={formData.vrsta_pregleda}
                    name="selectedOption"
                    value={updateData.vrsta_pregleda} // Ensure the selected value is reflected in the radio buttons
                    onChange={handleRadioChange}
                  >
                    <FormControlLabel value="tretman" control={<Radio />} label="Tretman" />
                    <FormControlLabel value="pregled" control={<Radio />} label="Pregled" />
                  </RadioGroup>

                  </Grid>
                </Grid>
              </DialogContent>
          
          <DialogActions>
          
            <Button onClick={() => {handleClose(); clearData()}}>Cancel</Button>
            <Button onClick={handleClickOpen} disabled = {formData.name === '' && formData.lastname === '' && formData.phone === '' && formData.email === '' } >
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
          {"Da li ste sigurni da želite ovaj termin?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
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
