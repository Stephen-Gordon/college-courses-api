//React Hooks
import { useEffect, useState } from 'react';

//Axios
import axios from '../../config/api'

//Router
import { useNavigate } from 'react-router-dom';

//Components
import StripedDataGrid from '../../components/StripedDataGrid';

//mui

import { Box, ThemeProvider } from '@mui/system';

import theme from '../../theme'
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
        { field: 'id', headerName: 'ID', flex: 1,  },
        { field: 'name', headerName: 'Name',  flex: 1},
        { field: 'status', headerName: 'Status',  flex: 1}
      ];


    let rows = [];

    if (lecturers){
        for (let i = 0; i < lecturers.data?.length; i++) {
            rows.push( { 
                id: lecturers.data[i]?.id,
                name: lecturers.data[i]?.name,
                status: lecturers.data[i]?.enrolments[0]?.status})      
       }
    }
    
    const rowClick = (data) => {
        console.log("Hi")
        console.log(data.id)
        navigate(`/lecturers/${data.id}`)
    }



    if(!lecturers) return <h3>There are no lecturers</h3>

    return (
        <>
        <ThemeProvider theme={theme}>
            <Box sx={{ height: 400, width: '100%' }}>
                <StripedDataGrid
                     getRowClassName={(params) =>
                        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                      }
                
                    onRowClick={rowClick}
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                    //onSelectionModelChange={handleChange}
                    experimentalFeatures={{ newEditingApi: true }}
                    sx={{
                        mt:5, 
                        color: theme.palette.typography.light,
                        ml: '15%',
                        border: 0,
                        borderColor: theme.palette.background.border,
                        
                    }}
                />
            </Box>
        </ThemeProvider>
        </>
    )

};

export default Index;