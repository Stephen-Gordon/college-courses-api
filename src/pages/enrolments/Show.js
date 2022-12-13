import axios from '../../config/api'
import { useEffect, useState } from "react";

import { useParams, Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
//MUI
import { Button, Box, Typography, Container, ThemeProvider, Grid } from '@mui/material';

//Components
import StripedDataGrid from '../../components/StripedDataGrid';
import AnimatedGradientText from '../../components/AnimatedGradientText'
//THEME
import theme from '../../theme'
const Show = () => {
const { id } = useParams();
const [enrolment, setEnrolment] = useState(null)

let token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(`/enrolments/${id}`, {
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log(response.data)
            setEnrolment(response.data.data)
        })
        .catch((err) => {
            console.error(err)
        });
    }, [id, token])


   

    if(!enrolment) return <h3>no course</h3>
   
    return(
        
        <>
        <ThemeProvider theme={theme}>
           <Container maxWidth="xl">
            
            <Box sx={{ pr:5, pt:5, mb:5,  gridArea: 'header' }}>              
                <Typography color="typography.white" gutterBottom variant="h3" component="div">
                    Enrolment {enrolment.id}
                </Typography>
            </Box>
                

                <Grid container column={12}  sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            
                        <Grid container column={12} sx={{ display: 'flex', pl:5, mt:3, mb:5, borderLeft: '2px solid #494E58'}} item lg={12} md={12} sm={12} xs={12} >
                        
                            <Grid sx={{mb:3}} item lg={6} md={9} sm={12} xs={12}>
                                <Typography color="typography.blue" gutterBottom variant="h6" component="div">
                                    <p>Description</p>
                                </Typography>

                                <Typography color="typography.primary" gutterBottom variant="h5" component="div">
                                    <p>{enrolment.course.description}</p>
                                </Typography>
                            </Grid>
                            <Grid sx={{mb:3}} item lg={6} md={3} sm={0} xs={0}>
                               
                            </Grid>
                            

                            <Grid sx={{mr:3, mb:3}} item lg={2} md={3} sm={3} xs={12}>

                                    <Box>
                                        <Typography color="typography.blue" gutterBottom variant="h6" component="div">
                                            <p>Course</p>
                                        </Typography>
                                        
                                        <Typography color="typography.primary" gutterBottom variant="h5" component="div">
                                            <p>{enrolment.course.title}</p>
                                        </Typography>
                                    </Box>

                                    <Box >
                                        <Typography color="typography.blue" gutterBottom variant="h6" component="div">
                                            <p>Lecturer</p>    
                                        </Typography>

                                        <Typography color="typography.primary" gutterBottom variant="h5" component="div">
                                            <p>{enrolment.lecturer.name}</p>
                                        </Typography>
                                    </Box>
                            </Grid>


                            <Grid  sx={{mr:3, mb:3}} item lg={2} md={3} sm={3} xs={12} >
                                <Box>
                                    <Typography color="typography.blue" gutterBottom variant="h6" component="div">
                                        <p>Points</p>
                                    </Typography>
                                    <Typography color="typography.primary" gutterBottom variant="h5" component="div">
                                        <p>{enrolment.course.points}</p>
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography color="typography.blue" gutterBottom variant="h6" component="div">
                                        <p>Level</p>    
                                    </Typography>
                                    <Typography color="typography.primary" gutterBottom variant="h5" component="div">
                                        <p>{enrolment.course.level}</p>
                                    </Typography>
                                </Box>
                            </Grid>


                            

                            <Grid  sx={{mr:3,mb:3 }} item lg={2} md={3} sm={3} xs={12} >

                                    <Box>
                                        <Typography color="typography.blue" gutterBottom variant="h6" component="div">
                                            <p>Course</p>
                                        </Typography>
                                        
                                        <Typography color="typography.primary" gutterBottom variant="h5" component="div">
                                            <p>{enrolment.course.title}</p>
                                        </Typography>
                                    </Box>

                                    <Box >
                                        <Typography color="typography.blue" gutterBottom variant="h6" component="div">
                                            <p>Status</p>    
                                        </Typography>

                                        <Typography color="typography.primary" gutterBottom variant="h5" component="div">
                                            <p>{enrolment.status}</p>
                                        </Typography>
                                    </Box>
                            </Grid>


                            <Grid  sx={{mr:3, mb:3}} item lg={2} md={3} sm={3} xs={12}>
                                <Box>
                                    <Typography color="typography.blue" gutterBottom variant="h6" component="div">
                                        <p>Date</p>
                                    </Typography>
                                    <Typography color="typography.primary" gutterBottom variant="h5" component="div">
                                        <p>{enrolment.date}</p>
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography color="typography.blue" gutterBottom variant="h6" component="div">
                                        <p>Time</p>    
                                    </Typography>
                                    <Typography color="typography.primary" gutterBottom variant="h5" component="div">
                                        <p>{enrolment.time}</p>
                                    </Typography>
                                </Box>
                            </Grid>
                            
                           
                            
                        </Grid> 

                        <Grid>
                            
                        <Button 
                            startIcon={<EditIcon />} 
                            component={Link}
                            to={`/enrolments/${id}/edit`}
                        >
                         Edit
                        </Button>

                        </Grid>                   
                            
                </Grid>

                
                    
     
                
           </Container>
        </ThemeProvider>  
        </>
        )

};

export default Show;