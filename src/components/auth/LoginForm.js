import axios from 'axios';
import { useState } from "react"

import { styled } from '@mui/system';
import customtheme from '../../theme'
import {Button, Card, Box, Grid, Container, Typography, TextField, ThemeProvider, InputBase } from '@mui/material';

const LoginForm = (props) => {
  
    const [form, setForm] = useState({
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
        console.log("clicked", form)
        axios.post('/login', {
            email: form.email,
            password: form.password
        })
        .then((response) => {
            console.log(response.data)
            //setAuthenticated(true)
            //props.onAuthenticated(true, response.data.token)

        })
        .catch((err) => {
            console.error(err)
            console.log(err.response.error)
            setErrorMessage(err.response.data.message)
        });
    }


    if (props.authenticated){
        return <><h3>You are authenticated</h3></>
    }else {
        
    
       
        const CustomTextField = styled(InputBase)(({ theme }) => ({
        'label + &': {
          marginTop: theme.spacing(3),
        },
        '& .MuiInputBase-input': {
          borderRadius: 12,
          position: 'relative',
          backgroundColor: theme.palette.background.paper,
          border: '1px solid #414147',
          fontSize: 16,
          fontColor: theme.palette.typography.white,
          padding: '10px 26px 10px 12px',
          transition: theme.transitions.create(['border-color', 'box-shadow']),
          
          '&:focus': {
            borderRadius: 6,
            borderColor: '#414147',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
          },
        },
      }));
     


    return (
        <>  
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}>
            
            <Card sx={{ mt:4, pb:5, color: 'customCard.white', border: '1px solid #414147', borderRadius: '6px' }}>
                
              
                    

                    <Grid cointainer sx={{pl:5, pr:5, pt:5, display: 'flex', flexWrap: 'wrap'}}>
                    
                        {/* Email */}
                        <Grid sx={{pr:3}} item lg={12} md={12} sm={12} xs={12} >
                            <CustomTextField
                                inputProps={{
                                style: {color: 'white', border: '1px solid #414147', borderRadius: '12px' } 
                                }}
                                fullWidth  
                                id="email" 
                                label="Email" 
                                variant="outlined" 
                                name='password' 
                                onChange={handleForm}
                                sx={{ m:1 }}
                                />
                        </Grid>

                        {/* Password */}

                        <Grid sx={{pr:3}} item lg={12} md={12} sm={12} xs={12} >
                            <TextField
                            inputProps={{
                                style: {color: 'white', border: '1px solid #414147', borderRadius: '12px' } 
                                }}
                                fullWidth 
                                id="password" 
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                variant="filled"
                                borderRadius="6px"
                                name='email' 
                                onChange={handleForm}
                                sx={{ m:1 }}
                            />
                        </Grid>
                        
                        <Button  sx={{ mt:4, pb:3, pt:3, pl:5, pr:5, color: 'customCard.white', border: '1px solid #414147', borderRadius: '12px'  }}  onClick={handleClick}>Sign in</Button>

                <p style={errorStyle}>{errorMessage}</p>
                         
                            

                  
                    
                    
                    </Grid>


                    
            </Card>
    </Grid>
        </>
    );
}

}

export default LoginForm