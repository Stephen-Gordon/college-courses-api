//React Hooks
import { useEffect, useState } from 'react';

//Axios
import axios from '../../config/api'

//Router
import { useNavigate, Link } from 'react-router-dom';

//components
import StripedDataGrid from '../../components/StripedDataGrid';

//mui
import { Box, ThemeProvider } from '@mui/system';
import {Button, Typography, Grid, Container} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import theme from '../../theme'
import Create from './Create';
import DeleteBtn from '../../components/DeleteBtn';


const Index = ( props) => {


    const navigate = useNavigate();
    let token = localStorage.getItem('token')

    const [courses, setCourses] = useState(null);


    const linkStyle = {
        textDecoration: "none",
        color: '#1892ed'
      };

    useEffect(() => {
        axios.get('/courses/', {
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
        .then((response) => {
            setCourses(response.data.data)
        })
        .catch((err) => {
            console.error(err)
        });
    }, [token])

    
   
    //Modal
    const [addButton, setAddButton] = useState(false);
    


    const deleteCallback = (id) => {
   
        console.log(courses)
        let updatedCourses = courses.filter(course => {
           return course.id !== id;
        });

        setCourses(updatedCourses); 
           
   }; 
      
    const columns = [
        { field: 'id', headerName: 'ID', flex: 1, hide: true},

        { field: 'courseTitle', headerName: 'Course Name',  flex: 1,
        renderCell: (params) => {
            return  <Link  
            style={linkStyle}

           component={Link}
           to={`/courses/${params.row.id}`}
          
         >
            {params.row.courseTitle}
         </Link>

        }},
        { field: 'code', headerName: 'code',  flex: 1},
        { field: 'level', headerName: 'Level',  flex: 1},
        { 
            field: '', 
            headerName: '', 
            flex: 1,
            sortable: false,
            renderCell: (params) => {
                return  <Button 
                startIcon={<EditIcon />} 
               component={Link}
               to={`/courses/${params.row.id}/edit`}
              
             >
                Edit
             </Button>

            }
        },
        { 
            field: '1', 
            headerName: '1', 
            flex: 1,
            sortable: false,
            renderCell: (params) => {
                return  <DeleteBtn 
                 startIcon={<DeleteIcon />} 
                id={params.row.id} 
                resource="courses"
                deleteCallback={deleteCallback}
            />

            }
        }
        
      ];


    let rows = [];

    if (courses){
        for (let i = 0; i < courses?.length; i++) {
            rows.push( { 
                id: courses[i]?.id,
                courseTitle: courses[i]?.title,
                level: courses[i]?.level,
                code: courses[i]?.code})      
       }
    }
    
    let html = (
        <>
            <Button sx={{p:1, color: 'typography.white', border: 'none', borderRadius: '12px', background: `linear-gradient(45deg, #1892ed, #f52a59)` }}  onClick={() => {setAddButton(true)}}>
                Add a course
            </Button>
        </>
    )

    if(addButton === true){

        html = (
            <>
                <Create/>
            </>
        )

    }

  

    if(!courses) return <h3>Loading</h3>

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