import axios from '../../config/api'
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

//MUI
import { Box, Typography, Container, ThemeProvider, Grid } from '@mui/material';

//Components
import StripedDataGrid from '../../components/StripedDataGrid';
import AnimatedGradientText from '../../components/AnimatedGradientText'
//THEME
import theme from '../../theme'
const Show = () => {
const { id } = useParams();
const [course, setCourse] = useState(null)

let token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(`/courses/${id}`, {
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log(response.data)
            setCourse(response.data.data)
        })
        .catch((err) => {
            console.error(err)
        });
    }, [id, token])


    let rows = [];

    if (course){
        for (let i = 0; i < course.enrolments?.length; i++) {
           console.log(course.enrolments[0]?.lecturer.name)
           rows.push( { 
            id: course.enrolments[i]?.lecturer.id,
            name: course.enrolments[i]?.lecturer.name,
            address: course.enrolments[i]?.lecturer.address,
            email: course.enrolments[i]?.lecturer.email,
            phone: course.enrolments[i]?.lecturer.phone,
            
        })      
    }}


    const columns = [
        { field: 'id', headerName: 'id', flex: 1, hide: true    },
        { field: 'name', headerName: 'name', flex: 1,},
        { field: 'address', headerName: 'address',  flex: 1},
        { field: 'email', headerName: 'email',  flex: 1},
        { field: 'phone', headerName: 'phone',  flex: 1},
       
      ];


    if(!course) return <h3>no course</h3>
   
    return(
        
        <>
        <ThemeProvider theme={theme}>
           <Container maxWidth="xl">
            
            <Box sx={{ pr:5, pt:5, mb:5,  gridArea: 'header' }}>              
                <Typography color="typography.white" gutterBottom variant="h3" component="div">
                    {course.title}
                </Typography>
            </Box>
                

                <Grid container column={12}  sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            
                        <Grid sx={{pl:5, mt:3, mb:5, borderLeft: '2px solid #494E58'}} item lg={12} md={12} sm={12} xs={12} >
                        
                            <Box>
                                
                                <Typography color="typography.blue" gutterBottom variant="h6" component="div">
                                    <p>Description</p>
                                </Typography>
                                <Typography color="typography.primary" gutterBottom variant="h5" component="div">
                                    <p>{course.description}</p>
                                </Typography>
                            </Box>

                           <Box  sx={{display: 'flex'}}>
                           <Box>
                                <Typography color="typography.blue" gutterBottom variant="h6" component="div">
                                    <p>Points</p>
                                </Typography>
                                <Typography color="typography.primary" gutterBottom variant="h5" component="div">
                                    <p>{course.points}</p>
                                </Typography>
                            </Box>
                            <Box sx={{pl:5}}>
                                <Typography color="typography.blue" gutterBottom variant="h6" component="div">
                                    <p>Level</p>    
                                </Typography>
                                <Typography color="typography.primary" gutterBottom variant="h5" component="div">
                                    <p>{course.level}</p>
                                </Typography>
                            </Box>
                           </Box>
                            
                        </Grid>                    
                            
                </Grid>

                
                        
                            <Box>
                                <Typography color="typography.blue" gutterBottom variant="h6" component="div">
                                    <p>Enrolments</p>
                                </Typography>
                            </Box>

                            <Box sx={{ height: 400, width: '100%' }}>
                
                                <StripedDataGrid
                                    getRowClassName={(params) =>
                                        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                                    }
                                    rows={rows}
                                    columns={columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                    
                                    disableSelectionOnClick
                                    experimentalFeatures={{ newEditingApi: true }}
                                    sx={{
                                        mt:5, 
                                        color: theme.palette.typography.light,
                                        border: 2,
                                        borderRadius: '12px',
                                        borderColor: theme.palette.background.border,
                                    }}
                                    
                                />
                            </Box>
     
                
           </Container>
        </ThemeProvider>  
        </>
        )

};

export default Show;