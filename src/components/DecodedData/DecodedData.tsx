import React, { useCallback, useEffect, useState } from 'react';
import { Decoded, DecodedValue, decodeData, loadSignatures } from '../../utils/decoding';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { IconButton, Collapse, Box } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { SelectChangeEvent } from '@mui/material/Select';
import {
    StyledFormControl,
    ValuesContainer,
    ShowAllLink,
    FunctionLabel,
    FunctionName,
    StyledDivider,
    TransactionLabel,
    TransactionsContainer,
    TransactionItemContainer,
    TransactionHeader,
    TransactionContent,
    ParamRow,
    ParamLabel,
    ParamValue,
    TextLabel,
    SignatureSection,
    SignatureLabel,
    StyledSelect,
    SignatureValue
} from './styles';

interface Props {
    decoded: Decoded,
}

export const DecodedParam: React.FC<{ param: DecodedValue, hideValue?: boolean, showSignatures?: boolean }> = ({ param, hideValue, showSignatures = false }) => {
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
    const selectSignature = useCallback(async (event: SelectChangeEvent<string>) => {
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
        <Box component="span">
            <span>
                {param.label !== undefined && (
                    <FunctionLabel>{param.label}</FunctionLabel>
                )}
            </span>
            {param.value !== undefined && !hideValue && (
                <ValuesContainer>
                    {collapseValue ? (
                        <>
                            {String(param.value).slice(0, 90) + "..."}
                            {param.canCollapse !== undefined && (
                                <ShowAllLink onClick={() => setCollapsedValue(!collapseValue)}>
                                    Show all
                                </ShowAllLink>
                            )}
                        </>
                    ) : (
                        <>
                            {String(param.value)}
                            {param.canCollapse !== undefined && (
                                <ShowAllLink onClick={() => setCollapsedValue(!collapseValue)}>
                                    {" "}Collapse
                                </ShowAllLink>
                            )}
                        </>
                    )}
                </ValuesContainer>
            )}
            {showSignatures && param.signatures && param.signatures.length >= 1 && (
                <StyledFormControl>
                    <InputLabel>Signature/ Encoding</InputLabel>
                    <StyledSelect 
                        value={selectedSignature} 
                        onChange={(e) => selectSignature(e as SelectChangeEvent<string>)}
                    >
                        {param.signatures.map((sig) => (<MenuItem value={sig} key={sig}>{sig}</MenuItem>))}
                    </StyledSelect>
                </StyledFormControl>
            )}
            { decodedData && <DecodedData decoded={decodedData} />}
        </Box>
    )
}

export const TransactionParam: React.FC<{ 
    label: string, 
    value: string,
    withDivider?: boolean 
}> = ({ label, value, withDivider }) => {
    return (
        <ParamRow withDivider={withDivider}>
            <ParamLabel>{label}</ParamLabel>
            <ParamValue>{value}</ParamValue>
        </ParamRow>
    );
};

export const TransactionItem: React.FC<{ param: DecodedValue, index: number }> = ({ param }) => {
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

    // Check if this transaction contains a setApprovalForAll call
    const isSetApprovalForAll = decodedData?.label === 'setApprovalForAll(address,bool)';

    return (
        <TransactionItemContainer>
            <TransactionHeader 
                expanded={isExpanded}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <TextLabel>{param.decoded?.label}</TextLabel>
                <IconButton
                    size="small"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsExpanded(!isExpanded);
                    }}
                >
                    {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TransactionHeader>
            <Collapse in={isExpanded}>
                <TransactionContent>
                    {params.map((p, i) => {
                        if (p.label === 'Data') {
                            return (
                                <ParamRow key={i}>
                                    <ParamLabel>Data</ParamLabel>
                                    <ParamValue>
                                        {showFullData ? String(p.value) : shortenedData}
                                        <ShowAllLink 
                                            onClick={() => setShowFullData(!showFullData)}
                                        >
                                            {showFullData ? 'Collapse' : 'Show all'}
                                        </ShowAllLink>
                                    </ParamValue>
                                </ParamRow>
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
                    
                    {/* Always show signatures for setApprovalForAll or if signatures are available */}
                    {(isSetApprovalForAll || signatures.length > 0) && (
                        <SignatureSection>
                            <SignatureLabel>Signature/Encoding</SignatureLabel>
                            <StyledSelect
                                value={selectedSignature}
                                onChange={(e) => handleSignatureChange(e as SelectChangeEvent<string>)}
                                displayEmpty
                            >
                                {signatures.map((sig) => (
                                    <MenuItem value={sig} key={sig}>{sig}</MenuItem>
                                ))}
                            </StyledSelect>
                            {decodedData && (
                                <SignatureValue>
                                    {data}
                                </SignatureValue>
                            )}
                        </SignatureSection>
                    )}
                </TransactionContent>
            </Collapse>
        </TransactionItemContainer>
    );
};

const DecodedData: React.FC<Props> = ({ decoded }) => {
    const [isExpanded] = useState(true);
    const isSetApprovalForAll = decoded.label === 'setApprovalForAll(address,bool)';
    const isSignMessage = decoded.label === 'signMessage(bytes)';
    const [setApprovalSignatures, setSetApprovalSignatures] = useState<string[]>([]);
    const [selectedSetApprovalSignature, setSelectedSetApprovalSignature] = useState<string>("");
    
    // Fetch signatures for setApprovalForAll
    useEffect(() => {
        const fetchSetApprovalSignatures = async () => {
            if (isSetApprovalForAll) {
                try {
                    // For setApprovalForAll, a common selector is 0xa22cb465
                    // But we'll fetch it dynamically to be safe
                    const sampleData = "0xa22cb4650000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001";
                    const signatures = await loadSignatures(sampleData);
                    if (signatures && signatures.length > 0) {
                        setSetApprovalSignatures(signatures);
                        setSelectedSetApprovalSignature(signatures[0]);
                    }
                } catch (e) {
                    console.error("Failed to load setApprovalForAll signatures:", e);
                }
            }
        };
        
        fetchSetApprovalSignatures();
    }, [isSetApprovalForAll]);

    const handleSetApprovalSignatureChange = (event: SelectChangeEvent<string>) => {
        setSelectedSetApprovalSignature(event.target.value);
    };

    const isMultisend = decoded.label === 'Multisend transactions';

    if (isMultisend) {
        // Render transactions directly without the multisend container/accordion
        return (
            <TransactionsContainer>
                {decoded.params.map((param, index) => (
                    <TransactionItem param={param} index={index} key={index} />
                ))}
            </TransactionsContainer>
        );
    }

    const isTransactionLabel = decoded.label?.startsWith('Transaction ');

    // For signMessage function, add specific formatting
    if (isSignMessage) {
        return (
            <Box component="span">
                <FunctionName>
                    {decoded.label}
                </FunctionName>
                <SignatureSection>
                    <SignatureLabel>Parameters</SignatureLabel>
                    {decoded.params.map((param, index) => {
                        return (
                            <ParamRow key={index}>
                                <ParamLabel>bytes</ParamLabel>
                                <ParamValue>
                                    {String(param.value)}
                                </ParamValue>
                            </ParamRow>
                        );
                    })}
                </SignatureSection>
            </Box>
        );
    }

    // For setApprovalForAll function, add specific formatting
    if (isSetApprovalForAll) {
        return (
            <Box component="span">
                <FunctionName>
                    {decoded.label}
                </FunctionName>
                <SignatureSection>
                    <SignatureLabel>Signature/Encoding</SignatureLabel>
                    <StyledSelect
                        value={selectedSetApprovalSignature}
                        onChange={(e) => handleSetApprovalSignatureChange(e as SelectChangeEvent<string>)}
                        displayEmpty
                    >
                        {setApprovalSignatures.map((sig) => (
                            <MenuItem value={sig} key={sig}>{sig}</MenuItem>
                        ))}
                    </StyledSelect>
                </SignatureSection>
                <TextLabel>Data</TextLabel>
                <Collapse in={isExpanded}>
                    {decoded.params.map((param, index) => (
                        <DecodedParam 
                            param={param} 
                            key={index}
                            showSignatures={false}
                        />
                    ))}
                </Collapse>
            </Box>
        );
    }

    return (
        <Box component="span">
            {isTransactionLabel ? 
                <TransactionLabel>{decoded.label}</TransactionLabel> : 
                <FunctionName>{decoded.label}</FunctionName>
            }
            {!isTransactionLabel && <StyledDivider />}
            <TextLabel>Data</TextLabel>
            <Collapse in={isExpanded}>
                {decoded.params.map((param, index) => (
                    <DecodedParam 
                        param={param} 
                        key={index}
                        showSignatures={false}
                    />
                ))}
            </Collapse>
        </Box>
    );
}

export default DecodedData;
