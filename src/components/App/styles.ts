import { styled } from '@mui/material/styles';
import { Box, Typography, TextField, Button, Link, Paper } from '@mui/material';

export const Root = styled('div')(({ theme }) => ({
    padding: "4px",
    width: '100%',
    maxWidth: '1076px',
    minHeight: 'calc(100vh - 120px)',
    marginTop: 60,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-6)',
    position: 'relative',
    paddingBottom: '20px',
    marginBottom: '0',
    [theme.breakpoints.down('md')]: {
        marginTop: 40,
        padding: '16px',
        paddingBottom: '20px',
        minHeight: 'calc(100vh - 60px)',
        marginBottom: '0',
    },
    '&.empty-state': {
        overflow: 'hidden',
        height: '100vh',
        minHeight: '100vh',
        maxHeight: '100vh',
    }
}));

export const StyledTextField = styled(TextField)(() => ({
    width: '100%',
    '& .MuiOutlinedInput-root': {
        backgroundColor: 'var(--background-paper)',
        fontFamily: 'DM Sans',
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '24px',
        letterSpacing: '0.15px'
    },
}));

export const TransactionData = styled(Typography)(({ theme }) => ({
    fontFamily: 'DM Sans',
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '130%',
    letterSpacing: '0.15px',
    [theme.breakpoints.down('md')]: {
        fontSize: '18px',
    }
}));

export const InputBox = styled(Box)(() => ({
    width: '475px',
    minHeight: '320px',
    height: '320px',
    gap: 'var(--space-6)',
    borderRadius: 'var(--raduis-2x)',
    paddingRight: 'var(--space-8)',
    paddingLeft: 'var(--space-8)',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
}));

export const TransactionDataSubtitle = styled(Typography)(({ theme }) => ({
    fontFamily: 'DM Sans',
    color: 'var(--text-secondary-color)',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '22px',
    letterSpacing: '0.15px',
    verticalAlign: 'middle',
    [theme.breakpoints.down('md')]: {
        fontSize: '14px',
    }
}));

export const TransactionDataContainer = styled(Box)(() => ({
    alignItems: 'center',
    gap: 'var(--space-2)',
}));

export const TransactionInputContainer = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

export const ButtonContainer = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-6)',
}));

export const DecodeButton = styled(Button)(() => ({
    width: '100%',
    height: '48px',
    borderRadius: 'var(--raduis-2x)',
    backgroundColor: 'var(--primary-main)',
    color: 'var(--text-contrast-color)',
    fontFamily: 'DM Sans',
    fontWeight: 700,
    fontSize: '14px',
    lineHeight: '26px',
    letterSpacing: '0.46px',
    textTransform: 'none',
    boxShadow: 'none',
    '&:hover': {
        backgroundColor: 'var(--button-primary-hover)',
        boxShadow: 'none'
    }
}));

export const ClearButton = styled(Button)(() => ({
    width: '100%',
    height: '48px',
    borderRadius: 'var(--raduis-2x)',
    backgroundColor: 'var(--background-white)',
    boxShadow: 'none',
    color: 'var(--text-primary-color)',
    fontFamily: 'DM Sans',
    fontWeight: 700,
    fontSize: '14px',
    lineHeight: '26px',
    letterSpacing: '0.46px',
    textTransform: 'none',
    '&:hover': {
        backgroundColor: 'var(--background-white)', 
        boxShadow: 'none'
    }
}));

export const PlaceholderText = styled(Typography)(() => ({
    fontFamily: 'DM Sans',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.17px',
    textAlign: 'center',
    color: 'var(--text-secondary-color)',
}));

export const Footer = styled(Typography)(() => ({
    width: 475,
    height: 76,
    paddingTop: 'var(--space-7)',
    paddingRight: 'var(--space-6)',
    paddingBottom: 'var(--space-7)',
    paddingLeft: 'var(--space-8)',
    fontFamily: 'DM Sans',
    textAlign: 'center',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '22px',
    letterSpacing: '0.15px',
    color: 'var(--text-secondary-color)',
    marginTop: 'auto',
    borderRadius: 'var(--raduis-2x)',
}));

