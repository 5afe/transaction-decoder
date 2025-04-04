import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
    root: {
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
        '@media (max-width: 768px)': {
            marginTop: '60px',
            padding: '16px',
            paddingBottom: '70px',
            minHeight: 'calc(100vh - 60px)',
            marginBottom: '60px',
        }
    },
    title: {
        fontFamily: 'DM Sans',
        fontWeight: 700,
        fontSize: '32px',
        lineHeight: '117%',
        letterSpacing: '0px',
        '@media (max-width: 768px)': {
            fontSize: '24px',
        }
    },
    textField: {
        width: '100%',
        '& .MuiOutlinedInput-root': {
            backgroundColor: 'var(--background-paper)',
            fontFamily: 'DM Sans',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '24px',
            letterSpacing: '0.15px'
        },
    },
    transactionData: {
        fontFamily: 'DM Sans',
        fontWeight: 700,
        fontSize: '20px',
        lineHeight: '130%',
        letterSpacing: '0.15px',
        '@media (max-width: 768px)': {
            fontSize: '18px',
        }
    },
    Box: {
        padding: 'var(--space-9)',
        gap: 'var(--space-6)',
        backgroundColor: 'var(--background-paper)',
        borderRadius: 'var(--raduis-2x)',
    },
    transactionDataSubtitle: {
        fontFamily: 'DM Sans',
        color: 'var(--text-secondary-color)',
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '22px',
        letterSpacing: '0.15px',
        verticalAlign: 'middle',
        '@media (max-width: 768px)': {
            fontSize: '14px',
        }
    },
    transactionDataContainer: {
        alignItems: 'center',
        gap: 'var(--space-6)',
        marginBottom: 'var(--space-6)'
    },
    transactionInput: {
        fontFamily: 'DM Sans',
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '24px',
        letterSpacing: '0.15px',
        color: 'var(--text-primary-color)'
    },
    transactionInputSubtitle: {
        fontFamily: 'DM Sans',
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: '20px',
        letterSpacing: '0.4px',
        color: 'var(--text-secondary-color)',
        verticalAlign: 'middle'
    },
    transactionInputContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '24px'
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-6)',
    },
    decodeButton: {
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
    },
    clearButton: {
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
    },
    placeholderText: {
        fontFamily: 'DM Sans',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '20px',
        letterSpacing: '0.17px',
        textAlign: 'center',
        padding: 'var(--space-6) 0',
        color: 'var(--text-secondary-color)'
    },
    footer: {
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
    },
    footerLink: {
        fontWeight: 700,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline'
        }
    }
}));