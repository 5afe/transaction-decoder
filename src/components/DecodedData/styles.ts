import { styled } from '@mui/material/styles';
import { FormControl, Select, Typography, Box, Divider } from '@mui/material';

export const StyledFormControl = styled(FormControl)(() => ({
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
}));

export const ValuesContainer = styled(Box)(() => ({
    display: "block",
    wordBreak: "break-all",
    marginBottom: 'var(--space-6)',
}));

export const ShowAllLink = styled('a')(() => ({
    fontFamily: 'DM Sans',
    fontWeight: 700,
    fontSize: '14px',
    lineHeight: '20px',
    color: 'var(--text-link-color)',
    textDecoration: 'none',
    marginLeft: '8px',
    cursor: 'pointer'
}));

export const FunctionLabel = styled('span')(() => ({
    fontFamily: 'DM Mono',
    fontSize: '14px',
    fontWeight: 400,
    backgroundColor: 'var(--background-main)',
    padding: '2px 4px',
    borderRadius: '2px'
}));

export const FunctionName = styled('span')(() => ({
    fontFamily: 'DM Mono',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '22px',
    letterSpacing: '0px',
    backgroundColor: 'var(--function-name-bg)',
    padding: '4px 8px',
    borderRadius: '4px',
    color: 'var(--function-name-color)'
}));

export const StyledDivider = styled(Divider)(() => ({
    width: '446px',
    height: '1px',
    border: 'none',
    borderTop: '1px solid var(--light-border)',
    margin: '16px 0 var(--space-6) 0'
}));

export const TransactionLabel = styled('span')(() => ({
    fontFamily: 'DM Mono',
    fontSize: '14px',
    fontWeight: 400,
    color: 'var(--text-primary-color)'
}));

export const TransactionsContainer = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
}));

export const TransactionItemContainer = styled(Box)(() => ({
    backgroundColor: 'var(--background-paper)',
    borderRadius: '6px',
    border: '1px solid var(--light-border)',
}));

export const TransactionHeader = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'expanded'
})<{ expanded?: boolean }>(({ expanded }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    cursor: 'pointer',
    backgroundColor: expanded ? 'var(--background-main)' : 'transparent',
    '&:hover': {
        backgroundColor: '#f4f4f4'
    }
}));

export const TransactionContent = styled(Box)(() => ({
    padding: '24px',
    borderTop: '1px solid var(--light-border)',
    backgroundColor: 'var(--background-paper)',
}));

export const ParamRow = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'withDivider'
})<{ withDivider?: boolean }>(({ withDivider }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px',
    ...(withDivider && {
        borderBottom: '1px solid var(--light-border)',
        paddingBottom: '16px'
    })
}));

export const ParamLabel = styled(Typography)(() => ({
    color: 'var(--text-secondary-color)',
    fontFamily: 'DM Sans',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '20px',
    letterSpacing: '0.17px'
}));

export const ParamValue = styled(Typography)(() => ({
    fontFamily: 'DM Sans',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '20px',
    color: 'var(--text-primary-color)',
    textAlign: 'right',
    maxWidth: '60%',
    wordBreak: 'break-all',
    letterSpacing: '0.17px'
}));

export const TextLabel = styled(Typography)(() => ({
    fontFamily: 'DM Sans',
    fontWeight: 700,
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.1px'
}));

export const SignatureSection = styled(Box)(() => ({
    marginTop: '24px',
    borderTop: '1px solid var(--light-border)',
    paddingTop: '24px'
}));

export const SignatureLabel = styled(Typography)(() => ({
    fontFamily: 'DM Sans',
    fontSize: '14px',
    fontWeight: 700,
    lineHeight: '20px',
    letterSpacing: '0.1px',
    marginBottom: '8px',
    color: 'var(--text-primary-color)'
}));

export const StyledSelect = styled(Select)(() => ({
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
}));

export const SignatureValue = styled(Typography)(() => ({
    fontFamily: 'DM Sans',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '20px',
    letterSpacing: '0.17px',
    color: 'var(--text-primary-color)',
    wordBreak: 'break-all'
}));