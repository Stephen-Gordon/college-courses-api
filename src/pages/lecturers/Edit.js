import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../config/api';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PageNotFound from '../PageNotFound';
import { FormControl, FormHelperText, ThemeProvider, Typography, Box, MenuItem, Select } from '@mui/material';
import theme from '../../theme'



const Edit = (props) => {
    const navigate = useNavigate();
    const [form, setForm] = useState({});
    const { id } = useParams();
    const [lecture, setLecture] = useState(null);

    const [errors, setErrors] = useState({});

    const navHome = () => {
        navigate('/')
    }
    let token = localStorage.getItem('token');
    
    useEffect(() => {
        axios.get(`/lecturers/${id}`, {
            headers : {
                "Authorization": `Bearer ${token}`
            }
        })
             .then((response) => {
                setLecture(response.data.data);
                setForm(response.data.data);
             })
             .catch((err) => {
                console.error(err);
                console.log(err.response.data);
             });
    }, [id, token]);

    if(!lecture) return <PageNotFound />

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


        if(!isRequired(['name', 'address', 'phone', 'email'])){
            let token = localStorage.getItem('token');

            axios.put(`/lecturers/${id}`, form, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
            })
            .then((response) => {
                navigate('/');
            })
            .catch((err) => {
                console.error(err);
                console.log(err.response.data);
                setErrors(err.response.data.errors);
            });
        }
    };

    let emailError;

       if(errors.email){
        emailError =  errors.email[0]
       }

    let phoneError;

    if(errors.phone){
        phoneError =  errors.phone[0]
    }   

       

    return (
        <ThemeProvider theme={theme}>

            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                >
               <Grid  maxWidth="sm"  container sx={{pl:5, pr:5, pt:5, display: 'flex', flexWrap: 'wrap'}}>

               <Box sx={{ gridArea: 'header' }}>
                            
                    <Typography color={theme.palette.typography.blue} gutterBottom variant="h3" component="div">
                        Edit a lecturer
                    </Typography>
                       
                </Box>

                <FormControl fullWidth>
                <TextField 
                    inputProps={{
                        style: {color: theme.palette.typography.primary} 
                    }}
                    InputLabelProps={{
                        style: { color: theme.palette.typography.blue},
                    }}
                    fullWidth
                    value={form.name}
                    label="Name" 
                    name="name" 
                    onChange={handleForm}
                    sx={{backgroundColor: theme.palette.background.form, border: '1px solid #494E58', borderRadius: '6px'}}
                />
                <FormHelperText sx={{mt:1, color: theme.palette.typography.darkRed}}>{errors.name?.message}</FormHelperText>
                </FormControl>
            


                <FormControl fullWidth>
                <TextField 
                    inputProps={{
                        style: {color: theme.palette.typography.primary} 
                    }}
                    InputLabelProps={{
                        style: { color: theme.palette.typography.blue},
                    }}
                    fullWidth
                    value={form.address}
                    label="Address" 
                    name="address" 
                    onChange={handleForm}
                    sx={{mt:5, backgroundColor: theme.palette.background.form, border: '1px solid #494E58', borderRadius: '6px'}}
                  
                />
                <FormHelperText sx={{mt:1, color: theme.palette.typography.darkRed}}>{errors.address?.message}</FormHelperText>
                </FormControl>
           








                <FormControl fullWidth>
                <TextField 
                    inputProps={{
                        style: {color: theme.palette.typography.primary} 
                    }}
                    InputLabelProps={{
                        style: { color: theme.palette.typography.blue},
                    }}
                    value={form.phone}
                    multiline 
                    label="Phone" 
                    name="phone" 
                    onChange={handleForm} 
                    sx={{mt:5, backgroundColor: theme.palette.background.form, border: '1px solid #494E58', borderRadius: '6px'}}
                    
                />
                <FormHelperText sx={{mt:1, color: theme.palette.typography.darkRed}}>{errors.phone?.message}{phoneError}</FormHelperText>
                </FormControl>    








                <FormControl fullWidth>    
                <TextField 
                    inputProps={{
                        style: {color: theme.palette.typography.primary} 
                    }}
                    InputLabelProps={{
                        style: { color: theme.palette.typography.blue},
                    }}
                    value={form.email}  
                    label="Email" 
                    name="email" 
                    onChange={handleForm}
                    sx={{mt:5, backgroundColor: theme.palette.background.form, border: '1px solid #494E58', borderRadius: '6px'}}
                 
                />
                <FormHelperText sx={{mt:1, color: theme.palette.typography.darkRed}}>{errors.email?.message}{emailError}</FormHelperText>
            </FormControl>    
          
              
             

           

                <Box sx={{ display: 'flex',  justifyContent: 'flex-end', width: '100%'}}>
                    <Button sx={{mr:5, mt:5 , mb:5, pt:3, pb:3, pl:5, pr:5, color: 'typography.white', border: '1px solid #1892ed', borderRadius: '12px' , width: '50%' }} onClick={navHome}>Cancel</Button>
                    <Button sx={{ mt:5 , mb:5, pt:3, pb:3, pl:5, pr:5, color: 'typography.white', border: '1px solid #1892ed', borderRadius: '12px', backgroundColor: theme.palette.background.blue, width: '50%'}} onClick={submitForm}>Update</Button>
                </Box>
            </Grid>
        </Grid>
    </ThemeProvider>    
    );
};

export default Edit;