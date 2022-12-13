import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../config/api';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import theme from '../../theme'
import AddIcon from '@mui/icons-material/Add';
import { Paper, ThemeProvider, Box, Typography } from '@mui/material';


const Create = (props) => {
    const navigate = useNavigate();
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});

    const handleForm = (e) => {
        setForm((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

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


        if(!isRequired(['title', 'code', 'description', 'points', 'level'])){
            let token = localStorage.getItem('token');

            axios.post('/courses', form, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log(response.data);
                navigate('/');
            })
            .catch((err) => {
                console.error(err);
                console.log(err.response.data);
                setErrors(err.response.data);
            });
        }

        
    };

    return (
        <>
          <ThemeProvider theme={theme}>
            

           
            <Grid
                
                
                >
            
                <Grid sx={{ mt:4, pb:3, borderBottom: '2px solid #494E58', borderRadius: '0px'}}>
                
                    <Grid  maxWidth="xl" container sx={{pl:3, pr:3, pt:3, display: 'flex', flexDirection: 'row',}}>

                    
                        {/* Title */}

                         
                            <TextField 
                                inputProps={{
                                    style: {color: theme.palette.typography.primary} 
                                    }}
                                InputLabelProps={{
                                    style: { color: theme.palette.typography.blue},
                                    }}
                                  
                                id="title" 
                                label="Title" 
                                name='title'
                                type="text"
                                onChange={handleForm}
                                sx={{mr:3, backgroundColor: theme.palette.background.form, border: '1px solid #494E58', borderRadius: '12px'}}
                                />
                        

                        {/* Code */}
 
                        
                            <TextField 
                                inputProps={{
                                    style: {color: theme.palette.typography.primary} 
                                    }}
                                InputLabelProps={{
                                    style: { color: theme.palette.typography.blue},
                                    }}
                                  
                                id="code" 
                                label="Code" 
                                name='code'
                                type="text"
                                onChange={handleForm}
                               sx={{mr:3, backgroundColor: theme.palette.background.form, border: '1px solid #494E58', borderRadius: '12px'}}
                                />
                      

                        {/* Description */}

                        
                            <TextField 
                               inputProps={{
                                style: {color: theme.palette.typography.primary} 
                                }}
                            InputLabelProps={{
                                style: { color: theme.palette.typography.blue},
                                }}  
                                id="description" 
                                label="Description" 
                                name='description'
                                type="text"
                                onChange={handleForm}
                               sx={{mr:3, backgroundColor: theme.palette.background.form, border: '1px solid #494E58', borderRadius: '12px'}}
                                />
                       

                        {/* Points */}

                       
                            <TextField 
                                inputProps={{
                                    style: {color: theme.palette.typography.primary} 
                                    }}
                                InputLabelProps={{
                                    style: { color: theme.palette.typography.blue},
                                    }}  
                                id="points" 
                                label="Points" 
                                name='points'
                                type="text"
                                onChange={handleForm}
                               sx={{mr:3, backgroundColor: theme.palette.background.form, border: '1px solid #494E58', borderRadius: '12px'}}
                                />
                        

                        {/* Level */}

                       
                            <TextField 
                                inputProps={{
                                    style: {color: theme.palette.typography.primary} 
                                    }}
                                InputLabelProps={{
                                    style: { color: theme.palette.typography.blue},
                                    }}  
                                id="level" 
                                label="Level" 
                                name='level'
                                type="text"
                                onChange={handleForm}
                                sx={{mr:3, backgroundColor: theme.palette.background.form, border: '1px solid #494E58', borderRadius: '12px'}}
                                />
                       
                            <Button startIcon={<AddIcon />} sx={{  color: 'typography.white', borderRadius: '12px',  background: `linear-gradient(45deg, #1892ed, #f52a59)`}} onClick={submitForm}></Button>
                      
                    </Grid>
                 
                </Grid>
        </Grid>
        
    </ThemeProvider>
        </>
    );
};

export default Create;