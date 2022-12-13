import { useState } from "react";

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
  
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (props.authenticated){
    return (
      <>
      <Container maxWidth="xl">
      <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab sx={{color: 'f52a59'}} textColor='#f52a59' label="Courses" value="1" />
                    <Tab label="Lecturers" value="2" />
                    <Tab label="enrolments" value="3" />
                  </TabList>
                </Box>
                <TabPanel value="1"><CoursesIndex/></TabPanel>
                <TabPanel value="2"><LecturersIndex/></TabPanel>
                <TabPanel value="3"><EnrolmentsIndex/></TabPanel>
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
