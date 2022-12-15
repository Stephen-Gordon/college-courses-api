//React Hooks
import { useEffect, useState } from 'react';

//Axios
import axios from '../../config/api'

//Router
import { useNavigate, Link } from 'react-router-dom';

//Components
import StripedDataGrid from '../../components/StripedDataGrid';
import Create from './Create';
import Loading from '../../components/Loading';
//motion
import { motion } from "framer-motion";


//mui
import { Box, ThemeProvider } from '@mui/system';
import {Button, Typography, Grid, Container} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import theme from '../../theme'
import AddIcon from '@mui/icons-material/Add';
import { ConstructionOutlined } from '@mui/icons-material';
import Delete from './Delete'
import DeleteIcon from '@mui/icons-material/Delete';


const linkStyle = {
    textDecoration: "none",
    color: '#1892ed'
  };

const Index = ( props) => {
    const navigate = useNavigate();
    let token = localStorage.getItem('token')

    const [enrolments, setEnrolments] = useState(null);

    useEffect(() => {
        axios.get('/enrolments', {
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
        .then((response) => {
            setEnrolments(response.data.data)
        })
        .catch((err) => {
            console.error(err)
        });
    }, [token])



    const deleteCallback = (id) => {
        console.log("updating enrolment list")
        let updatedEnrolments = enrolments.filter(enrolment => {
           return enrolment.id !== id;
        });

        setEnrolments(updatedEnrolments);  
        console.log("enrolment " +`${id}`+ " deleted")
   };
   
 
      const columns = [
        { field: 'id', headerName: 'ID', flex: 1,
        renderCell: (params) => {
            return  <Link  
            style={linkStyle}

           component={Link}
           to={`/enrolments/${params.row.id}`}
          
         >
            {params.row.id}
         </Link>

        }},
        { field: 'course_id', headerName: 'Course',  flex: 1,},
        { field: 'lecturer_id', headerName: 'Lecturer',  flex: 1},
        { field: 'status', headerName: 'Status',  flex: 1},
        { 
            field: '', 
            headerName: '', 
            flex: 1,
            sortable: false,
            renderCell: (params) => {
                return  <Button 
                startIcon={<EditIcon />} 
                component={Link}
                to={`/enrolments/${params.row.id}/edit`}
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
                return  <Delete
                startIcon={<DeleteIcon />} 
                id={params.row.id} 
                resource="courses"
                deleteCallback={deleteCallback}
            />
            }
        }
      ];


    let rows = [];

    if (enrolments){
        for (let i = 0; i < enrolments?.length; i++) {
            rows.push( { 
                id: enrolments[i]?.id,
                course_id: enrolments[i]?.course?.title,
                lecturer_id: enrolments[i]?.lecturer?.name,
                status: enrolments[i]?.status})      
       }
    }
    
   

    const rowClick = (e) => {
       navigate(`/enrolments/${e.id}`)
    }


    const updateEnrolments = () => {
        axios.get('/enrolments/', {
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
        .then((response) => {
            setEnrolments(response.data.data)
        })
        .catch((err) => {
            console.error(err)
        });
    }

    //Modal
    const [addButton, setAddButton] = useState(false);
    

    let html = (
        <>
            <Button sx={{p:1, color: 'typography.white', border: 'none', borderRadius: '12px', background: `linear-gradient(45deg, #1892ed, #f52a59)` }}  onClick={() => {setAddButton(true)}}>
                Add an enrolment
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
                <Create updateEnrolments={updateEnrolments} setAddButton={setAddButton}/>
            </motion.div>
            </>
        )

    }

    if(!enrolments) return(
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
                
                <Box sx={{width: '100%' }}>
                <StripedDataGrid
                      getRowClassName={(params) =>
                        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                      }
                    rows={rows}
                    columns={columns}
                    pageSize={enrolments?.length}
                    rowsPerPageOptions={[enrolments?.length]}
                    autoHeight
                    //onRowClick={rowClick}
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
            </motion.div>
            </Container>
        </ThemeProvider>
        </>
    )

};

export default Index;