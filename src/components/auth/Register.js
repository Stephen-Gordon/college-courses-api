//Hooks
import { useState, useEffect } from "react"

//Axios
import axios from '../../config/api'

//NAV
import { useNavigate, Link } from "react-router-dom";

//MUI
import { styled } from '@mui/system';
import theme from '../../theme'
import {Button, Card, Box, Grid, Container, Typography, TextField, ThemeProvider, InputBase } from '@mui/material';


const Register = (props) => {

    const navigate = useNavigate();
    
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "" 
    });



    const [errorMessage, setErrorMessage] = useState("")


    const errorStyle = {
        color: "red"
    }

    const handleForm = (e) => {
        setForm((prevState) => ({
            ...prevState,
        [e.target.name]: e.target.value
        }));
    }


    const handleClick = () => {
        console.log(form)
        axios.post('/register', {
            name: form.name,
            email: form.email,
            password: form.password
        })
        .then((response) => {
            
            props.onAuthenticated(true, response.data.token)
            navigate('/')
        })
        .catch((err) => {
            console.error(err)
            console.log(err.response)
           
        });
    }

    const returnHome = () => {
        let timer = setTimeout(() => {
            navigate('/')
        }, 3000)
        return () => {
            clearTimeout(timer)
        } 
    }
   
    

    if (props.authenticated){

        returnHome();

        return(
        <>
          <ThemeProvider theme={theme}>
          <Container maxWidth="xl">
            <Typography sx={{color: theme.palette.typography.darkRed}}>
                You are already Registered ... Returning home
            </Typography>
            </Container>
          </ThemeProvider>
           
        </>
        )
        
    }else {
        



    return (
        <>
            <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}>
            
            <Grid sx={{ mt:4, pb:5}}>
 
                    <Grid maxWidth="sm" container sx={{pl:5, pr:5, pt:5, display: 'flex', flexWrap: 'wrap'}}>
                    

                        {/* Name */}

                        <Grid item lg={12} md={12} sm={12} xs={12} >
                            <TextField 
                                inputProps={{
                                    style: {color: theme.palette.typography.primary} 
                                    }}
                                InputLabelProps={{
                                    style: { color: theme.palette.typography.blue},
                                    }}
                                fullWidth  
                                id="name" 
                                label="Name" 
                                name='name'
                                type="text"
                                onChange={handleForm}
                                sx={{backgroundColor: theme.palette.background.form, border: '1px solid #494E58', borderRadius: '12px'}}
                                />
                        </Grid>

                        {/* Email */}

                        <Grid sx={{mt:5}}  item lg={12} md={12} sm={12} xs={12} >
                            <TextField 
                                inputProps={{
                                    style: {color: theme.palette.typography.primary} 
                                    }}
                                InputLabelProps={{
                                    style: { color: theme.palette.typography.blue},
                                    }}
                                fullWidth  
                                id="email" 
                                label="Email" 
                                name='email'
                                type="text"
                                onChange={handleForm}
                                sx={{backgroundColor: theme.palette.background.form, border: '1px solid #494E58', borderRadius: '12px'}}
                             
                               
                                />
                        </Grid>

                        {/* Password */}

                        <Grid sx={{mt:5}} item lg={12} md={12} sm={12} xs={12} >
                            <TextField 
                                inputProps={{
                                    style: {color: theme.palette.typography.primary} 
                                    }}
                                InputLabelProps={{
                                    style: { color: theme.palette.typography.blue},
                                    }}
                                fullWidth  
                                id="password" 
                                label="Password" 
                                name='password'
                                type="password"
                                onChange={handleForm}
                                sx={{backgroundColor: theme.palette.background.form, border: '1px solid #494E58', borderRadius: '12px'}}
                                />
                        </Grid>
                        
                        <Button fullWidth sx={{ mt:4, pb:3, pt:3, color: 'typography.white', border: '1px solid #1892ed', borderRadius: '12px', backgroundColor: theme.palette.background.blue }} onClick={handleClick}>Register</Button>

                        <p style={errorStyle}>{errorMessage}</p>
   
                    </Grid>


                    
            </Grid>
    </Grid>
           
        </>
    );
}

}

export default Register