import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from '../../config/api';


//MUI
import {Menu, Grid, TextField, ThemeProvider, Typography, Box, FormControl, Select, MenuItem, InputLabel, Button} from "@mui/material";


import theme from '../../theme'

const Create = () => {
    const navigate = useNavigate();
    let token = localStorage.getItem('token')

    const [form, setForm] = useState({});
    
    const [courses, setCourses] = useState();
    const [lecturers, setLecturers] = useState();

 
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


    const submitForm = () => {
        let token = localStorage.getItem('token')
        axios.post('/enrolments', form,
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
    

        /* Courses */
        const coursesList = courses?.map(course => {
            return (    
                <MenuItem onClick={handleClose} Paper key={course?.id} value={course?.id}>{course?.title}</MenuItem>     
            )
        }) 

        /* Lecturers */
        const lecturersList = lecturers?.map(lecturers => {
            return (
                <MenuItem  key={lecturers?.id} value={lecturers?.id}>{lecturers?.name}</MenuItem>     
            )
        }) 

       
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
            <Grid  maxWidth="sm"  container sx={{pl:5, pr:5, pt:5, display: 'flex', flexWrap: 'wrap'}}>  
                

                <Box sx={{pl:5, pr:5, pt:5, mb:5,  gridArea: 'header' }}>
                    <Typography color="customCard.white" gutterBottom variant="h3" component="div">
                        Create an enrolment
                    </Typography>
                </Box>



                {/* COURSE */}
                <FormControl fullWidth>
                <InputLabel sx={{color: theme.palette.typography.blue}}>Course</InputLabel>
                    <Select  
             
                       
                        sx={{color: theme.palette.typography.primary, backgroundColor: theme.palette.background.form, border: '1px solid #494E58', borderRadius: '6px'}}
                        name="course_id"
                        onChange={handleForm}
                        >

                    <Menu
                     
                    >
                    {coursesList} 
                  </Menu>
                        
                    </Select>
                </FormControl>

                {/* LECTURERS */}

                <FormControl fullWidth sx={{mt:5}}>
                <InputLabel sx={{color: theme.palette.typography.blue}}>Lecturers</InputLabel>
                    <Select  
                        fullWidth
                        sx={{color: theme.palette.typography.primary, backgroundColor: theme.palette.background.form, border: '1px solid #494E58', borderRadius: '6px'}}
                        name="lecturer_id"
                        onChange={handleForm}
                        >
                        {lecturersList} 
                    </Select>
                </FormControl>

                {/* STATUS */}
          
                <FormControl fullWidth sx={{mt:5}}>
                <InputLabel sx={{color: theme.palette.typography.blue}}>Status</InputLabel>
                    <Select
                        fullWidth
                       
                        sx={{color: theme.palette.typography.primary, backgroundColor: theme.palette.background.form, border: '1px solid #494E58', borderRadius: '6px'}}
                        name="status"
                        onChange={handleForm}
                        >
                       <MenuItem value={"interested"}>Interested</MenuItem>     
                       <MenuItem value={"assigned"}>Assigned</MenuItem>   
                       <MenuItem value={"associate"}>Associate</MenuItem>   
                       <MenuItem value={"career_break"}>Career Break</MenuItem>   
                    </Select>
                </FormControl>    
            

                <TextField  
                    fullWidth
                    sx={{mt:5, backgroundColor: theme.palette.background.form, border: '1px solid #494E58', borderRadius: '6px'}}
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

                <TextField  
                    sx={{mt:5, backgroundColor: theme.palette.background.form, border: '1px solid #494E58', borderRadius: '6px'}}
                    fullWidth
                    inputProps={{
                        style: {color: theme.palette.typography.primary} 
                    }}
                    InputLabelProps={{
                        style: { color: theme.palette.typography.blue},
                        shrink: true
                    }}
                    label="Start Date"
                    type="time"
                    name='time'
                    onChange={handleForm}
                 
                />

            </Grid>
        
        
                {/* Submit button */}
                <Button variant='outlined' onClick={submitForm}>Submit</Button>
                </Grid>  
            </ThemeProvider>        
        </>
    )

}
export default Create;