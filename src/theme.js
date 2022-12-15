import { createTheme } from "@mui/material";

const customtheme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#232529'
        }
      }
    },
    MuiListItemButton: {
      defaultProps: {
        disableTouchRipple: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '16px',
          paddingTop: '8px',
          paddingBottom: '8px',
          paddingLeft: '16px',
          paddingRight: '16px',
          fontWeight: '500'
        }
      }
    }
  },
  typography: {
    allVariants: {
      fontFamily: [
        'Inter',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  },
    palette: {
        primary: {
            main: '#0971F1',
            secondary: '#053e85',
        },
        background: {
          default:'#1e2024',  //primary background
          primary:'#1e2024',
          secondary: '#232529',
          form: '#31343A',   //secondary background color
          white: "#f7f7f7",   //white
          light: "#edeff4",
          blue: '#1892ed',
          lightBlue: '#38a9ff',
          red: '#f52a59',
          darkRed: '#f52a59',
          border: '#494E58'
        },
        customCard: {
            white: "#1e2024",
            light: "#b9b9c7",
            blue: "#4d61f7",
          },
        typography: {
          primary: '#EEEFF1',
          white: "#EEEFF1",
          secondary: '#bfc0c2',
          blue: '#1892ed',
          lightBlue: '#38a9ff',
          red: '#f52a59',
          darkRed: '#f52a59',
          pink: '#f0556b'
        }
      },
      
      
    });

/* https://coolors.co/1e2024 */
/* pink f0556b */
export default customtheme

