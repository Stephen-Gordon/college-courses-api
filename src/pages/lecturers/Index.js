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
import Delete from './Delete'
import DeleteIcon from '@mui/icons-material/Delete';

const linkStyle = {
    textDecoration: "none",
    color: '#1892ed'
  };

const Index = ( props) => {
    const navigate = useNavigate();
    let token = localStorage.getItem('token')

    const [lecturers, setLecturers] = useState(null);

    const [enrolmentChecker, setEnrolmentChecker] = useState(null)
    const [addButton, setAddButton] = useState(false);

    useEffect(() => {
        axios.get('/lecturers', {
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
    }, [token])

   
 
      const columns = [
        { field: 'id', headerName: 'ID', flex: 1, hide: true},
        { field: 'name', headerName: 'Lecturer Name',  flex: 1,
        renderCell: (params) => {
            return  <Link  
            style={linkStyle}

           component={Link}
           to={`/lecturers/${params.row.id}`}
          
         >
            {params.row.name}
         </Link>

        }},
        { field: 'status', headerName: 'status',  flex: 1},
        { field: 'address', headerName: 'address',  flex: 1},
        { field: 'phone', headerName: 'phone',  flex: 1},
        { 
            field: '', 
            headerName: '', 
            flex: 1,
            sortable: false,
            renderCell: (params) => {
                return   <Button 
                    startIcon={<EditIcon />} 
                    component={Link}
                    to={`/lecturers/${params.row.id}/edit`}
                >
                Edit
             </Button>

            }
        }, 
        { 
            field: '1', 
            headerName: '  ', 
            flex: 1,
            sortable: false,
            renderCell: (params) => {
                return  <Delete setEnrolmentChecker={setEnrolmentChecker}
                 startIcon={<DeleteIcon />} 
                id={params.row.id} 
                resource="courses"
                deleteCallback={deleteCallback}
            />

            }
        }
      ];


    let rows = [];

    if (lecturers){
        for (let i = 0; i < lecturers?.length; i++) {
            rows.push( { 
                id: lecturers[i]?.id,
                name: lecturers[i]?.name,
                address: lecturers[i]?.address,
                phone: lecturers[i]?.phone,
                status: lecturers[i]?.enrolments[0]?.status})      
       }
    }

    


    const deleteCallback = (id) => {
        console.log("updating lecturer list")
        let updatedLecturers = lecturers.filter(lecturer => {
           return lecturer.id !== id;
        });

        setLecturers(updatedLecturers);  
        console.log("Lecturer " +`${id}`+ " deleted")
   }; 

   let checkerHtml;
        
   if(enrolmentChecker === true){
    checkerHtml = (
        <Box sx={{color: theme.palette.typography.darkRed, mt:4, pb:3, borderBottom: '2px solid #494E58', borderRadius: '0px'}}>
            <Typography variant='h5'>
            This Lecturer has enrolments. Are you sure you want to delete it?
            Press delete again to delete this lecturer and its enrolments
            </Typography>
        </Box>
    )
   }



    let html = (
        <>
            <Button sx={{p:1, color: 'typography.white', border: 'none', borderRadius: '12px', background: `linear-gradient(45deg, #1892ed, #f52a59)` }}  onClick={() => {setAddButton(true)}}>
                Add a lecturer
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


    if(!lecturers) return <h3>There are no lecturers</h3>

    return (
        <>
        <ThemeProvider theme={theme}>
        <Container maxWidth="xl">

                {html}
                {checkerHtml}


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

export default Index;