import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from '../../config/api';

//MUI
import { Grid, TextField, Button, Paper, ThemeProvider, Box, Typography} from "@mui/material";

//THEME
import theme from '../../theme'


const Create = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
    });
 

    const handleForm = (e) => {
        setForm((prevState) => ({
            ...prevState,
        [e.target.name]: e.target.value
        }));
    }


    const submitForm = () => {
        let token = localStorage.getItem('token')
        axios.post('/lecturers', form,
        {
            headers: {
                "authorization": `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log(response.data)
                navigate('/')
                
            })
            .catch((err)=> {
                console.error(err.response.data)
            });
    }

    return (
        <>
          <ThemeProvider theme={theme}>

            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                >
            
                <Grid sx={{ mt:4, pb:5}}>
                
                    <Grid  maxWidth="sm"  container sx={{pl:5, pr:5, pt:5, display: 'flex', flexWrap: 'wrap'}}>

                        <Box sx={{pl:5, pr:5, pt:5, mb:5,  gridArea: 'header' }}>
                            
                            <Typography color="customCard.white" gutterBottom variant="h3" component="div">
                                Add a new lecturers
                            </Typography>
                       
                        </Box>
                    
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
                                sx={{backgroundColor: theme.palette.background.form, border: '1px solid #494E58', borderRadius: '6px'}}
                                />
                        </Grid> 

                        {/* Address */}
 
                        <Grid sx={{mt:5}} item lg={12} md={12} sm={12} xs={12} >
                            <TextField 
                                inputProps={{
                                    style: {color: theme.palette.typography.primary} 
                                    }}
                                InputLabelProps={{
                                    style: { color: theme.palette.typography.blue},
                                    }}
                                fullWidth  
                                id="address" 
                                label="Address" 
                                name='address'
                                type="text"
                                onChange={handleForm}
                                sx={{backgroundColor: theme.palette.background.form, border: '1px solid #494E58', borderRadius: '6px'}}
                                />
                        </Grid> 

                        {/* Email */}

                        <Grid sx={{mt:5}} item lg={12} md={12} sm={12} xs={12} >
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
                                sx={{backgroundColor: theme.palette.background.form, border: '1px solid #494E58', borderRadius: '6px'}}
                                />
                        </Grid> 

                        {/* Phone */}

                        <Grid sx={{mt:5}} item lg={12} md={12} sm={12} xs={12} >
                            <TextField 
                               inputProps={{
                                    style: {color: theme.palette.typography.primary} 
                                }}
                                InputLabelProps={{
                                    style: { color: theme.palette.typography.blue},
                                }}
                                fullWidth  
                                id="phone" 
                                label="Phone" 
                                name='phone'
                                type="text"
                                onChange={handleForm}
                                sx={{backgroundColor: theme.palette.background.form, border: '1px solid #494E58', borderRadius: '6px'}}
                                />
                        </Grid> 


                       <Box sx={{ display: 'flex',  justifyContent: 'flex-end' }}>
                            <Button sx={{mr:5, mt:5 , mb:5, pt:3, pb:3, pl:5, pr:5, color: 'typography.white', borderRadius: '12px'  }} >Cancel</Button>
                            <Button sx={{ mt:5 , mb:5, pt:3, pb:3, pl:5, pr:5, color: 'typography.white', border: '1px solid #1892ed', borderRadius: '12px', backgroundColor: theme.palette.background.blue }} onClick={submitForm}>Create</Button>
                       </Box>
                    </Grid>
                  
                </Grid>
        </Grid>
        
    </ThemeProvider>
        </>
    );

}
export default Create;