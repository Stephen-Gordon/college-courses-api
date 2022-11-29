//Hooks
import { useState } from "react";


//Axios
import axios from 'axios';

//NAV
import { useNavigate, Link } from "react-router-dom";

//MUI
import { styled } from '@mui/system';
import theme from '../../theme'
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
        console.log(e.target.value)
    }


    const handleClick = () => {
        console.log("clicked", form)
        axios.post('https://college-api-mo.herokuapp.com/api/login ', {
            email: form.email,
            password: form.password
        })
        .then((response) => {
            console.log(response.data)
            //setAuthenticated(true)
            props.onAuthenticated(true, response.data.token)

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
        
    
       
        const CustomTextField = styled(TextField)(({ theme }) => ({
        'label + &': {
          marginTop: theme.spacing(10),
          fontColor: theme.palette.typography.white,
        },
        '& .MuiFilledInput-input': {
        borderRadius: 12,
        position: 'relative',
        backgroundColor: theme.palette.background.blue,
        border: '1px solid #1892ed',
        fontSize: 16,
        fontColor: theme.palette.typography.white,
        padding: '10px 26px 10px 12px',
       
        '&:hover': {
            border: '1px solid #1892ed',
            borderRadius: '12px',
            backgroundColor: 'transparent'
          },
          '&:focus': {
            backgroundColor: 'transparent'
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
            
            <Grid sx={{ mt:4, pb:5}}>
 
                    <Grid  maxWidth="sm"  container sx={{pl:5, pr:5, pt:5, display: 'flex', flexWrap: 'wrap'}}>
                    
                        {/* Email */}

                        {/* <Grid item lg={12} md={12} sm={12} xs={12} >
                            <CustomTextField 
                                inputProps={{
                                    style: {color: 'white', } 
                                    }}
                                fullWidth  
                                id="email" 
                                label="Email" 
                                name='email'
                                type="text"
                                onChange={handleForm}
                                sx={{backgroundColor: theme.palette.background.secondary, borderRadius: '12px'}}
                             
                               
                                />
                        </Grid> */}

                        {/* Password */}
{/* 
                        <Grid sx={{mt:5}} item lg={12} md={12} sm={12} xs={12} >
                            <CustomTextField 
                                inputProps={{
                                    style: {color: 'white',} 
                                }}
                                fullWidth  
                                id="password" 
                                label="Password" 
                                name='password'
                                type="text"
                                onChange={handleForm}
                                sx={{backgroundColor: theme.palette.background.secondary, borderRadius: '12px'}}
                                />
                        </Grid> */}
                        
                        <Button fullWidth sx={{ mt:4, pb:3, pt:3, color: 'typography.white', border: '1px solid #1892ed', borderRadius: '12px', backgroundColor: theme.palette.background.blue }} onClick={handleClick}>Sign in</Button>
                        <Button fullWidth sx={{ mt:4, pb:3, pt:3, color: 'typography.white', border: '1px solid #1892ed', borderRadius: '12px'  }}  component={Link} to='/register' >Register</Button>

                        <p style={errorStyle}>{errorMessage}</p>
                         
            Email: <input type='text' name='email' onChange={handleForm}/>
            Password: <input type='text' name='password' onChange={handleForm}/>
            <button onClick={handleClick}>Submit</button>
            <p style={errorStyle}>{errorMessage}</p>
                            

                  
                    
                    
                    </Grid>


                    
            </Grid>
    </Grid>
        </>
    );
}

}

export default LoginForm