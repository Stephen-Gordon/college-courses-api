//React Hooks
import { useEffect, useState } from 'react';

//Axios
import axios from 'axios'

//Router
import { Link } from 'react-router-dom';


//mui
import { Box } from '@mui/system';
import { DataGrid} from '@mui/x-data-grid';


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
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                />
            </Box>

        </>
    )
 


 
};

export default Index;