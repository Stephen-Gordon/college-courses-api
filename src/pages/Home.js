import { useEffect, useState } from "react";

import LoginForm from "../components/auth/LoginForm";

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Container } from "@mui/system";

import CoursesIndex from './courses/Index'
import LecturersIndex from './lecturers/Index'
import EnrolmentsIndex from './enrolments/Index'

const Home = (props) => {


 

 

  if (props.authenticated){
    return (
      <>
      <Container maxWidth="xl">
      <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={props.value}>
                
                <TabPanel value={0}><CoursesIndex/></TabPanel>
                <TabPanel value={1}><LecturersIndex/></TabPanel>
                <TabPanel value={2}><EnrolmentsIndex/></TabPanel>
            </TabContext>
          </Box>
      </Container>

          
      </>
    );
}else {
  return (
    <>  
      <LoginForm authenticated={props.authenticated} onAuthenticated={props.onAuthenticated}/>
    </>
  );
  
}
  
}

export default Home;
