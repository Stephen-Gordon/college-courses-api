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


const linkStyle = {
    textDecoration: "none",
    color: '#1892ed'
  };

const Index = ( props) => {
    const navigate = useNavigate();
    let token = localStorage.getItem('token')

    const [lecturers, setLecturers] = useState(null);

    useEffect(() => {
        axios.get('/lecturers', {
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
        .then((response) => {
            setLecturers(response.data)
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
      ];


    let rows = [];

    if (lecturers){
        for (let i = 0; i < lecturers.data?.length; i++) {
            rows.push( { 
                id: lecturers.data[i]?.id,
                name: lecturers.data[i]?.name,
                address: lecturers.data[i]?.address,
                phone: lecturers.data[i]?.phone,
                status: lecturers.data[i]?.enrolments[0]?.status})      
       }
    }

    
    //Modal
    const [addButton, setAddButton] = useState(false);
    

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