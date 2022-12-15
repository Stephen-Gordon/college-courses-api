import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from '../config/api'


import { Container, Grid, ThemeProvider } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Paper from "@mui/material/Paper";

import { styled, alpha } from '@mui/material/styles';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import CoursesIndex from '../pages/courses/Index'

//components
import StyledMenu from "./StyledMenu";

import theme from '../theme'

const Navbar = (props) => {

 
  const [user, setUser] = useState(null)
  

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {

      let token = localStorage.getItem('token')
      axios.get('/user', {
        headers:{
            "Authorization": `Bearer ${token}`
        }
    })
    .then((response) => {
    
      setUser(response.data.user)
   
    })
    .catch((err) => {
        console.error(err)
    });
  }, [])



  


  

  const handleChange = (event, newValue) => {
    props.setValue(newValue);
  };

  const handleMenuClick = () => {
    localStorage.removeItem('token')
    props.onAuthenticated(false)
    handleClose()
  }


    let logoutButton;

    if(props.authenticated === true) {
        logoutButton = (
          <MenuItem  
            sx={{mt:1, display: 'flex', borderTop: '1px solid', borderColor: theme.palette.background.border, 
            '&:hover': {
              color: theme.palette.typography.darkRed,
            },
            
          }}
           
            onClick={handleMenuClick}>
            Logout
            </MenuItem>
        )
    };

    

    let userMenu;
    if(props.authenticated === true) {
      userMenu = ( 
        <>
        <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        
        sx={{p:1, color: 'typography.white', display: 'flex', border: 'none', borderRadius: '12px',  background: `linear-gradient(45deg, #1892ed, #f52a59)` }}>
        {user?.name}
       
        </Button>

        
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
        
        <Container sx={{display: 'flex', flexDirection: 'column' }}>
          <Box sx={{pt:1, pb:1 ,'&:hover': {
              color: theme.palette.typography.blue,
            }}}>
            {user?.name}
          </Box>

          <Box sx={{pt:1, pb:1, '&:hover': {
              color: theme.palette.typography.blue,
            },}}>
            {user?.email}
          </Box>
        </Container>
        
        {logoutButton}
        
        </StyledMenu>
       
        
        </>
      )
  };


  let courseColor;
  let lectureColor;
  let enrolmentColor;
  if(props.value === 0){
    courseColor = theme.palette.typography.blue
  } else {
    courseColor = theme.palette.typography.primary
  }

  if(props.value === 1){
    lectureColor = theme.palette.typography.blue
  } else {
    lectureColor = theme.palette.typography.primary
  }

  if(props.value === 2){
    enrolmentColor = theme.palette.typography.blue
  } else {
    enrolmentColor = theme.palette.typography.primary
  }
    
    return(
       <>

      <ThemeProvider theme={theme}>
      <AppBar color="transparent" sx={{boxShadow: 0}} position="static">
        <Toolbar>
          
            <Container justifyContent="flex-start" sx={{color: theme.palette.typography.primary, display: 'flex', flexDirection: 'row'}}>
             
              <TabContext value={props.value}>

                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Button component={Link} to={'/'} onClick={()=>{props.setValue(0)}} sx={{m:1, p:1, color: courseColor,}}>
                    Courses
                  </Button>
                  <Button component={Link} to={'/'} onClick={()=>{props.setValue(1)}} sx={{m:1, p:1, color: lectureColor}}>
                    Lecturers
                  </Button>
                  <Button component={Link} to={'/'} onClick={()=>{props.setValue(2)}}  sx={{m:1, p:1, color: enrolmentColor}}>
                  Enrolments
                  </Button>
                </TabList>
                
              </TabContext>  
            </Container>

            <Container justifyContent="flex-end" sx={{display: 'flex', justifyContent: 'flex-end'}} >
              
              {userMenu}  
            </Container>
         
        </Toolbar>
      </AppBar>  
      </ThemeProvider> 
      
       </>
    )

};

export default Navbar;