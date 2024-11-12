
import { Box, Typography } from '@mui/material';
import Header from './Header';
import Alen from '../images/alen.jpg';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useCallback, useState } from 'react';
import Footer from './Footer';

const center = {
  lat: -3.745,
  lng: -38.523
};
const containerStyle = {
  width: '400px',
  height: '400px'
};

function Home() {

  const imageStyle = {
    width: '40%', // Set the maximum width to 100% of its container
    height: '100%',    // Allow the height to adjust proportionally
    borderRadius: '8px', // Example: Add border-radius
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Example: Add a subtle box shadow
    margin : "50px 50px 10px "
  };
  const imageStyleMob = {

    borderRadius: '8px', // Example: Add border-radius
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Example: Add a subtle box shadow
    margin : "10px 20px 10px 20px"
  };
  const isMobile = window.innerWidth <= 600
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyC-wn_VtI6Untg3sMU1iGsARcEUI7I6r5g"
  })
  const [map, setMap] = useState(null)

  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  return (

          <Box>
      <Header />
      {isMobile ? 
        <>
          <Box display='flex' flexDirection='column'>
            <Box  margin = "20px 10px 5px 10px">
              <Typography variant='h5' >Dobrodošli! </Typography>
              <Typography variant='h6' sx={{marginTop: "5px"}}> Kroz istrajni pristup i stručnost, vodim vas ka postizanju realnih ciljeva. Vaša udobnost i brz povratak  su moj prioritet.</Typography>
              <Typography variant='h6' sx={{marginTop: "5px"}}>Kroz individualan pristup fizioterapiji, radimo zajedno kako bismo prevazišli bol, povrede i poboljšali vašu pokretljivost. Moja misija je pružiti podršku tokom cijelog procesa oporavka.</Typography>
              <Typography variant='h6' sx={{marginTop: "5px"}}> Doživite personalizovan pristup fizioterapiji uz Alena Raonića. </Typography>
            </Box>
            <img src={Alen} style={imageStyleMob} />
          </Box>
        </> 
      :
        <>
          <Box display='flex' justifyContent="space-between">
            <Box width="50%" margin = "50px">
              <Typography variant='h5' >Dobrodošli! </Typography>
              <Typography variant='h6' sx={{marginTop: "20px"}}> Kroz istrajni pristup i stručnost, vodim vas ka postizanju realnih ciljeva. Vaša udobnost i brz povratak  su moj prioritet.</Typography>
              <Typography variant='h6' sx={{marginTop: "20px"}}>Kroz individualan pristup fizioterapiji, radimo zajedno kako bismo prevazišli bol, povrede i poboljšali vašu pokretljivost. Moja misija je pružiti podršku tokom cijelog procesa oporavka.</Typography>
              <Typography variant='h6' sx={{marginTop: "20px"}}> Doživite personalizovan pristup fizioterapiji uz Alena Raonića. </Typography>
            </Box>
            <img src={Alen} style={imageStyle} />
          </Box>

        </>
      }
      <Box ml = {2}  width='80%'>
        <Typography variant='h5'>Cjenovnik</Typography>
        <Box p = {1}>
          <Typography variant='h6' >Usluge</Typography>
          <Box display='flex' justifyContent='space-between' sx = {{borderBottom: '1px dotted gray'}}>
              <Typography>Konsultacija i testiranje</Typography>
              <Typography>30,00 KM</Typography>
          </Box>
        </Box>
        <Box p = {1}>
          <Typography variant='h6' >Tretmani</Typography>
            <Box display='flex' justifyContent='space-between' sx = {{borderBottom: '1px dotted gray'}}>
                <Typography>Manuelni tretman 30 min.</Typography>
                <Typography>40,00 KM</Typography>
            </Box>
            <Box display='flex' justifyContent='space-between' sx = {{borderBottom: '1px dotted gray'}}>
                <Typography>Manuelni tretman 60 min.</Typography>
                <Typography>60,00 KM</Typography>
            </Box>
            <Box display='flex' justifyContent='space-between' sx = {{borderBottom: '1px dotted gray'}}>
                <Typography>Manuelna drenaža 60 min.</Typography>
                <Typography>60,00 KM</Typography>
            </Box>
            <Box display='flex' justifyContent='space-between' sx = {{borderBottom: '1px dotted gray'}}>
                <Typography>Aparaturna drenaža 30 min.</Typography>
                <Typography>30,00 KM</Typography>
            </Box>
          </Box>
        <Box p = {1}>
          <Typography variant='h6' >Mjesečni tretmani</Typography>
            <Box display='flex' justifyContent='space-between' sx = {{borderBottom: '1px dotted gray'}}>
                <Typography>Mjesečni tretman I</Typography>
                <Typography>450,00 KM</Typography>
            </Box>
            <Box display='flex' justifyContent='space-between' sx = {{borderBottom: '1px dotted gray'}}>
                <Typography>Mjesečni tretman II</Typography>
                <Typography>350,00 KM</Typography>
            </Box>
            <Box display='flex' justifyContent='space-between' sx = {{borderBottom: '1px dotted gray'}}>
                <Typography>Mjesečni tretman III</Typography>
                <Typography>150,00 KM</Typography>
            </Box>

        </Box>
      </Box>
      <Footer />

    </Box>

    

    
  );
}

export default Home;