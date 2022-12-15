import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from '../../config/api';


//MUI
import {FormHelperText, Menu, Grid, TextField, ThemeProvider, Typography, Box, FormControl, Select, MenuItem, InputLabel, Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import theme from '../../theme'

const Create = ({setAddButton, updateEnrolments}) => {
    const navigate = useNavigate();
    let token = localStorage.getItem('token')

    const [form, setForm] = useState({});
    
    const [courses, setCourses] = useState();
    const [lecturers, setLecturers] = useState();

    const [errors, setErrors] = useState({});

 
    useEffect(() => {

        /* Courses */
        axios.get('/courses/', {
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
        .then((response) => {
            setCourses(response.data.data)
        })
        .catch((err) => {
            console.error(err)
        });


        /* Lecturers */
        axios.get('/lecturers/', {
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
        .then((response) => {
            setLecturers(response.data.data)
        })
        .catch((err) => {
            console.error(err)
        });
    },[])
  

    const handleForm = (e) => {
        setForm((prevState) => ({
            ...prevState,
        [e.target.name]: e.target.value
        }));
        console.log(e.target.value)
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


        if(!isRequired(['course_id', 'lecturer_id', 'status', 'time', 'date'])){
            let token = localStorage.getItem('token');

            axios.post('/enrolments', form, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log(response.data);
                setAddButton(false)
                updateEnrolments()
            })
            .catch((err) => {
                console.error(err);
                console.log(err.response.data);
                setErrors(err.response.data.errors);
            });
        }
    };


    

        /* Courses */
        const coursesList = courses?.map(course => {
            return (    
                <MenuItem sx={{color: theme.palette.typography.primary, backgroundColor: theme.palette.background.primary}} key={course?.id} value={course?.id}>{course?.title}</MenuItem>     
            )
        }) 

        /* Lecturers */
        const lecturersList = lecturers?.map(lecturers => {
            return (
                <MenuItem sx={{color: theme.palette.typography.primary, backgroundColor: theme.palette.background.primary}}  key={lecturers?.id} value={lecturers?.id}>{lecturers?.name}</MenuItem>     
            )
        }) 

       
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


                {/* COURSE */}
                <Grid  sx={{ml:3, mb:3}} item lg={2} md={5} sm={5} xs={12}>
                <FormControl fullWidth>
                    <InputLabel sx={{color: theme.palette.typography.blue}}>Courses</InputLabel>
                        <Select  
                        sx={{color: theme.palette.typography.primary, backgroundColor: theme.palette.background.form, border: '1px solid #494E58', borderRadius: '12px'}}
                        name="course_id"
                        onChange={handleForm}
                        >
                            {coursesList} 
                        </Select>
                        <FormHelperText sx={{mt:1, color: theme.palette.typography.darkRed}}>{errors.course_id?.message}</FormHelperText>
                    </FormControl>
                </Grid>



                

                {/* LECTURERS */}

                <Grid  sx={{ml:3, mb:3}} item lg={2} md={5} sm={5} xs={12}>
                    <FormControl fullWidth>
                    <InputLabel sx={{color: theme.palette.typography.blue}}>Lecturers</InputLabel>
                        <Select  
                            
                            sx={{color: theme.palette.typography.primary, backgroundColor: theme.palette.background.form, border: '1px solid #494E58', borderRadius: '12px'}}
                            name="lecturer_id"
                            onChange={handleForm}
                            >
                            {lecturersList} 
                        </Select>
                        <FormHelperText sx={{mt:1, color: theme.palette.typography.darkRed}}>{errors.lecturer_id?.message}</FormHelperText>
                    </FormControl>
                </Grid>



                {/* STATUS */}

                <Grid  sx={{ml:3, mb:3}}  item lg={2} md={5} sm={5} xs={12}>
                    <FormControl fullWidth >
                    <InputLabel sx={{color: theme.palette.typography.blue}}>Status</InputLabel>
                        <Select
                            sx={{color: theme.palette.typography.primary, backgroundColor: theme.palette.background.form, border: '1px solid #494E58', borderRadius: '12px'}}
                            name="status"
                            onChange={handleForm}
                            >
                        <MenuItem sx={{color: theme.palette.typography.primary, backgroundColor: theme.palette.background.primary}} value={"interested"}>Interested</MenuItem>     
                        <MenuItem sx={{color: theme.palette.typography.primary, backgroundColor: theme.palette.background.primary}} value={"assigned"}>Assigned</MenuItem>   
                        <MenuItem sx={{color: theme.palette.typography.primary, backgroundColor: theme.palette.background.primary}} value={"associate"}>Associate</MenuItem>   
                        <MenuItem sx={{color: theme.palette.typography.primary, backgroundColor: theme.palette.background.primary}} value={"career_break"}>Career Break</MenuItem>   
                        </Select>
                        <FormHelperText sx={{mt:1, color: theme.palette.typography.darkRed}}>{errors.status?.message}</FormHelperText>
                    </FormControl>    
                </Grid>



                {/* DATE */}

                <Grid  sx={{ml:3, mb:3}} item lg={1} md={5} sm={5} xs={12}>
                    <FormControl fullWidth>
                    <TextField  
                        fullWidth
                        sx={{backgroundColor: theme.palette.background.form, border: '1px solid #494E58', borderRadius: '12px'}}
                        inputProps={{
                            style: {color: theme.palette.typography.primary} 
                        }}
                        InputLabelProps={{
                            style: { color: theme.palette.typography.blue},
                            shrink: true
                        }}  
                        label="Start Date"
                        type="date"
                        name='date'
                        onChange={handleForm}
                    />
                     <FormHelperText sx={{mt:1, color: theme.palette.typography.darkRed}}>{errors.date?.message}</FormHelperText>
                    </FormControl>   
                </Grid>



                {/* Time */}

                <Grid sx={{ml:3, mb:3}}  item lg={1} md={5} sm={5} xs={12}>
                    <FormControl fullWidth>
                    <TextField  
                        fullWidth
                        sx={{backgroundColor: theme.palette.background.form, border: '1px solid #494E58', borderRadius: '12px'}}
                        inputProps={{
                            style: {color: theme.palette.typography.primary} 
                        }}
                        InputLabelProps={{
                            style: { color: theme.palette.typography.blue},
                            shrink: true
                        }}
                        label="Start Time"
                        type="time"
                        name='time'
                        onChange={handleForm}
                    />
                    <FormHelperText sx={{mt:1, color: theme.palette.typography.darkRed}}>{errors.time?.message}</FormHelperText>
                    </FormControl>
                </Grid>




                {/* Submit button */}
                <Grid sx={{ml:3}} fullWidth item lg={2} md={5} sm={5} xs={12}>
                    <Button fullWidth startIcon={<AddIcon />} sx={{ height:'58px' , color: 'typography.white', borderRadius: '12px',  background: `linear-gradient(45deg, #1892ed, #f52a59)`}} onClick={submitForm}></Button>
                </Grid>      


            </Grid>                
                </Grid>  
            </ThemeProvider>        
        </>
    )

}
export default Create;