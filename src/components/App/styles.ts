import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
    root: {
        padding: "4px",
        width: '1076px',
        height: '612px',
        marginTop: '120px',
        marginLeft: '182px',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-6)'
    },
    title: {
        fontFamily: 'DM Sans',
        fontWeight: 700,
        fontSize: '32px',
        lineHeight: '117%',
        letterSpacing: '0px'
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
        letterSpacing: '0.15px'
    },

    inputBox: {
        padding: 'var(--space-9)',
        backgroundColor: 'var(--background-paper)',
        borderRadius: 'var(--raduis-2x)',
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
    },
    transactionDataSubtitle: {
        fontFamily: 'DM Sans',
        color: 'var(--text-secondary-color)',
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '22px',
        letterSpacing: '0.15px',
        verticalAlign: 'middle'
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
    }
}));