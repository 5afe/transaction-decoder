import React, { useCallback, useEffect, useState } from 'react';
import { Decoded, DecodedValue, decodeData } from '../../utils/decoding';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { IconButton, Collapse, Box } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useStyles } from './styles';
import { SelectChangeEvent } from '@mui/material/Select';

interface Props {
    decoded: Decoded,
}

export const DecodedParam: React.FC<{ param: DecodedValue, hideValue?: boolean }> = ({ param, hideValue }) => {
    const classes = useStyles()
    const [collapseValue, setCollapsedValue] = useState(false)
    const [decodedData, setDecodedData] = useState<Decoded | undefined>(undefined)
    const [selectedSignature, setSelectedSignature] = useState<string>("")
    const loadDecodedData = useCallback(async (selectedSignature: string) => {
        try {
            if (typeof param.value !== 'string') {
                throw new Error('Expected string value for decoding');
            }
            setDecodedData(await decodeData(selectedSignature, param.value))
        } catch (e) {
            setDecodedData(undefined)
            console.error(e)
        }
    }, [param.value, setDecodedData])
    const selectSignature = useCallback(async (event: SelectChangeEvent) => {
        const selectedSignature = event.target.value
        setSelectedSignature(selectedSignature || "")
        await loadDecodedData(selectedSignature)
    }, [setSelectedSignature, loadDecodedData])
    useEffect(() => {
        // Intial load
        const selectedSignature = param.signatures && param.signatures[0]
        setSelectedSignature(selectedSignature || "")
        setDecodedData(param.decoded)
        setCollapsedValue(!!param.canCollapse && typeof param.value === 'string' && param.value.length > 100)
        if (!param.decoded && selectedSignature) loadDecodedData(selectedSignature)
    }, [param, setSelectedSignature, loadDecodedData])
    return (
        <div className={classes.decodedParamContainer}>
            <span>
                {param.label !== undefined && (
                    <span className={classes.functionLabel}>{param.label}</span>
                )}
            </span>
            {param.value !== undefined && !hideValue && (
                <span className={classes.values}>
                    {collapseValue ? (
                        <>
                            {String(param.value).slice(0, 90) + "..."}
                            {param.canCollapse !== undefined && (
                                <a onClick={() => setCollapsedValue(!collapseValue)} color="inherit" className={classes.showAllLink}>
                                    Show all
                                </a>
                            )}
                        </>
                    ) : (
                        <>
                            {String(param.value)}
                            {param.canCollapse !== undefined && (
                                <a onClick={() => setCollapsedValue(!collapseValue)} color="inherit" className={classes.showAllLink}>
                                    {" "}Collapse
                                </a>
                            )}
                        </>
                    )}
                </span>
            )}
            {/* {param.signatures && param.signatures.length > 1 && (
                <FormControl className={classes.formControl}>
                    <InputLabel>Signature/ Encoding</InputLabel>
                    <Select value={selectedSignature} onChange={selectSignature}>
                        {param.signatures.map((sig) => (<MenuItem value={sig} key={sig}>{sig}</MenuItem>))}
                    </Select>
                </FormControl>
            )} */}
            { decodedData && <DecodedData decoded={decodedData} />}
        </div>
    )
}

const DecodedData: React.FC<Props> = ({ decoded }) => {
    const classes = useStyles();
    const [isExpanded, setIsExpanded] = useState(true);

    const isTransactionLabel = decoded.label?.startsWith('Transaction ');
    const isMultisend = decoded.label === 'Multisend transactions';

    return (
        <div>
            {isMultisend ? (
                <Box 
                    sx={{ display: 'flex', alignItems: 'center' }}
                    className={classes.multisendDropdown}
                >
                    <span className={classes.textLabel}>{decoded.label}</span>
                    <IconButton
                        onClick={() => setIsExpanded(!isExpanded)}
                        size="small"
                    >
                        {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </Box>
            ) : (
                <>
                    <span className={isTransactionLabel ? classes.transactionLabel : classes.functionName}>
                        {decoded.label}
                    </span>
                    {!isTransactionLabel && <hr className={classes.divider} />}
                <span className={classes.textLabel}>Data</span>
                </>
            )}
            <Collapse in={isExpanded}>
                {decoded.params.map((param, index) => (
                    <DecodedParam param={param} key={index} />
                ))}
            </Collapse>
        </div>
    );
}

export default DecodedData;
