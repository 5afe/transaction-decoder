"use client"

import React, { useCallback, useState } from 'react';
import { useSearchParams } from 'next/navigation'
import { TextField } from '@material-ui/core';
import { makeStyles, createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import blue from '@material-ui/core/colors/blue';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CssBaseline from '@material-ui/core/CssBaseline';
import { DecodedParam } from './DecodedData';
import { DecodedValue, loadSignatures } from './utils/decoding';

const useStyles = makeStyles(() => ({
  content: {
    padding: "4px"
  },
  input: {
    width: "100%"
  }
}));

function App() {
  const query = useSearchParams()
  const classes = useStyles();
  const [txData, setTxData] = useState(query.get("data") || "")
  const [dataInfo, setDataInfo] = useState<DecodedValue | undefined>(undefined)
  const loadDataInfo = useCallback(async (data: string) => {
    setTxData(data)
    if (data.length < 10) {
      setDataInfo(undefined)
      return
    }
    try {
      const signatures = await loadSignatures(data)
      setDataInfo({
        value: data,
        signatures
      })
    } catch (e) {
      setDataInfo(undefined)
      console.error(e)
    }
  }, [])
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(() => createTheme({
    palette: {
      type: prefersDarkMode ? 'dark' : 'light',
      primary: blue,
    },
  }), [prefersDarkMode])
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.content}>
        <h1>
          Transaction decoder
        </h1>
        <TextField placeholder="Enter transaction data (e.g. 0x6a7612020000...)" color="primary" className={classes.input} value={txData} onChange={(e) => { loadDataInfo(e.target.value) }} />
        <br />
        <br />
        { dataInfo && <DecodedParam param={dataInfo} hideValue={true} /> }
      </div>
    </ThemeProvider>
  );
}

export default App;
