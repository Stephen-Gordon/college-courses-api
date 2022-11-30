//React Hooks
import { useEffect, useState } from 'react';

//Axios
import axios from 'axios'

//Router
import { Link } from 'react-router-dom';


//mui
import { Toolbar } from '@mui/material';
import { Box, ThemeProvider } from '@mui/system';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { alpha, styled } from '@mui/material/styles';
import theme from '../../theme'
const Index = ( props) => {

    let token = localStorage.getItem('token')

    const [courses, setCourses] = useState(null);

    useEffect(() => {
        axios.get('https://college-api-mo.herokuapp.com/api/courses', {
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

    const handleChange = (data) => {
        
        console.log(data)
    }
    const ODD_OPACITY = 0.2;
    
    const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
        [`& .${gridClasses.row}`]: {
        '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
            borderBottom: `1px solid ${theme.palette.background.border}` ,
            },
        backgroundColor: theme.palette.background.secondary,
        color: theme.palette.typography.white,
        '&:hover, &.Mui-hovered': {
            backgroundColor: alpha(theme.palette.background.secondary, ODD_OPACITY),
            '@media (hover: none)': {
            backgroundColor: 'transparent',
            },
        },
        '&.Mui-selected': {
            backgroundColor: alpha(
            theme.palette.background.secondary,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
            ),
            '&:hover, &.Mui-hovered': {
            backgroundColor: alpha(
                theme.palette.background.secondary,
                ODD_OPACITY +
                theme.palette.action.selectedOpacity +
                theme.palette.action.hoverOpacity,
            ),
            
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
                backgroundColor: alpha(
                theme.palette.background.secondary,
                ODD_OPACITY + theme.palette.action.selectedOpacity,
                ),
            },
            },
        },
        },
    }));


    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'courseTitle', headerName: 'Title',  flex: 1},
        { field: 'code', headerName: 'code',  flex: 1}
      ];


    let rows = [];

    if (courses){
        for (let i = 0; i < courses.data?.length; i++) {
            rows.push( { id: courses.data[i]?.id, courseTitle: courses.data[i]?.title, code: courses.data[i]?.code})      
       }
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
                      
                  
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                    onSelectionModelChange={handleChange}
                    experimentalFeatures={{ newEditingApi: true }}
                    sx={{
                        mt:5, 
                        color: theme.palette.typography.light,
                        ml: '15%',
                        border: 1,
                        borderColor: theme.palette.background.border,
                        
                      }}
                      
                    
                />
            </Box>
            
            </ThemeProvider>
        </>
    )
 


 
};

export default Index;