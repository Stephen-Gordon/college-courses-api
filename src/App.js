//Hooks
import { useState, useEffect } from 'react';


//router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//MUI
import customtheme from './theme'
import { Grid, ThemeProvider, CssBaseline } from "@mui/material";


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
 
import EnrolementsIndex from './pages/enrolements/Index';
import EnrolementsShow from './pages/enrolements/Show';
import EnrolementsCreate from './pages/enrolements/Create';
import EnrolementsEdit from './pages/enrolements/Edit';
 

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

      <Route path='/enrolements/create' element={<EnrolementsCreate/>}/>
      <Route path='/enrolements/:id/edit' element={<EnrolementsEdit/>}/>
      <Route path='/enrolements/:id' element={<EnrolementsShow/>}/>
       
    </>
  )
}

  return (
    <ThemeProvider theme={customtheme}>
    <CssBaseline>
    <Router>
      <Navbar authenticated={authenticated}/>
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

            {/* ENROLEMENTS */}
            <Route path='/enrolements' element={<EnrolementsIndex authenticated={authenticated}/>}/>
            <Route path='/enrolements:id' element={<LecturersShow/>}/>

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
