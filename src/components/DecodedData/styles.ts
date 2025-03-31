import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
    formControl: {
        margin: "4px",
        minWidth: 120,
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
        letterSpacing: '0.17px',
        color: 'var(--text-link-color)',
        textDecoration: 'underline',
        textDecorationStyle: 'solid',
        textDecorationThickness: '0%',
        textUnderlineOffset: '0%'
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
        backgroundColor: '#E8E8E8',
        padding: '4px 8px',
        borderRadius: '4px',
        color: 'var(--primary-light-font-color)'
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
        width: '446px',
        height: '56px',
        borderRadius: '6px',
        border: '1px solid var(--light-border)',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '16px',
        marginBottom: 'var(--space-6)'
    },
    textLabel: {
        fontFamily: 'DM Sans',
        fontWeight: 700,
        fontSize: '14px',
        lineHeight: '20px',
        letterSpacing: '0.1px'
    },
    decodedParamContainer: {
        marginBottom: 'var(--space-6)'
    }
}));