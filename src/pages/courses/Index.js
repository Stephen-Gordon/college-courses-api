//React Hooks
import { useEffect, useState } from 'react';

//Axios
import axios from '../../config/api'

//Router
import { useNavigate, Link } from 'react-router-dom';

//components
import StripedDataGrid from '../../components/StripedDataGrid';
import Loading from '../../components/Loading';
//motion
import { motion } from "framer-motion";

//mui
import { Box, ThemeProvider } from '@mui/system';
import {Button, Typography, Grid, Container} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import theme from '../../theme'
import Create from './Create';
import Delete from './Delete';

const linkStyle = {
    textDecoration: "none",
    color: '#1892ed',
    
};


const Index = (props) => {


    const navigate = useNavigate();
    let token = localStorage.getItem('token')

    const [courses, setCourses] = useState(null);
    const [enrolmentChecker, setEnrolmentChecker] = useState(null)
    const [addButton, setAddButton] = useState(false);
    

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


    const deleteCallback = (id) => {
        console.log("updating course list")
        
        let updatedCourses = courses.filter(course => {
           return course.id !== id;
        });

        setCourses(updatedCourses);  
        console.log("Course " +`${id}`+ " deleted")
           
   }; 
      

      
   
        let checkerHtml;
        
        if(enrolmentChecker === true){
            checkerHtml = (
                <Box sx={{color: theme.palette.typography.darkRed, mt:4, pb:3, borderBottom: '2px solid #494E58', borderRadius: '0px'}}>
                    <Typography variant='h5'>
                    This course has enrolments. Are you sure you want to delete it?
                    Press delete again to delete this course and its enrolments
                    </Typography>
                </Box>
            )
        }
        
   
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

    if (courses){
        for (let i = 0; i < courses?.length; i++) {
            rows.push( { 
                id: courses[i]?.id,
                courseTitle: courses[i]?.title,
                level: courses[i]?.level,
                code: courses[i]?.code})      
       }
    }
    
    

    const updateCourses = () => {
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
             <motion.div
            
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 0, opacity: 0 }}
            transition={{
            type: "spring",
            stiffness: 100,
            damping: 20
            }}
            >

            <Create updateCourses={updateCourses} setAddButton={setAddButton}/>
        </motion.div>
                
            </>
        )

    }

    
  

    if(!courses) return(
        <Container 
        maxWidth="xl"
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}>
            <Loading/>
        </Container>
    )

    return (
        <>
        <ThemeProvider theme={theme}>

   
        <Container maxWidth="xl">
        <motion.div
            
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 0, opacity: 0 }}
            transition={{
            type: "spring",
            stiffness: 100,
            damping: 20
            }}
            >
            
            {html}
            {checkerHtml}


            <Box sx={{ height: 400, width: '100%' }}>
                
                
                <StripedDataGrid
                    getRowClassName={(params) =>
                        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                    }
                    rows={rows}
                    columns={columns}
                    pageSize={courses?.length}
                    rowsPerPageOptions={[courses?.length]}
                    autoHeight
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    sx={{
                        
                        fontWeight: '500px',
                        mt:5, 
                        color: theme.palette.typography.light,
                        border: 2,
                        borderRadius: '12px',
                        borderColor: theme.palette.background.border,
                      }}
                />
            </Box>
            </motion.div>
        </Container>

        </ThemeProvider>
        </>
    )
 


 
};

export default Index;