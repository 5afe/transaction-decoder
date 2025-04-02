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

export const DecodedParam: React.FC<{ param: DecodedValue, hideValue?: boolean, showSignatures?: boolean }> = ({ param, hideValue, showSignatures = false }) => {
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
            {showSignatures && param.signatures && param.signatures.length > 1 && (
                <FormControl className={classes.formControl}>
                    <InputLabel>Signature/ Encoding</InputLabel>
                    <Select value={selectedSignature} onChange={selectSignature}>
                        {param.signatures.map((sig) => (<MenuItem value={sig} key={sig}>{sig}</MenuItem>))}
                    </Select>
                </FormControl>
            )}
            { decodedData && <DecodedData decoded={decodedData} />}
        </div>
    )
}

export const TransactionParam: React.FC<{ 
    label: string, 
    value: string,
    withDivider?: boolean 
}> = ({ label, value, withDivider }) => {
    const classes = useStyles();
    return (
        <div className={`${classes.paramRow} ${withDivider ? 'with-divider' : ''}`}>
            <span className={classes.paramLabel}>{label}</span>
            <span className={classes.paramValue}>{value}</span>
        </div>
    );
};

export const TransactionItem: React.FC<{ param: DecodedValue, index: number }> = ({ param, index }) => {
    const classes = useStyles();
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedSignature, setSelectedSignature] = useState<string>("");
    const [showFullData, setShowFullData] = useState(false);
    const [decodedData, setDecodedData] = useState<Decoded | undefined>(undefined);

    const loadDecodedData = useCallback(async (selectedSignature: string) => {
        try {
            const dataParam = param.decoded?.params.find(p => p.label === 'Data');
            if (dataParam && typeof dataParam.value === 'string') {
                setDecodedData(await decodeData(selectedSignature, dataParam.value));
            }
        } catch (e) {
            setDecodedData(undefined);
            console.error(e);
        }
    }, [param.decoded]);

    useEffect(() => {
        // Set initial signature if available
        const signatures = param.decoded?.params.find(p => p.label === 'Data')?.signatures;
        if (signatures && signatures.length > 0) {
            setSelectedSignature(signatures[0]);
            loadDecodedData(signatures[0]);
        }
    }, [param.decoded, loadDecodedData]);

    const handleSignatureChange = async (event: SelectChangeEvent<string>) => {
        const newSignature = event.target.value;
        setSelectedSignature(newSignature);
        await loadDecodedData(newSignature);
    };

    if (!param.decoded) return null;

    const { params } = param.decoded;
    const dataParam = params.find(p => p.label === 'Data');
    const data = dataParam?.value as string;
    const signatures = dataParam?.signatures || [];
    const shortenedData = data ? `${data.slice(0, 30)}...` : '';

    return (
        <div className={classes.transactionItem}>
            <div 
                className={`${classes.transactionHeader} ${isExpanded ? 'expanded' : ''}`}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <span className={classes.textLabel}>{param.decoded?.label}</span>
                <IconButton
                    className={classes.iconButton}
                    size="small"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsExpanded(!isExpanded);
                    }}
                >
                    {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </div>
            <Collapse in={isExpanded}>
                <div className={classes.transactionContent}>
                    {params.map((p, i) => {
                        if (p.label === 'Data') {
                            return (
                                <div key={i} className={classes.paramRow}>
                                    <span className={classes.paramLabel}>Data</span>
                                    <span className={classes.paramValue}>
                                        {showFullData ? p.value : shortenedData}
                                        <a 
                                            className={classes.showAllLink}
                                            onClick={() => setShowFullData(!showFullData)}
                                        >
                                            {showFullData ? 'Collapse' : 'Show all'}
                                        </a>
                                    </span>
                                </div>
                            );
                        }
                        
                        // Add divider only for Operation and To
                        const needsDivider = ['Operation', 'To', 'Value'].includes(p.label || '');
                        
                        return (
                            <TransactionParam 
                                key={i}
                                label={p.label || ''}
                                value={String(p.value)}
                                withDivider={needsDivider}
                            />
                        );
                    })}
                    
                    {signatures.length > 0 && (
                        <div className={classes.signatureSection}>
                            <div className={classes.signatureLabel}>Signature/Encoding</div>
                            <Select
                                className={classes.signatureSelect}
                                value={selectedSignature}
                                onChange={handleSignatureChange}
                                displayEmpty
                            >
                                {signatures.map((sig) => (
                                    <MenuItem value={sig} key={sig}>{sig}</MenuItem>
                                ))}
                            </Select>
                            {decodedData && (
                                <div className={classes.signatureValue}>
                                    {data}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </Collapse>
        </div>
    );
};

const DecodedData: React.FC<Props> = ({ decoded }) => {
    const classes = useStyles();
    const [isExpanded, setIsExpanded] = useState(true);

    const isMultisend = decoded.label === 'Multisend transactions';

    if (isMultisend) {
        return (
            <div className={classes.multisendContainer}>
                <div 
                    className={classes.multisendHeader}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <span className={classes.textLabel}>{decoded.label}</span>
                    <IconButton
                        className={classes.iconButton}
                        size="small"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsExpanded(!isExpanded);
                        }}
                    >
                        {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </div>
                <Collapse in={isExpanded}>
                    <div className={classes.multisendContent}>
                        <div className={classes.transactionsContainer}>
                            {decoded.params.map((param, index) => (
                                <TransactionItem param={param} index={index} key={index} />
                            ))}
                        </div>
                    </div>
                </Collapse>
            </div>
        );
    }

    const isTransactionLabel = decoded.label?.startsWith('Transaction ');

    return (
        <div>
            <span className={isTransactionLabel ? classes.transactionLabel : classes.functionName}>
                {decoded.label}
            </span>
            {!isTransactionLabel && <hr className={classes.divider} />}
            <span className={classes.textLabel}>Data</span>
            <Collapse in={isExpanded}>
                {decoded.params.map((param, index) => (
                    <DecodedParam 
                        param={param} 
                        key={index}
                        showSignatures={false}
                    />
                ))}
            </Collapse>
        </div>
    );
}

export default DecodedData;
