import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Paragraph } from './styledComponents';

const Footer = () => {
  const handleIconClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <Box
      sx={{
        backgroundColor: '#EEF8FC',
        color: '#0F8FA9',
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: "80px",
        marginTop: "20px",
      }}
    >
      {/* Left side content */}
      <Box padding="10px">
        <Typography >FIZIOTERAPEUT</Typography>
        <Paragraph>Alen Raonić</Paragraph>
        <Paragraph>Trg Grada Prato 10, Sarajevo 71000</Paragraph>
        <Paragraph>+387 61 526 136</Paragraph>
      </Box>

      {/* Right side icons */}
      <Box mr = {2}>
        <IconButton onClick={() => handleIconClick('mailto:alen.raonic@gmail.com')}>
          <EmailIcon />
        </IconButton>
        <IconButton onClick={() => handleIconClick('https://www.facebook.com/profile.php?id=100084451981018')}>
          <FacebookIcon />
        </IconButton>
        <IconButton onClick={() => handleIconClick('https://www.instagram.com/raonicalen/?utm_source=ig_web_button_share_sheet&igshid=OGQ5ZDc2ODk2ZA==')}>
          <InstagramIcon />
        </IconButton>
        <IconButton onClick={() => handleIconClick('https://g.co/kgs/oUDmbq')}>
          <LocationOnIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

 export default Footer;
