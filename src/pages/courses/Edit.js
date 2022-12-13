import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../config/api';


import PageNotFound from '../PageNotFound';

//mui
import { ThemeProvider, Typography, Box, MenuItem, Select } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import theme from '../../theme'



const Edit = (props) => {
    const navigate = useNavigate();
    const [form, setForm] = useState({});
    const { id } = useParams();
    const [course, setCourse] = useState(null);

    let token = localStorage.getItem('token');
    
    useEffect(() => {
        axios.get(`/courses/${id}`, {
            headers : {
                "Authorization": `Bearer ${token}`
            }
        })
             .then((response) => {
                console.log(response.data);
                setCourse(response.data.data);
                setForm(response.data.data);
             })
             .catch((err) => {
                console.error(err);
                console.log(err.response.data);
             });
    }, [id, token]);

    if(!course) return <PageNotFound />

    const handleForm = (e) => {
        setForm((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const submitForm = () => {

        let token = localStorage.getItem('token');

        axios.put(`/courses/${id}`, form, {
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
            });
    };

    console.log(form)
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

               <Box sx={{pl:5, pr:5, pt:5, mb:5,  gridArea: 'header' }}>
                    <Typography color="customCard.white" gutterBottom variant="h3" component="div">
                        Edit a new course
                    </Typography>
                </Box>

    
                <TextField 
                    inputProps={{
                        style: {color: theme.palette.typography.primary} 
                    }}
                    InputLabelProps={{
                        style: { color: theme.palette.typography.blue},
                    }}
                    fullWidth
                    value={form.title}
                    label="Title" 
                    name="title" 
                    onChange={handleForm}
                    sx={{backgroundColor: theme.palette.background.form, border: '1px solid #494E58', borderRadius: '6px'}}
                   /*  error={errors.title}
                    helperText={errors.title?.message} */
                />
            


            
                <TextField 
                    inputProps={{
                        style: {color: theme.palette.typography.primary} 
                    }}
                    InputLabelProps={{
                        style: { color: theme.palette.typography.blue},
                    }}
                    fullWidth
                    value={form.code}
                    label="Code" 
                    name="code" 
                    onChange={handleForm}
                    sx={{mt:5, backgroundColor: theme.palette.background.form, border: '1px solid #494E58', borderRadius: '6px'}}
                   /*  error={errors.code}
                    helperText={errors.code?.message} */
                />
          
           
                <TextField fullWidth
                    inputProps={{
                        style: {color: theme.palette.typography.primary} 
                    }}
                    InputLabelProps={{
                        style: { color: theme.palette.typography.blue},
                    }}
                    value={form.description}
                    multiline 
                    label="Description" 
                    name="description" 
                    onChange={handleForm} 
                    sx={{mt:5, backgroundColor: theme.palette.background.form, border: '1px solid #494E58', borderRadius: '6px'}}
                    /* error={errors.description}
                    helperText={errors.description?.message} */
                />
         
                <TextField fullWidth
                    inputProps={{
                        style: {color: theme.palette.typography.primary} 
                    }}
                    InputLabelProps={{
                        style: { color: theme.palette.typography.blue},
                    }}
                    value={form.points}  
                    label="Points" 
                    name="points" 
                    onChange={handleForm}
                    sx={{mt:5, backgroundColor: theme.palette.background.form, border: '1px solid #494E58', borderRadius: '6px'}}
                    /* error={errors.points}
                    helperText={errors.points?.message} */
                />
            
          
               
           
   
                <Select
                    sx={{mt:5, backgroundColor: theme.palette.background.form, border: '1px solid #494E58', borderRadius: '6px'}}
                    defaultValue={form.level}
                    name="level"
                    label="Level"
                    onChange={handleForm}
                    >

                    <MenuItem sx={{backgroundColor: theme.palette.background.primary}} value={7}>7</MenuItem>
                    <MenuItem sx={{backgroundColor: theme.palette.background.primary}} value={8}>8</MenuItem>
                    <MenuItem sx={{backgroundColor: theme.palette.background.primary}} value={9}>9</MenuItem>
                    <MenuItem sx={{backgroundColor: theme.palette.background.primary, ":hover":theme.palette.background.primary }} value={10}>10</MenuItem>
                </Select>

           

                <Box sx={{ display: 'flex',  justifyContent: 'flex-end', width: '100%'}}>
                    <Button sx={{mr:5, mt:5 , mb:5, pt:3, pb:3, pl:5, pr:5, color: 'typography.white', border: '1px solid #1892ed', borderRadius: '12px' , width: '50%' }} >Cancel</Button>
                    <Button sx={{ mt:5 , mb:5, pt:3, pb:3, pl:5, pr:5, color: 'typography.white', border: '1px solid #1892ed', borderRadius: '12px', backgroundColor: theme.palette.background.blue, width: '50%'}} onClick={submitForm}>Create</Button>
                </Box>
            </Grid>
        </Grid>
    </ThemeProvider>    
    );
};

export default Edit;