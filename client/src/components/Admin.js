import React, { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Input, TextField, Toolbar, Typography } from "@mui/material";
import { format } from 'date-fns';
import "../forms.css"
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search'
import FormDialog from './FormDialog';
import axios from 'axios';
import { StyledAppBar, StyledCalendar } from './styledComponents';

/*
export const StyledCalendar = styled(Calendar)(() => ({
      width: '100%',
      '& .react-calendar__month-view__weekdays__weekday': {
        backgroundColor: "#3FD0EE",
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none'
      },
      '& .react-calendar__month-view__weekdays__weekday abbr': {
        textDecoration: 'none'
      },
      '& .react-calendar__tile': {
        cursor: 'pointer',
        height: '70px',
        padding: '10px',
        border: '1px solid #cce7d0',
        borderRadius: '5px',
      },
      '& .react-calendar__tile--active:enabled:focus':{
        backgroundColor:'#3FD0EE'
      }
}));
*/


const hours = ["9:00", "10:00", "11:00","12:00", "13:00", "14:00","15:00", "16:00", "17:00","18:00"];

function Admin() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [termini, setTermini] = useState([]);
  const [dayHours, setDayHours] = useState([]);
  const [dayAppoitments, setDayAppointments] = useState([])
  const [selectedHour, setSelectedHour] = useState(null); 
  const [searchValue, setSearchValue] = useState('');
  const [searchOutput, setSearchOutput] = useState(null);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const navigate = useNavigate();


  axios.defaults.withCredentials = true;
  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    axios.get("http://localhost:3001/admin")
      .then((response) => {
        setTermini(response.data.termini);
        let helper = [];
        let helper2 = [];
        console.log(response.data.termini)
  
        for (let i = 0; i < response.data.termini.length; i++) {
          if (format(selectedDate, 'dd.MM.yyyy') === response.data.termini[i].datum) {
            helper.push(response.data.termini[i].vrijeme);
            helper2.push(response.data.termini[i]);
          }
        }
        setDayHours(helper);
        setDayAppointments(helper2);
        //setSearchOutput(null)
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          console.error('Forbidden (403) error:');
          navigate('/admin/login')
        } else {
          console.error('An error occurred:', error);
          // Handle other errors
          navigate('/admin/login')
        }
      });
  }, []);

  const setSelectedIds = (id, callback) => {
    setSelectedId(id);
    callback(); // Call the callback function to open the dialog
  };
  

  useEffect(() => {
    let helper = [];
    let helper2 = [];
    for(let i=0; i<termini.length; i++){
      if(format(selectedDate, 'dd.MM.yyyy') === termini[i].datum){
        helper.push(termini[i].vrijeme);
        helper2.push(termini[i]);
      }
    }
    setDayHours(helper);
    setDayAppointments(helper2);

  }, [selectedDate]);


  const setSelectedHours = (hour, callback) => {
    setSelectedHour(hour);
    callback(); // Call the callback function to open the dialog
  };
  const [viseInfoOpen, setViseInfoOpen] = React.useState(false);
  const [selectedTermin, setSelectedTermin] = useState({name: '', lastname: '', phone: '', email: '', comments: '',id:''})

  const handleClickViseInfoOpen = () => {
    setViseInfoOpen(true);
  };

  const handleViseInfoClose = () => {
    setViseInfoOpen(false);
    setSelectedTermin(null)
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  function handleOdobri(id){
    const sendData = {
      name: '',
      lastname: '',
      phone: '',
      email: '',
      comments: '',
      date: '',
      hour: '',
      selectedOption: '',
      zakljucen: "Da",
    }
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


  function handleDelete(id) {

    axios.post(`http://localhost:3001/admin/delete/${id}`)
    .then(() => {
      navigate('/admin');
      window.location.reload();
      // If you want to navigate after the request, do it here
    })
    .catch((error) => {
      console.error(error); // Handle any errors
    });
    
  }

  const handleSearch = async () => {
    try {
      // Replace 'http://localhost:3001' with your actual server URL
      await axios.post(`http://localhost:3001/search`, {searchValue:searchValue.trim()})
      .then((response) => {
        console.log(response.data.searchOutput)
        setSearchOutput(response.data.searchOutput);
      });
      // Handle success, e.g., navigate or reload
    } catch (error) {
      console.error(error); // Handle any errors
    }
  };
  const handleLogout = async () => {
    try {
      // Replace 'http://localhost:3001' with your actual server URL
      await axios.post(`http://localhost:3001/admin/logout`, {searchValue:searchValue.trim()})
      .then((response) => {
        navigate('/');
      });
      // Handle success, e.g., navigate or reload
    } catch (error) {
      console.error(error); // Handle any errors
    }
  };
  const handleLogoutDialogClose = () => {
    setIsLogoutDialogOpen(false);
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const reload = () => {
    window.location.reload();
  };


  return (
    <>
      <StyledAppBar position="static" >
        <Toolbar sx = {{display: "flex", justifyContent: "space-between"}}>
          <Link to="/admin" sx = {{textDecoration: 'none'}} onClick={reload} >
            <b>FIZIOTERAPEUT</b>
          </Link>
          <Box>
            <TextField
              size="small"
              placeholder="Pretrazi pacijente"
              variant="outlined"
              sx={{ backgroundColor: 'white' }}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <IconButton onClick={handleSearch} size="small">
              <SearchIcon />
            </IconButton>
            <Button onClick = {() => {setIsLogoutDialogOpen(true)}} >Odjavi se</Button>
          </Box>
        </Toolbar>
      </StyledAppBar>
      <Dialog open={isLogoutDialogOpen} onClose={handleLogoutDialogClose}>
          <DialogTitle id="alert-dialog-title"> Da li ste sigurni da se želite odjaviti?</DialogTitle>
          <DialogContent >
           
          </DialogContent>
          <DialogActions>
            <Button onClick={handleLogoutDialogClose}>Ne</Button>
            <Button onClick={handleLogout}>Da</Button>
            
          </DialogActions>
        </Dialog>
      
      <Dialog open={viseInfoOpen} onClose={handleViseInfoClose}>
          <DialogTitle id="alert-dialog-title"> {"Više informacija o klijentu"}</DialogTitle>
          <DialogContent >
            
            <DialogContentText id="alert-dialog-description">
              {selectedTermin && (
                <>
                <Typography>Broj telefona: {selectedTermin.broj_telefona}</Typography>
                <Typography>Email: {selectedTermin.email}</Typography>
                <Typography>Vrsta prgleda: {selectedTermin.vrsta_pregleda}</Typography>
                <Typography>Komentar: <br/> { selectedTermin.komentar}</Typography>
                </>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleViseInfoClose}>Zatvori</Button>
          </DialogActions>
        </Dialog>
      {searchOutput ? 
      <>
      {searchOutput.map((termin) => {

        return(

        <>
          <Box key={termin.id}  display="flex" alignItems="center" justifyContent='center' > 
            <Box width="50%"  display="flex" alignItems="center" justifyContent='center' p = {1} m ={1} sx ={{backgroundColor: '#EEF8FC', borderRadius:"20px"}}>
              <Typography> {termin.ime}  {termin.prezime} {termin.datum} {termin.vrijeme}</Typography>
              <Box>
                <Button onClick={() => {setSelectedTermin(termin);handleClickViseInfoOpen()}}>Više info</Button>
              </Box>
            </Box>         
          </Box>
        </>
      )})}

      </>

    :    
      <>

      { <Box sx={{backgroundColor: 'white'}} p = {5}>
            <Box >
              <StyledCalendar onClickDay={handleDateClick} value={selectedDate} />
            </Box>
            <Box >
              {selectedDate && (
                <Box display="flex" flexDirection="column" width="100%">
                  <h3>Termini za {format(selectedDate, 'dd.MM.yyyy')}</h3>
                  <FormDialog open={isUpdateDialogOpen} handleClose={() => setIsUpdateDialogOpen(false)} date = {format(selectedDate, 'dd.MM.yyyy')} hour = {selectedHour}  id = {selectedId} admin = {true}/>
                  <FormDialog open={isDialogOpen} handleClose={() => setIsDialogOpen(false)} date = {format(selectedDate, 'dd.MM.yyyy')} hour = {selectedHour}  admin = {true}/>
                {hours.map((hour) => {
                    let zauzet;
                    dayHours.includes(hour) ?  zauzet = true : zauzet = false;
                    let termin;
                    if (zauzet){
                      for(let i=0; i<dayHours.length; i++){ 
                        if(dayAppoitments[i].vrijeme === hour){
                          termin = dayAppoitments[i];
                          break;
                        }
                      }
                      console.log("Termin ",termin);
                    }
                    return(
                      <>
                      
                      {zauzet ?
                      <>
                      

                        <Box 
                          key={hour}
                          width="100%"
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          p = {1}
                          sx={termin.zakljucen ?{} : {backgroundColor: 'yellow'}}
                          >
                            
                              
                              <Typography> {termin.ime}  {termin.prezime}</Typography>

                              <Box>
                              <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
                                <DialogTitle id="alert-dialog-title">
                                  {`Da li ste sigurni da zelite izbrisati termin od `+ selectedTermin.ime + ' '+ selectedTermin.prezime +`?`}
                                </DialogTitle>
                                <DialogContent>
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={handleCloseDeleteDialog}>Zatvori</Button>
                                  <Button onClick={() => {
                                    handleDelete(selectedTermin.id);
                                  }} >Obriši</Button>
                                </DialogActions>
                              </Dialog>
                                <Button onClick={() => {setSelectedTermin(termin);handleClickViseInfoOpen()}}>Više info</Button>
                                <Button
                                  onClick={() => {
                                    setSelectedIds(termin.id, () => {
                                      setSelectedHours(hour, () => {
                                        setIsUpdateDialogOpen(true);
                                      });
                                    });
                                  }}
                                >
                                  Uredi
                                </Button>
                                {!termin.zakljucen && 
                                  <Button
                                    onClick={() => {
                                      handleOdobri(termin.id);
                                    }}
                                  >
                                    Odobri termin
                                  </Button>
                                }
                                <Button
                                  onClick={() => {
                                  setSelectedTermin(termin);
                                  setOpenDeleteDialog(true);
                                  }}
                                >
                                  Obriši termin
                                </Button>
                                

                              </Box>
                        </Box>
                      </>
  :
                          <Button
                          key={hour}
                          width="100%"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          disabled = {new Date() > selectedDate || dayHours.includes(hour)}
                          onClick={() => {
                            setSelectedHours(hour, () => {
                              setIsDialogOpen(true);
                            });
                          }}
                          
                        >
                          {hour}
                        </Button>
                }
                      </>
                      
                    )
                    })}
                </Box>
              )}
            </Box>
        
        </Box>  }
      </>
}
    </>
                  
                
  )
}

export default Admin;
