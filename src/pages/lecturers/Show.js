import axios from '../../config/api'
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

//MUI
import { Box, Typography, Container, ThemeProvider, Grid } from '@mui/material';

//Components
import StripedDataGrid from '../../components/StripedDataGrid';

//THEME
import theme from '../../theme'
const Show = () => {
const { id } = useParams();
const [lecturer, setLecturer] = useState(null)

let token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(`/lecturers/${id}`, {
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log(response.data)
            setLecturer(response.data.data)
        })
        .catch((err) => {
            console.error(err)
        });
    }, [id, token])


    let rows = [];

    if (lecturer){
        for (let i = 0; i < lecturer.enrolments?.length; i++) {
           console.log(lecturer.enrolments[0]?.lecturer.name)
           rows.push( { 
            id: lecturer.enrolments[i]?.lecturer.id,
            name: lecturer.enrolments[i]?.lecturer.name,
            address: lecturer.enrolments[i]?.lecturer.address,
            email: lecturer.enrolments[i]?.lecturer.email,
            phone: lecturer.enrolments[i]?.lecturer.phone,
            
        })      
    }}


    const columns = [
        { field: 'id', headerName: 'id', flex: 1, hide: true    },
        { field: 'name', headerName: 'name', flex: 1,},
        { field: 'address', headerName: 'address',  flex: 1},
        { field: 'email', headerName: 'email',  flex: 1},
        { field: 'phone', headerName: 'phone',  flex: 1},
       
      ];


    if(!lecturer) return <h3>no lecturer</h3>
   
    return(
        
        <>
        <ThemeProvider theme={theme}>
           <Container maxWidth="xl">
            
            <Box sx={{ pr:5, pt:5, mb:5,  gridArea: 'header' }}>              
                <Typography color="typography.white" gutterBottom variant="h3" component="div">
                    {lecturer.name}
                </Typography>
            </Box>
                

                <Grid container column={12}  sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            
                        <Grid sx={{pl:5, mt:3, mb:5, borderLeft: '2px solid #494E58'}} item lg={12} md={12} sm={12} xs={12} >
                        
                            <Box>
                                
                                <Typography color="typography.blue" gutterBottom variant="h6" component="div">
                                    <p>email</p>
                                </Typography>
                                <Typography color="typography.primary" gutterBottom variant="h5" component="div">
                                    <p>{lecturer.email}</p>
                                </Typography>
                            </Box>

                           <Box  sx={{display: 'flex'}}>
                           <Box>
                                <Typography color="typography.blue" gutterBottom variant="h6" component="div">
                                    <p>address</p>
                                </Typography>
                                <Typography color="typography.primary" gutterBottom variant="h5" component="div">
                                    <p>{lecturer.address}</p>
                                </Typography>
                            </Box>
                            <Box sx={{pl:5}}>
                                <Typography color="typography.blue" gutterBottom variant="h6" component="div">
                                    <p>phone</p>    
                                </Typography>
                                <Typography color="typography.primary" gutterBottom variant="h5" component="div">
                                    <p>{lecturer.phone}</p>
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