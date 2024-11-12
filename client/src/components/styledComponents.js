import { AppBar, Box, Drawer, Typography} from '@mui/material';
import { styled } from '@mui/material/styles';
import Calendar from 'react-calendar';

export const StyledAppBar = styled(AppBar)(() => ({
    padding: "20px 60px",
    backgroundColor: "#EEF8FC !important",
    boxShadow: "0 5px rgba(0, 0, 0, 0.06)",
    zIndex: 999,
    position: "sticky",
    top: 0,
    left: 0,
    '& a': {
      textDecoration: 'none',
      color: '#0F8FA9',
      fontSize: '20px'
    },
    '@media (max-width: 799px)': {
      padding: "20px"
    },

}));

export const StyledCalendar = styled(Calendar)(() => ({
  width: '100%',
  border: "3px solid #3FD0EE",
  borderRadius: '10px',
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
    border: '1px solid #3FD0EE',
  },
  '& .react-calendar__tile--active:enabled:focus':{
    backgroundColor:'#3FD0EE'
  },
  '& .react-calendar__tile--active' : {
    backgroundColor:'#3FD0EE'
  },
  '& .react-calendar__tile--now':{
    backgroundColor:'#D3D4D9'
  }
}));

export const StyledAllContentBox = styled(Box)(() => ({

  display: 'flex',
  padding: "50px",
  height: "100%",
  '@media (max-width: 700px)': {
    flexDirection:'column'
  },
}));

export const StyledDrawer = styled(Drawer)(() => ({
    width: "0%",
    '& a': {
      textDecoration: 'none',
      color: '#0F8FA9',
      fontSize: '20px'
    },
    '& .MuiPaper-root ' : {
      backgroundColor: "#EEF8FC ",
    }
}));
export const Paragraph = styled(Typography)(() => ({
  fontSize: '14px'
}));