import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Box, List, ListItem, Button, Drawer } from '@mui/material';
import { Link } from 'react-router-dom';
import { StyledAppBar, StyledDrawer } from './styledComponents';
import ContactDialog from './ContactDialog';

import MenuIcon from '@mui/icons-material/Menu';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';

function Header() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const isMobile = window.innerWidth <= 600;

  return (
    <>
      <ContactDialog open={isDialogOpen} handleClose={() => setIsDialogOpen(false)} />
      <StyledAppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link to="/" sx={{ textDecoration: 'none' }}>
            <b>FIZIOTERAPEUT</b>
          </Link>
          {isMobile ? (
            <>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                onClick={handleDrawerOpen}
                sx={{ display: 'block' }}
              >
                <MenuIcon sx ={{color: "#0F8FA9"}} />
              </IconButton>
              {
                <StyledDrawer anchor="right" open={isDrawerOpen} onClose={handleDrawerClose}>
                  <List sx = {{marginTop: "20px"}}>
                    <ListItem  onClick={handleDrawerClose}>
                      <Link to="/">Rezervacija</Link>
                    </ListItem>
                    <ListItem  onClick={handleDrawerClose}>
                      <Link to="/informacije">Informacije</Link>
                    </ListItem>
                    <ListItem  onClick={handleDrawerClose}>
                      <Link onClick={() => setIsDialogOpen(true)}>Kontakt</Link>
                    </ListItem>
                    <ListItem>
                      <ArrowCircleLeftOutlinedIcon onClick = {handleDrawerClose} sx ={{color:'#0F8FA9'}} />
                    </ListItem>
                  </List>
                </StyledDrawer>
              }
            </>
          ) : (
            <Box>
              <List sx={{ display: 'flex' }}>
                <ListItem>
                  <Link to="/">Rezervacija</Link>
                </ListItem>
                <ListItem>
                  <Link to="/informacije">Informacije</Link>
                </ListItem>
                <ListItem>
                  <Link onClick={() => setIsDialogOpen(true)}>Kontakt</Link>
                </ListItem>
              </List>
            </Box>
          )}
        </Toolbar>
      </StyledAppBar>
      </>
  )};

export default Header;