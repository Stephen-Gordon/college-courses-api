//Hooks
import { useState, useEffect } from 'react';


//router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//MUI
import customtheme from './theme'
import { Container, ThemeProvider, CssBaseline } from "@mui/material";


//PAGES
import Home from './pages/Home';
import FestivalsIndex from './pages/festivals/Index';
import FestivalsShow from './pages/festivals/Show';
import FestivalCreate from './pages/festivals/Create';
import FestivalsEdit from './pages/festivals/Edit';

import PageNotFound from './pages/PageNotFound';
//COMPONENTS
import Navbar from './components/Navbar';
import './assets/css/app.css'



const App = () => {

//Authentication
const [authenticated, setAuthenticated] = useState(false)  

let protectedFestivals;


useEffect(()=> {
  if(localStorage.getItem('token')){
    setAuthenticated(true)
  }
}, [])

//const auth = false
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
  protectedFestivals = (
    <>
    <Route path='/festivals/create' element={<FestivalCreate/>}/>
    <Route path='/festivals:id/edit' element={<FestivalsEdit/>}/>
    <Route path='/festivals:id' element={<FestivalsShow/>}/>
      
    </>
  )
}

  return (
    <ThemeProvider theme={customtheme}>
    <CssBaseline>
    <Router>
      <Navbar authenticated={authenticated}/>
        <Container>
          
          <Routes>
            <Route path='/' element={<Home authenticated={authenticated} onAuthenticated={onAuthenticated}/>}/>
            <Route path='/festivals' element={<FestivalsIndex authenticated={authenticated}/>}/>
            {protectedFestivals}

          <Route path='*' element={<PageNotFound/>}/>

          </Routes>
        </Container>
        
      </Router>
    </CssBaseline>
  </ThemeProvider>
  );
}

export default App;
