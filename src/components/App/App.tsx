"use client"

import React, { useCallback, useState } from 'react';
import { useSearchParams } from 'next/navigation'
import { TextField, Paper, Grid, Typography, Box, Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import { DecodedParam } from '../DecodedData/DecodedData';
import { DecodedValue, loadSignatures } from '../../utils/decoding';
import { createAppTheme } from '../../styles/theme';
import { useStyles } from './styles';

function App() {
  const query = useSearchParams()
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
  const theme = React.useMemo(() => createAppTheme(prefersDarkMode), [prefersDarkMode])
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <Typography 
          variant="h3" 
          component="h1"
          className={classes.title}
        >
          Decode Safe Transaction
        </Typography>
        
        <Grid container spacing={2}>
          {/* Input Box */}
          <Grid item xs={6}>
            <Paper elevation={1} sx={{ height: '100%' }}>
              <Box p={3} className={classes.inputBox}>
                <Box className={classes.transactionDataContainer}>
                  <Typography variant="h6" gutterBottom className={classes.transactionData}>
                    Transaction data
                  </Typography>
                  <Typography variant="body1" gutterBottom className={classes.transactionDataSubtitle}>
                    Use raw transaction data to decode its function.
                  </Typography>
                </Box>
                <Box className={classes.transactionInputContainer}>
                  <TextField
                    className={classes.textField}
                    multiline
                    rows={8}
                    variant="outlined"
                    fullWidth
                    placeholder="Enter transaction data (e.g. 0x6a7612020000...)"
                    value={txData}
                    onChange={(e) => setTxData(e.target.value)}
                  />
                  <Typography variant="body1" gutterBottom className={classes.transactionInputSubtitle}>
                    eg. 0x8d80ff0a000000...
                  </Typography>
                </Box>
                <Box className={classes.buttonContainer}>
                  <Button 
                    className={classes.decodeButton}
                    variant="contained" 
                    color="primary" 
                  onClick={() => loadDataInfo(txData)}
                  disabled={!txData.trim()}
                >
                    Decode transaction
                  </Button>
                  <Button variant="contained" color="primary" onClick={() => setTxData("")} className={classes.clearButton}>
                    Clear all
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Output Box */}
          <Grid item xs={6}>
            <Paper elevation={1} sx={{ height: '100%' }}>
              <Box p={3}>
                <Typography variant="h6" gutterBottom>
                  Decoded transaction
                </Typography>
                {dataInfo && <DecodedParam param={dataInfo} hideValue={true} />}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default App;
