import { styled } from '@mui/material/styles';
import { Box, Typography, TextField, Button, Link } from '@mui/material';

export const Root = styled('div')(({ theme }) => ({
    padding: "4px",
    width: '100%',
    maxWidth: '1076px',
    minHeight: 'calc(100vh - 120px)',
    marginTop: '120px',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-6)',
    position: 'relative',
    paddingBottom: '70px',
    marginBottom: '60px',
    [theme.breakpoints.down('md')]: {
        marginTop: '60px',
        padding: '16px',
        paddingBottom: '70px',
        minHeight: 'calc(100vh - 60px)',
        marginBottom: '60px',
    }
}));

export const Title = styled(Typography)(({ theme }) => ({
    fontFamily: 'DM Sans',
    fontWeight: 700,
    fontSize: '32px',
    lineHeight: '117%',
    letterSpacing: '0px',
    color: 'var(--text-primary-color)',
    [theme.breakpoints.down('md')]: {
        fontSize: '24px',
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

export const StyledBox = styled(Box)(() => ({
    padding: 'var(--space-9)',
    gap: 'var(--space-6)',
    backgroundColor: 'var(--background-paper)',
    borderRadius: 'var(--raduis-2x)',
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
    gap: 'var(--space-6)',
    marginBottom: 'var(--space-6)'
}));

export const TransactionInputSubtitle = styled(Typography)(() => ({
    fontFamily: 'DM Sans',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '20px',
    letterSpacing: '0.4px',
    color: 'var(--text-secondary-color)',
    verticalAlign: 'middle'
}));

export const TransactionInputContainer = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '24px'
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
    textTransform: 'none'
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
    }
}));

export const PlaceholderText = styled(Typography)(() => ({
    fontFamily: 'DM Sans',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.17px',
    textAlign: 'center',
    padding: 'var(--space-6) 0',
    color: 'var(--text-secondary-color)'
}));

export const Footer = styled(Typography)(() => ({
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '54px',
    padding: '16px 0',
    textAlign: 'center',
    fontFamily: 'DM Sans',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '22px',
    letterSpacing: '0.15px',
    color: 'var(--primary-light-font-color)',
    zIndex: 100
}));

export const FooterLink = styled(Link)(() => ({
    fontWeight: 700,
    textDecoration: 'none',
    '&:hover': {
        textDecoration: 'underline'
    }
}));
