//React Hooks
import { useEffect, useState } from 'react';

//Axios
import axios from '../../config/api'

//Router
import { useNavigate } from 'react-router-dom';
import StripedDataGrid from '../../components/StripedDataGrid';

//mui
import { Box, ThemeProvider } from '@mui/system';

import theme from '../../theme'
const Index = ( props) => {
    const navigate = useNavigate();
    let token = localStorage.getItem('token')

    const [courses, setCourses] = useState(null);

    useEffect(() => {
        axios.get('/courses/', {
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
        .then((response) => {
            setCourses(response.data)
        })
        .catch((err) => {
            console.error(err)
        });
    }, [token])

    
   
    
   
   
      
    const columns = [
        { field: 'id', headerName: 'ID', flex: 1,  },
        { field: 'courseTitle', headerName: 'Title',  flex: 1},
        { field: 'code', headerName: 'code',  flex: 1}
      ];


    let rows = [];

    if (courses){
        for (let i = 0; i < courses.data?.length; i++) {
            rows.push( { 
                id: courses.data[i]?.id,
                courseTitle: courses.data[i]?.title,
                code: courses.data[i]?.code})      
       }
    }
    
    const rowClick = (data) => {
        console.log("Hi")
        console.log(data.id)
        navigate(`/courses/${data.id}`)
    }



    if(!courses) return <h3>There are no courses</h3>

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
                        fontSize: '24px',
                        
                        
                      }}
                      
                    
                />
            </Box>
            
            </ThemeProvider>
        </>
    )
 


 
};

export default Index;