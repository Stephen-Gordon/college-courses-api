import { useState } from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Navbar = (props) => {

    let logoutButton;

    if(props.authenticated === true) {
        logoutButton = (
            
                <Button vvariant="outlined" color="secondary" onClick={() => {props.onAuthenticated(false)}}>Logout</Button>
            
        )
    };


        const [anchorEl, setAnchorEl] = useState(null);
        const open = Boolean(anchorEl);
        const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
        setAnchorEl(null);
        };
    return(
       <>
       
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Festivals
          </Typography>
          <Button 
                 variant="outlined" color="secondary"
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                Festivals
            </Button>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
                }}
            >
            <MenuItem component={Link} to='/festivals' onClick={handleClose}>All</MenuItem>
            <MenuItem component={Link} to='/festivals/create' onClick={handleClose}>Create</MenuItem>
            </Menu>
          {logoutButton}
        </Toolbar>
      </AppBar>
       </>
    )

};

export default Navbar;