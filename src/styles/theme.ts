import { createTheme } from '@mui/material/styles';

export const createAppTheme = (prefersDarkMode: boolean) => createTheme({
  palette: {
    mode: prefersDarkMode ? 'dark' : 'light',
    primary: {
      main: '#000000',
    },
    background: {
      default: 'var(--background-main)',
      paper: '#ffffff',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
}); 