import { createTheme } from "@mui/material";

const customtheme = createTheme({
    palette: {
        primary: {
            main: '#0971F1',
            secondary: '#053e85',
        },
        background: {
          default:'#1e2024',  //primary background
          primary:'#1e2024',
          secondary: '#232529',   //secondary background color
          white: "#f7f7f7",   //white
          blue: '#1892ed',
          lightBlue: '#38a9ff',
          red: 'f52a59',
          darkRed: 'f52a59'   
        },
        customCard: {
            white: "#f7f7f7",
            light: "#b9b9c7",
            blue: "#4d61f7",
          },
        typography: {
          main: '#f7f7f7',
          white: "#f7f7f7",
          blue: '#1892ed',
          lightBlue: '#38a9ff',
          red: 'f52a59',
          darkRed: 'f52a59'
        },  

      },
      
      
    });

/* https://coolors.co/1e2024 */

export default customtheme

