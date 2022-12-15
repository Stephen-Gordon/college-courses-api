import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from '../../config/api';

//MUI
import {FormControl, FormHelperText, Grid, TextField, Button, Paper, ThemeProvider, Box, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

//THEME
import theme from '../../theme'


const Create = ({setAddButton, updateLecturers}) => {
    const navigate = useNavigate();
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});

    const handleForm = (e) => {
        setForm((prevState) => ({
            ...prevState,
        [e.target.name]: e.target.value
        }));
    }

    const isRequired = (fields) => {
        let error = false;
        setErrors({});

        fields.forEach(field => {
            if(!form[field]){
                error = true;
                setErrors((prevState) => ({
                    ...prevState,
                    [field]: {
                        message: `${field} is required!!!!`
                    }
                }));
            }
        });


        return error;
    };

    const submitForm = () => {


        if(!isRequired(['name', 'address', 'email', 'phone'])){
            let token = localStorage.getItem('token');

            axios.post('/lecturers', form, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log(response.data);
                setAddButton(false)
                updateLecturers()
            })
            .catch((err) => {
                console.error(err);
                console.log(err.response.data);
                setErrors(err.response.data.errors);
            });
        }

        
    };

    return (
        <>
          <ThemeProvider theme={theme}>

          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ mt:4, borderBottom: '2px solid #494E58', borderRadius: '0px'}}
            >
            <Grid  maxWidth="xl"  container columns={12} sx={{display: 'flex', flexDirection: 'row',}}>  

                        {/* Name */}

                         <Grid sx={{ml:3, mb:3}} item lg={2} md={5} sm={5} xs={12}>
                         <FormControl fullWidth>
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
                                <FormHelperText sx={{mt:1, color: theme.palette.typography.darkRed}}>{errors.name?.message}</FormHelperText>
                            </FormControl>    
                        </Grid> 

                        {/* Address */}
 
                        <Grid sx={{ml:3, mb:3}} item lg={2} md={5} sm={5} xs={12}>
                            <FormControl fullWidth>
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
                                sx={{backgroundColor: theme.palette.background.form, border: '1px solid #494E58', borderRadius: '12px'}}
                                />
                                <FormHelperText sx={{mt:1, color: theme.palette.typography.darkRed}}>{errors.address?.message}</FormHelperText>
                            </FormControl>
                        </Grid> 

                        {/* Email */}

                        <Grid sx={{ml:3, mb:3}} item lg={2} md={5} sm={5} xs={12}>
                        <FormControl fullWidth>
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
                                <FormHelperText sx={{mt:1, color: theme.palette.typography.darkRed}}>{errors.email?.message}</FormHelperText>
                            </FormControl>
                        </Grid> 

                        {/* Phone */}

                        <Grid sx={{ml:3, mb:3}} item lg={2} md={5} sm={5} xs={12}>
                        <FormControl fullWidth>
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
                                sx={{backgroundColor: theme.palette.background.form, border: '1px solid #494E58', borderRadius: '12px'}}
                                />
                                <FormHelperText sx={{mt:1, color: theme.palette.typography.darkRed}}>{errors.phone?.message}</FormHelperText>
                            </FormControl>
                        </Grid> 


                       {/* Submit button */}
                        <Grid sx={{ml:3, mb:3}}  item lg={2} md={5} sm={5} xs={12}>
                            <Button fullWidth startIcon={<AddIcon />} sx={{ height:'58px' , color: 'typography.white', borderRadius: '12px',  background: `linear-gradient(45deg, #1892ed, #f52a59)`}} onClick={submitForm}></Button>
                        </Grid>     
                    </Grid>
                  
                </Grid>
      
        
    </ThemeProvider>
        </>
    );

}
export default Create;