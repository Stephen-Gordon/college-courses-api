//React Hooks
import { useEffect, useState } from 'react';

//Axios
import axios from 'axios'

//Router
import { Link } from 'react-router-dom';


//mui
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

const handleChange = (e) => {
    console.log(e.target.value)
}
    const ODD_OPACITY = 0.2;
    
    const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
        [`& .${gridClasses.row}`]: {
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
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'courseTitle', headerName: 'Title',  width: 200},
        { field: 'code', headerName: 'code',  width: 100}
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
                
            </Box>
            </ThemeProvider>
        </>
    )
 


 
};

export default Index;