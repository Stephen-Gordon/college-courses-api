//React Hooks
import { useEffect, useState } from 'react';

//Axios
import axios from '../../config/api'

//Router
import { Link, useNavigate } from 'react-router-dom';


//mui
import { Toolbar } from '@mui/material';
import { Box, ThemeProvider } from '@mui/system';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { alpha, styled } from '@mui/material/styles';
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

    
    const ODD_OPACITY = 0.2;
    
    const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
        [`& .${gridClasses.row}`]: {
        '& .MuiDataGrid-columnsContainer, .MuiDataGrid-columnHeaders, .MuiDataGrid-cell, .MuiDataGrid-cell:focus-within': {
        outline: 'none',
        //border: 'none',
        borderTop: `0px solid ${theme.palette.background.border}`,
        borderBottom: `0px solid ${theme.palette.background.border}`,
        },
        borderRadius: '6px',
        marginBottom: 8,
        color: theme.palette.typography.white,
        '&:hover, &.Mui-hovered': {
            backgroundColor: alpha(theme.palette.background.border, ODD_OPACITY),
            '@media (hover: none)': {
            backgroundColor: 'transparent'
            },
        },
        '&.Mui-selected': {
            backgroundColor: alpha(
                theme.palette.background.border, ODD_OPACITY
            ),
            '&:hover, &.Mui-hovered': {
                
            backgroundColor: alpha(
                theme.palette.background.border,
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