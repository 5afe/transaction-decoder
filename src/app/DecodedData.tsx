import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Decoded, DecodedValue, decodeData } from './utils/decoding';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    values: {
        padding: "4px 16px 4px 16px",
        display: "block",
        wordBreak: "break-all",
    }
}));

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
            setDecodedData(await decodeData(selectedSignature, param.value))
        } catch (e) {
            setDecodedData(undefined)
            console.error(e)
        }
    }, [param.value, setDecodedData])
    const selectSignature = useCallback(async (event: React.ChangeEvent<{ value: unknown }>) => {
        const selectedSignature = event.target.value as string
        setSelectedSignature(selectedSignature || "")
        await loadDecodedData(selectedSignature)
    }, [setSelectedSignature, loadDecodedData])
    useEffect(() => {
        // Intial load
        const selectedSignature = param.signatures && param.signatures[0]
        setSelectedSignature(selectedSignature || "")
        setDecodedData(param.decoded)
        setCollapsedValue(!!param.canCollapse && param.value.toString().length > 100)
        if (!param.decoded && selectedSignature) loadDecodedData(selectedSignature)
    }, [param, setSelectedSignature, loadDecodedData])
    return (<>
        <span>
            {param.label !== undefined && (
                <b>{param.label}</b>
            )}
            &nbsp;
            {param.canCollapse !== undefined && (
                <a onClick={() => setCollapsedValue(!collapseValue)} color="inherit">{ collapseValue ? "Expand" : "Collapse"}</a>
            )}
        </span>
        {param.value !== undefined && !hideValue && (
            <span className={classes.values}>
                {collapseValue ? param.value.toString().slice(0, 90) + "..." : param.value.toString()}
            </span>
        )}
        {param.signatures && param.signatures.length > 1 && (
            <FormControl className={classes.formControl}>
                <InputLabel>Signature/ Encoding</InputLabel>
                <Select value={selectedSignature} onChange={selectSignature}>
                    {param.signatures.map((sig) => (<MenuItem value={sig} key={sig}>{sig}</MenuItem>))}
                </Select>
            </FormControl>
        )}
        { decodedData && <DecodedData decoded={decodedData} />}
    </>)
}

const DecodedData: React.FC<Props> = ({ decoded }) => {
    return (
        <div>
            {decoded.label}
            {decoded.params.map((param, index) => (<DecodedParam param={param} key={index} />))}
        </div>
    );
}

export default DecodedData;
