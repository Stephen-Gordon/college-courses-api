import { createTheme } from "@mui/material";

const customtheme = createTheme({
    palette: {
        primary: {
            main: '#0971f1',
            darker: '#053e85',
        },
        background: {
          paper: '#1f1f27', // your color
          default:'#13131b',
          white: "#FFFFFF",
        },
        customCard: {
            white: "#FFFFFF",
            light: "#b9b9c7",
            purple: "#4d61f7",
          },
          typography: {
            main: '#FFFFFF',
            white: "#FFFFFF",
          },  

      },
      
      
    });

/* https://coolors.co/1f1f27 */

export default customtheme

