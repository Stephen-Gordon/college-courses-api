import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import axios from '../../config/api';


//MUI
import {FormHelperText, Grid, TextField, ThemeProvider, Typography, Box, FormControl, Select, MenuItem, InputLabel, Button} from "@mui/material";


import theme from '../../theme'

const Create = () => {
    const navigate = useNavigate();

    const { id } = useParams();

    

    const [form, setForm] = useState({});
    
    const [courses, setCourses] = useState();
    const [lecturers, setLecturers] = useState();

    const [course, setCourse] = useState();
    const [lecturer, setLecturer] = useState();

    const [errors, setErrors] = useState({});


    const [enrolments, setEnrolments] = useState([]);

    let token = localStorage.getItem('token')
    useEffect(() => {

        axios.get(`/enrolments/${id}`, {
            headers : {
                "Authorization": `Bearer ${token}`
            }
        })
             .then((response) => {
                setEnrolments([response.data.data])
                setCourse(response.data.data);
                setForm(response.data.data);
             })
             .catch((err) => {
                console.error(err);
                console.log(err.response.data);
             });


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

            axios.put(`/enrolments/${id}`, form, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
            })
            .then((response) => {
                navigate(`/enrolments/${id}`);
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
                <MenuItem key={course?.id} value={course?.id}>{course?.title}</MenuItem>     
            )
        }) 

        /* Lecturers */
        const lecturersList = lecturers?.map(lecturers => {
            return (
                <MenuItem key={lecturers?.id} value={lecturers?.id}>{lecturers?.name}</MenuItem>     
            )
        }) 
       


         const courseHtml = enrolments?.map(enrolment => {
            return (
                <FormControl key={enrolments.id} fullWidth>
                    <Select 
                        fullWidth 
                        key={enrolment?.id} 
                        defaultValue={enrolment?.course.id}
                        sx={{color: theme.palette.typography.primary, backgroundColor: theme.palette.background.form, border: '1px solid #494E58', borderRadius: '6px'}}
                        name="course_id"
                        onChange={handleForm}
                    >
                        {coursesList}
                    </Select>  
                    <FormHelperText sx={{mt:1, color: theme.palette.typography.darkRed}}>{errors.course_id?.message}</FormHelperText>   
                </FormControl>
            )
        })  

        const lecturerHtml = enrolments?.map(enrolment => {
            return (
                <FormControl  key={enrolments.id}  fullWidth sx={{mt:5}}>
                    <Select 
                        key={enrolment?.id} 
                        defaultValue={enrolment?.lecturer?.id}
                        sx={{color: theme.palette.typography.primary, backgroundColor: theme.palette.background.form, border: '1px solid #494E58', borderRadius: '6px'}}
                        name="lecturer_id"
                        onChange={handleForm}
                    >
                        {lecturersList}
                    </Select>     
                    <FormHelperText sx={{mt:1, color: theme.palette.typography.darkRed}}>{errors.lecturer_id?.message}</FormHelperText>
                </FormControl>
            )
        })  

        const statusHtml = enrolments?.map(enrolment => {
            return (
                <FormControl  key={enrolments.id}  fullWidth sx={{mt:5}}>
                    <Select 
                        
                        key={enrolment?.id} 
                        defaultValue={enrolment?.status}
                        sx={{color: theme.palette.typography.primary, backgroundColor: theme.palette.background.form, border: '1px solid #494E58', borderRadius: '6px'}}
                        name="status"
                        onChange={handleForm}
                    >
                       <MenuItem value={"interested"}>Interested</MenuItem>     
                       <MenuItem value={"assigned"}>Assigned</MenuItem>   
                       <MenuItem value={"associate"}>Associate</MenuItem>   
                       <MenuItem value={"career_break"}>Career Break</MenuItem>
                    </Select>     
                    <FormHelperText sx={{mt:1, color: theme.palette.typography.darkRed}}>{errors.course_id?.message}</FormHelperText>
                </FormControl>
            )
        })  
   

console.log(form)
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
                        Edit enrolment {id}
                    </Typography>
                </Box>



                {/* COURSE */}

                <Box sx={{display: 'flex', flexDirection: 'column', width:'100%'}}>{courseHtml}     {lecturerHtml}   {statusHtml} 
                
                </Box>       


                {/* LECTURERS */}

                

             
                {/* STATUS */}
          
              <FormControl fullWidth>
              <TextField  
                    
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
                    value={form?.date}
                />
                <FormHelperText sx={{mt:1, color: theme.palette.typography.darkRed}}>{errors.date?.message}</FormHelperText>
              </FormControl>
          

            <FormControl fullWidth>
            <TextField  
                    sx={{mt:5, backgroundColor: theme.palette.background.form, border: '1px solid #494E58', borderRadius: '6px'}}
                    
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
                    value={form.time} 
                />
                <FormHelperText sx={{mt:1, color: theme.palette.typography.darkRed}}>{errors.time?.message}</FormHelperText>
            </FormControl>   


            {/* Submit button */}
            <Button sx={{ mt:5 , mb:5, pt:3, pb:3, pl:5, pr:5, color: 'typography.white', border: '1px solid #1892ed', borderRadius: '12px', backgroundColor: theme.palette.background.blue, width: '100%'}} onClick={submitForm}>Update</Button>

            </Grid>
        
        
               
                </Grid>  
            </ThemeProvider>        
        </>
    )

}
export default Create;