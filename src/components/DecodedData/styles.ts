import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
    formControl: {
        margin: "0 0 16px 0",
        minWidth: 120,
        width: '100%',
        '& .MuiInputLabel-root': {
            fontSize: '14px',
            fontFamily: 'DM Sans',
        },
        '& .MuiSelect-select': {
            fontSize: '14px',
            fontFamily: 'DM Sans',
        }
    },
    selectEmpty: {
        marginTop: "4px",
    },
    values: {
        display: "block",
        wordBreak: "break-all",
        marginBottom: 'var(--space-6)',
    },

    showAllLink: {
        fontFamily: 'DM Sans',
        fontWeight: 700,
        fontSize: '14px',
        lineHeight: '20px',
        color: 'var(--text-link-color)',
        textDecoration: 'none',
        marginLeft: '8px',
        cursor: 'pointer'
    },

    functionLabel: {
        fontFamily: 'DM Mono',
        fontSize: '14px',
        fontWeight: 400,
        backgroundColor: 'var(--background-main)',
        padding: '2px 4px',
        borderRadius: '2px'
    },
    functionName: {
        fontFamily: 'DM Mono',
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: '22px',
        letterSpacing: '0px',
        backgroundColor: 'var(--function-name-bg)',
        padding: '4px 8px',
        borderRadius: '4px',
        color: 'var(--function-name-color)'
    },
    divider: {
        width: '446px',
        height: '1px',
        border: 'none',
        borderTop: '1px solid var(--light-border)',
        margin: '16px 0 var(--space-6) 0'
    },
    transactionLabel: {
        fontFamily: 'DM Mono',
        fontSize: '14px',
        fontWeight: 400,
        color: 'var(--text-primary-color)'
    },
    multisendDropdown: {
        width: '100%',
        minHeight: '56px',
        borderRadius: '6px',
        border: '1px solid var(--light-border)',
        backgroundColor: 'var(--background-paper)',
        marginBottom: '8px'
    },
    multisendContainer: {
        width: '100%',
        backgroundColor: 'var(--background-paper)',
        borderRadius: '6px',
        border: '1px solid var(--light-border)',
    },
    multisendHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px',
        cursor: 'pointer',
        backgroundColor: 'var(--background-main)',
        '&:hover': {
            backgroundColor: 'var(--background-hover)'
        }
    },
    multisendContent: {
        backgroundColor: 'var(--background-paper)',
        padding: '16px',
        borderTop: '1px solid var(--light-border)',
    },
    transactionsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    transactionItem: {
        backgroundColor: 'var(--background-paper)',
        borderRadius: '6px',
        border: '1px solid var(--light-border)',
    },
    transactionHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'var(--background-hover)'
        },
        '&.expanded': {
            backgroundColor: 'var(--background-main)'
        }
    },
    transactionContent: {
        padding: '24px',
        borderTop: '1px solid var(--light-border)',
        backgroundColor: 'var(--background-paper)',
    },
    paramRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '16px',
        '&.with-divider': {
            borderBottom: '1px solid var(--light-border)',
            paddingBottom: '16px'
        }
    },
    paramLabel: {
        color: 'var(--text-secondary-color)',
        fontFamily: 'DM Sans',
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: '20px',
        letterSpacing: '0.17px'
    },
    paramValue: {
        fontFamily: 'DM Sans',
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: '20px',
        color: 'var(--text-primary-color)',
        textAlign: 'right',
        maxWidth: '60%',
        wordBreak: 'break-all',
        letterSpacing: '0.17px'
    },
    textLabel: {
        fontFamily: 'DM Sans',
        fontWeight: 700,
        fontSize: '14px',
        lineHeight: '20px',
        letterSpacing: '0.1px'
    },
    signatureSection: {
        marginTop: '24px',
        borderTop: '1px solid var(--light-border)',
        paddingTop: '24px'
    },
    signatureLabel: {
        fontFamily: 'DM Sans',
        fontSize: '14px',
        fontWeight: 700,
        lineHeight: '20px',
        letterSpacing: '0.1px',
        marginBottom: '8px',
        color: 'var(--text-primary-color)'
    },
    signatureSelect: {
        width: '100%',
        height: '40px',
        border: '1px solid var(--light-border)',
        borderRadius: '6px',
        backgroundColor: 'var(--background-paper)',
        paddingRight: '12px',
        marginBottom: '16px',
        '& .MuiSelect-select': {
            fontFamily: 'DM Sans',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '24px',
            letterSpacing: '0.15px',
            verticalAlign: 'middle',
        }
    },
    signatureValue: {
        fontFamily: 'DM Sans',
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: '20px',
        letterSpacing: '0.17px',
        color: 'var(--text-primary-color)',
        wordBreak: 'break-all'
    }
}));