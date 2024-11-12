import { createTheme } from "@mui/material";


let theme = createTheme();

export const themeFizio = createTheme(theme, {
    //palette: palette,
    typography: {
        fontFamily: 'Spartan, sans-serif',
        span: {
            fontSize: 16,
            fontFamily: 'Spartan, sans-serif',      
        },
        h1: {
            fontSize: 32,
            fontFamily: 'Spartan, sans-serif',    
        },
        h2: {
            fontSize: 24,  
            fontFamily: 'Spartan, sans-serif',         

        },
        h3:{
            fontSize:18.72,
            fontFamily: 'Spartan, sans-serif', 
        },
        h4:{
            fontSize:16,
            fontFamily: 'Spartan, sans-serif', 
        },
        h5:{
            fontSize:14,
            fontFamily: 'Spartan, sans-serif', 
        },
        h6:{
            fontSize:12,
            fontFamily: 'Spartan, sans-serif', 
        },
        

    },
})