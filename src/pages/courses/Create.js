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


const Create = ({setAddButton}) => {

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
                setAddButton(false)
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

                        {/* Title */}

                         <Grid  sx={{ml:3, mb:3}} item lg={2} md={5} sm={5} xs={12}>
                            <FormControl fullWidth>
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
                                sx={{backgroundColor: theme.palette.background.form, border: '1px solid #494E58', borderRadius: '12px'}}
                                />
                             
                            <FormHelperText sx={{mt:1, color: theme.palette.typography.darkRed}}>{errors.title?.message}</FormHelperText>
                         </FormControl>
                        </Grid>
                        {/* Code */}
 
                        <Grid  sx={{ml:3, mb:3}} item lg={2} md={5} sm={5} xs={12}>
                            <FormControl fullWidth>
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
                               sx={{backgroundColor: theme.palette.background.form, border: '1px solid #494E58', borderRadius: '12px'}}
                                />
                            <FormHelperText sx={{mt:1, color: theme.palette.typography.darkRed}}>{errors.code?.message}</FormHelperText>
                            </FormControl>
                        </Grid>



                        {/* Description */}

                        <Grid  sx={{ml:3, mb:3}} item lg={2} md={5} sm={5} xs={12}>
                        <FormControl fullWidth>
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
                                sx={{backgroundColor: theme.palette.background.form, border: '1px solid #494E58', borderRadius: '12px'}}
                                />
                                <FormHelperText sx={{mt:1, color: theme.palette.typography.darkRed}}>{errors.description?.message}</FormHelperText>
                         </FormControl>
                        </Grid>



                        {/* Points */}

                        <Grid  sx={{ml:3, mb:3}} item lg={1} md={5} sm={5} xs={12}>
                        <FormControl fullWidth>
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
                            sx={{backgroundColor: theme.palette.background.form, border: '1px solid #494E58', borderRadius: '12px'}}
                            />
                            <FormHelperText sx={{mt:1, color: theme.palette.typography.darkRed}}>{errors.points?.message}</FormHelperText>
                        </FormControl>
                        </Grid>

                        {/* Level */}

                        <Grid  sx={{ml:3, mb:3}} item lg={1} md={5} sm={5} xs={12}>
                            <FormControl fullWidth>
                            <Select
                                sx={{backgroundColor: theme.palette.background.form, border: '1px solid #494E58', borderRadius: '6px'}}
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
                                <FormHelperText sx={{mt:1, color: theme.palette.typography.darkRed}}>{errors.level?.message}</FormHelperText>
                            </FormControl>

                        </Grid>

                            {/* Submit button */}
                            <Grid sx={{ml:3, mb:3}}  item lg={1} md={5} sm={5} xs={12}>
                                <Button fullWidth startIcon={<AddIcon />} sx={{ height:'100%' , color: 'typography.white', borderRadius: '12px',  background: `linear-gradient(45deg, #1892ed, #f52a59)`}} onClick={submitForm}></Button>
                            </Grid>     
                    </Grid>
             
        </Grid>
        
    </ThemeProvider>
        </>
    );
};

export default Create;