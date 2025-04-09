import { createTheme } from '@mui/material/styles';

export const createAppTheme = (prefersDarkMode: boolean) => createTheme({
  palette: {
    mode: prefersDarkMode ? 'dark' : 'light',
    primary: {
      main: prefersDarkMode ? '#ffffff' : '#000000',
    },
    background: {
      default: 'var(--background-main)',
      paper: 'var(--background-paper)',
    },
  },
  typography: {
    fontFamily: 'DM Sans, sans-serif',
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
    },
  },
}); 