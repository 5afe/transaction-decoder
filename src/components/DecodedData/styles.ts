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
        padding: "4px 16px 4px 16px",
        display: "block",
        wordBreak: "break-all",
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
        fontSize: '16px',
        fontWeight: 500,
        backgroundColor: '#E8E8E8',
        padding: '4px 8px',
        borderRadius: '4px',
        color: 'var(--primary-light-font-color)'
    },
    transactionLabel: {
        fontFamily: 'DM Mono',
        fontSize: '14px',
        fontWeight: 400,
        color: 'var(--text-primary-color)'
    }
}));