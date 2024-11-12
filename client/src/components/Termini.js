import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Box, Button, Typography } from "@mui/material";
import { format } from 'date-fns';


import { styled } from '@mui/material/styles';
import FormDialog from './FormDialog';
import axios from 'axios';
import Header from './Header';
import { Paragraph, StyledAllContentBox, StyledCalendar } from './styledComponents';
import Footer from './Footer';



const hours = ["9:00", "10:00", "11:00","12:00", "13:00", "14:00","15:00", "16:00", "17:00","18:00"];

function Termini() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() +1);
  const [selectedDate, setSelectedDate] = useState(tomorrow);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState(null);
  const [termini, setTermini] = useState([]);
  const [dayHours, setDayHours] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 799);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    axios.get("http://localhost:3001").then((response) => {
     setTermini(response.data.termini)
     let helper = [];
    for(let i=0; i<response.data.termini.length; i++){
      if(format(selectedDate, 'dd.MM.yyyy') === response.data.termini[i].datum){
        helper.push(response.data.termini[i].vrijeme);
      }
    }
    setDayHours(helper);
    });
  }, []);

  const setSelectedHours = (hour, callback) => {
    setSelectedHour(hour);
    callback(); // Call the callback function to open the dialog
  };

  useEffect(() => {
    // Add an event listener to update isMobile when the window is resized
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 799);
    };
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  


  useEffect(() => {
    let helper = [];
    for(let i=0; i<termini.length; i++){
      if(format(selectedDate, 'dd.MM.yyyy') === termini[i].datum){
        helper.push(termini[i].vrijeme);
      }
    }
    setDayHours(helper);
  }, [selectedDate]);

  return (
    <>
     <Header />
     <Box padding="20px 20px 0 20px">
      <Typography variant='h5'>Uputstvo</Typography>
      <Paragraph>Klikom na strelice mijenjate mjesece. Zatim klikom na dan dobijate pregled slobodnih i zauzetih termina. Možete rezervisati termine koji
          nisu iznačeni crvenom bojom.
      </Paragraph>
     </Box>

     <StyledAllContentBox display='flex'>
      
      {isMobile ?
      <>
        <Box >
          <StyledCalendar onClickDay={handleDateClick} value={selectedDate} />
        </Box>
        <Box padding='10px'>
        
          {selectedDate && (
            <Box display="flex" flexDirection="column" width="100%" >
              {new Date() >= selectedDate ? <h3>Termini za {format(selectedDate, 'dd.MM.yyyy')}</h3> : <h3>Rezervisite termini za {format(selectedDate, 'dd.MM.yyyy')}</h3>}
              
              <FormDialog open={isDialogOpen} handleClose={() => setIsDialogOpen(false)} date = {format(selectedDate, 'dd.MM.yyyy')}  hour = {selectedHour}/>
            {hours.map((hour) => {
                return(
                  <>
                    <Button
                      key={hour}
                      width="100%"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      disabled = {new Date() >= selectedDate || dayHours.includes(hour)}
                      onClick={() => {
                        setSelectedHours(hour, () => {
                          setIsDialogOpen(true);
                        });
                      }}
                      sx ={ dayHours.includes(hour) ? {backgroundColor:"red"} : {}}
                    >
                      {hour}
                    </Button>
                    
                  </>
                  
                )
                })}
            </Box>
          )}
        </Box>
      </>
      :
      <>
        <Box width='30%' padding='10px'>
        
        {selectedDate && (
          <Box display="flex" flexDirection="column" width="100%" >
            {new Date() >= selectedDate ? <h3>Termini za {format(selectedDate, 'dd.MM.yyyy')}</h3> : <h3>Rezervisite termini za {format(selectedDate, 'dd.MM.yyyy')}</h3>}
            
            <FormDialog open={isDialogOpen} handleClose={() => setIsDialogOpen(false)} date = {format(selectedDate, 'dd.MM.yyyy')}  hour = {selectedHour}/>
          {hours.map((hour) => {
              return(
                <>
                <Box width='100%' display='flex' alignItems='center' justifyContent='center' mt = {0.5}  sx ={ dayHours.includes(hour) ? {backgroundColor:"#FF4747", borderRadius:'5px'} : {}}>
                  <Button
                    key={hour}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    disabled = {new Date() >= selectedDate || dayHours.includes(hour)}
                    onClick={() => {
                      setSelectedHours(hour, () => {
                        setIsDialogOpen(true);
                      });
                    }}
                    
                  >
                    {hour}
                  </Button>
                </Box>

                  
                </>
                
              )
              })}
          </Box>
        )}
        </Box>
        <Box width='70%' height="100%">
          <StyledCalendar onClickDay={handleDateClick} value={selectedDate} />
        </Box>
      </>  
      }
    </StyledAllContentBox>
    <Footer/>
    </>

  )
}

export default Termini;