export const FooterLink = styled(Link)(() => ({
    fontWeight: 400,
    color: 'var(--text-primary-color)',
    textDecoration: 'none',
    '&:hover': {
        textDecoration: 'underline'
    }
}));

export const Sidebar = styled(Paper)(({ theme }) => ({
    width: 475,
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
    borderRadius: 0,
    borderRight: `1px solid ${theme.palette.divider}`,
    overflowY: 'auto',
    backgroundColor: 'var(--background-paper)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'transform 0.3s ease',
    '.sidebar-content': {
        flex: 1,
        overflow: 'auto',
    },
    '&.sidebar-collapsed': {
        transform: 'translateX(-100%)',
    }
}));

export const SidebarHeader = styled(Box)(({}) => ({
    width: 475,
    height: 80,
    fontFamily: 'DM Sans',
    fontWeight: 700,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 'var(--radius-2x)',
    paddingTop: 'var(--space-7)',
    paddingRight: 'var(--space-6)',
    paddingBottom: 'var(--space-7)',
    paddingLeft: 'var(--space-8)',
}));

export const MainContent = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    padding: 'var(--space-6)',
    marginLeft: 475,
    marginTop: 0,
    paddingTop: 60,
    maxWidth: 'calc(100% - 475px)',
    transition: 'margin-left 0.3s ease, max-width 0.3s ease',
    [theme.breakpoints.down('md')]: {
        marginLeft: 60,
        maxWidth: 'calc(100% - 60px)',
    },
    '&.main-expanded': {
        marginLeft: 0,
        maxWidth: '100%',
    },
    '&.empty-state': {
        overflow: 'hidden',
        height: 'calc(100vh - 40px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
}));

export const SidebarToggle = styled(Box)(() => ({
  position: 'fixed',
  top: 20,
  left: 20,
  width: 40,
  height: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'var(--background-main)',
  borderRadius: 'var(--raduis-2x)',
  cursor: 'pointer',
  zIndex: 100,
  '&:hover': {
    opacity: 0.8,
  },
  '&:hover .tooltip': {
    visibility: 'visible',
    opacity: 1,
  },
}));

export const OutputBox = styled(Box)(() => ({
    width: '676px',
    height: 'auto',
    minHeight: 'min-content',
    backgroundColor: 'var(--background-paper)',
    borderRadius: 'var(--raduis-2x)',
    padding: 'var(--space-8)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-6)',
    overflow: 'visible',
    margin: '0 auto',
}));

export const LogoContainer = styled(Box)(({ theme }) => ({
  '& img': {
    [theme.breakpoints.up('xs')]: {
      filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'none',
    }
  }
}));

export const SidebarIconContainer = styled(Box)(() => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  width: 39,
  height: 39,
  borderRadius: 'var(--raduis-8x)',
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: 'var(--background-main)',
  },
  '&:hover .tooltip': {
    visibility: 'visible',
    opacity: 1,
  }
}));

export const Tooltip = styled(Box)(() => ({
  visibility: 'hidden',
  opacity: 0,
  position: 'absolute',
  bottom: '-24px',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: 'var(--primary-main)',
  color: 'var(--text-contrast-color)',
  width: '87px',
  height: '22px',
  borderRadius: '4px',
  paddingTop: 'var(--space-1)',
  paddingRight: 'var(--space-2)',
  paddingBottom: 'var(--space-1)',
  paddingLeft: 'var(--space-2)',
  whiteSpace: 'nowrap',
  transition: 'opacity 0.2s ease',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  fontFamily: 'DM Sans',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '14px',
  letterSpacing: '0px',
  verticalAlign: 'middle',
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
