import { createTheme } from '@mui/material/styles';

// Definindo o tema personalizado
const theme = createTheme({

  breakpoints: { 
    values: { 
      xs: 0, // Extra small devices (phones) 
      sm: 600, // Small devices (tablets) 
      md: 960, // Medium devices (desktops) 
      lg: 1280, // Large devices (large desktops) 
      xl: 1920, // Extra large devices (extra large desktops) 
    }, 
  },  
});

export { theme };