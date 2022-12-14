//Hooks
import { useState, useEffect } from 'react';


//router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//MUI
import theme from './theme'
import { Box, Grid, ThemeProvider, CssBaseline } from "@mui/material";


//PAGES
import Home from './pages/Home';

  
import CoursesIndex from './pages/courses/Index';
import CoursesShow from './pages/courses/Show';
import CoursesCreate from './pages/courses/Create';
import CoursesEdit from './pages/courses/Edit';

import LecturersIndex from './pages/lecturers/Index';
import LecturersShow from './pages/lecturers/Show';
import LecturersCreate from './pages/lecturers/Create';
import LecturersEdit from './pages/lecturers/Edit';
 
import EnrolmentsIndex from './pages/enrolments/Index';
import EnrolmentsShow from './pages/enrolments/Show';
import EnrolmentsCreate from './pages/enrolments/Create';
import EnrolmentsEdit from './pages/enrolments/Edit';
 

import PageNotFound from './pages/PageNotFound';



//COMPONENTS
import Navbar from './components/Navbar';
import './assets/css/app.css'
import LoginForm from './components/auth/LoginForm';
import Register from './components/auth/Register';


const App = () => {

//Authentication
const [authenticated, setAuthenticated] = useState(false)  

let protectedRoutes;


useEffect(()=> {
  if(localStorage.getItem('token')){
    setAuthenticated(true)
  }
}, [])


const onAuthenticated = (auth, token) => {
  setAuthenticated(auth);
  if(auth){
    localStorage.setItem('token', token)
  }
  else{
    localStorage.removeItem('token')
  }
};

if(authenticated){
  protectedRoutes = (
    <>

      <Route path='/courses/create' element={<CoursesCreate/>}/>
      <Route path='/courses/:id/edit' element={<CoursesEdit/>}/>
      <Route path='/courses/:id' element={<CoursesShow/>}/>
      

      <Route path='/lecturers/create' element={<LecturersCreate/>}/>
      <Route path='/lecturers/:id/edit' element={<LecturersEdit/>}/>
      <Route path='/lecturers/:id' element={<LecturersShow/>}/>

      <Route path='/enrolments/create' element={<EnrolmentsCreate/>}/>
      <Route path='/enrolments/:id/edit' element={<EnrolmentsEdit/>}/>
      <Route path='/enrolments/:id' element={<EnrolmentsShow/>}/>
       
    </>
  )
}

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline>
    <Router>
     {/*  <Navbar authenticated={authenticated}/> */}
        <Grid>
         
          <Routes>


          {/* HOME */}
          <Route path='/' element={<Home authenticated={authenticated} onAuthenticated={onAuthenticated}/>}/>


          {/* AUTH */}
          <Route path='/login' element={<LoginForm authenticated={authenticated} onAuthenticated={onAuthenticated}/>}/>
          <Route path='/register' element={<Register authenticated={authenticated} onAuthenticated={onAuthenticated}/>}/>


          {/* COURSES */}
          <Route path='/courses' element={<CoursesIndex authenticated={authenticated}/>}/>


          {/* LECTURERS */}
          <Route path='/lecturers' element={<LecturersIndex authenticated={authenticated}/>}/>
          <Route path='/lecturers:id' element={<LecturersShow/>}/>

          {/* ENROLMENTS */}
          <Route path='/enrolments' element={<EnrolmentsIndex authenticated={authenticated}/>}/>
          <Route path='/enrolments:id' element={<EnrolmentsShow/>}/>

          {/* PROTECTED */}
          {protectedRoutes}

          {/* <Route path='*' element={<PageNotFound/>}/> */}





          </Routes>
      
        </Grid>
        
      </Router>
    </CssBaseline>
  </ThemeProvider>
  );
}

export default App;
