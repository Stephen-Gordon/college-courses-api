//React Hooks
import { useEffect, useState } from 'react';

//Axios
import axios from '../../config/api'

//Router
import { useNavigate, Link } from 'react-router-dom';

//Components
import StripedDataGrid from '../../components/StripedDataGrid';
import Create from './Create';

//mui
import { Box, ThemeProvider } from '@mui/system';
import {Button, Typography, Grid, Container} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import theme from '../../theme'
import AddIcon from '@mui/icons-material/Add';
import { ConstructionOutlined } from '@mui/icons-material';

const linkStyle = {
    textDecoration: "none",
    color: '#1892ed'
  };

const Index = ( props) => {
    const navigate = useNavigate();
    let token = localStorage.getItem('token')

    const [enrolments, setEnrolments] = useState(null);

    useEffect(() => {
        axios.get('/enrolments', {
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
        .then((response) => {
            setEnrolments(response.data.data)
        })
        .catch((err) => {
            console.error(err)
        });
    }, [token])

   
 
      const columns = [
        { field: 'id', headerName: 'ID', flex: 1, hide: true},
        { field: 'course_id', headerName: 'Course',  flex: 1,},
        { field: 'lecturer_id', headerName: 'Lecturer',  flex: 1},
        { field: 'status', headerName: 'Status',  flex: 1},
      ];


    let rows = [];

    if (enrolments){
        for (let i = 0; i < enrolments?.length; i++) {
            rows.push( { 
                id: enrolments[i]?.id,
                course_id: enrolments[i]?.course?.title,
                lecturer_id: enrolments[i]?.lecturer?.name,
                status: enrolments[i]?.status})      
       }
    }
    


    const rowClick = (e) => {
       navigate(`/enrolments/${e.id}`)
    }

    //Modal
    const [addButton, setAddButton] = useState(false);
    

    let html = (
        <>
            <Button sx={{p:1, color: 'typography.white', border: 'none', borderRadius: '12px', background: `linear-gradient(45deg, #1892ed, #f52a59)` }}  onClick={() => {setAddButton(true)}}>
                Add an enrolment
            </Button>
        </>
    )

    if(addButton === true){

        html = (
            <>
                <Create setAddButton={setAddButton}/>
            </>
        )

    }

    if(!enrolments) return <h3>Loading</h3>

    return (
        <>
        <ThemeProvider theme={theme}>
             <Container maxWidth="xl">

             {html}
                
                <Box sx={{ height: 400, width: '100%' }}>
                <StripedDataGrid
                      getRowClassName={(params) =>
                        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                      }
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    onRowClick={rowClick}
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

export default Index;