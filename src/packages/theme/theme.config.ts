import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const lightTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  })
);

const darkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#90caf9',
      },
      secondary: {
        main: '#f48fb1',
      },
      background: {
        default: '#121212',
        paper: '#1e1e1e',
      },
    },
  })
);

export { lightTheme, darkTheme };
