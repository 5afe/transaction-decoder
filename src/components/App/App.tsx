"use client"

import React, { useCallback, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'
import { Paper, Grid } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import { DecodedParam } from '../DecodedData/DecodedData';
import { DecodedValue, loadSignatures } from '../../utils/decoding';
import { createAppTheme } from '../../styles/theme';
import { 
  Root, 
  Title, 
  StyledTextField, 
  TransactionData, 
  StyledBox, 
  TransactionDataSubtitle,
  TransactionDataContainer,
  TransactionInputContainer,
  ButtonContainer,
  DecodeButton,
  ClearButton,
  PlaceholderText,
  Footer,
  FooterLink
} from './styles';

function App() {
  const query = useSearchParams()
  const [txData, setTxData] = useState(query.get("data") || "")
  const [dataInfo, setDataInfo] = useState<DecodedValue | undefined>(undefined)
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
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
  
  if (!isMounted) {
    return <div style={{ visibility: 'hidden' }}></div>;
  }
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Root>
        <Title variant="h3">
          Decode Safe Transaction
        </Title>
        
        <Grid container spacing={2}>
          {/* Input Box */}
          <Grid item xs={12} md={6}>
            <Paper elevation={0}>
              <StyledBox>
                <TransactionDataContainer>
                  <TransactionData variant="h6" gutterBottom>
                    Transaction data
                  </TransactionData>
                  <TransactionDataSubtitle variant="body1" gutterBottom>
                    Use raw transaction data to decode its function.
                  </TransactionDataSubtitle>
                </TransactionDataContainer>
                <TransactionInputContainer>
                  <StyledTextField
                    multiline
                    rows={8}
                    variant="outlined"
                    fullWidth
                    placeholder="Enter transaction data (e.g. 0x6a7612020000...)"
                    value={txData}
                    onChange={(e) => setTxData(e.target.value)}
                  />
                </TransactionInputContainer>
                <ButtonContainer>
                  <DecodeButton
                    variant="contained" 
                    color="primary" 
                    onClick={() => loadDataInfo(txData)}
                    disabled={!txData.trim()}
                  >
                    Decode transaction
                  </DecodeButton>
                  {txData.trim() && (
                    <ClearButton
                      variant="contained" 
                      color="primary" 
                      onClick={() => {
                        setTxData("");
                        setDataInfo(undefined);
                      }}
                    >
                      Clear all
                    </ClearButton>
                  )}
                </ButtonContainer>
              </StyledBox>
            </Paper>
          </Grid>

          {/* Output Box */}
          <Grid item xs={12} md={6}>
            <Paper elevation={0}>
              <StyledBox>
                <TransactionData variant="h6" gutterBottom>
                Called method
                </TransactionData>
                {dataInfo ? (
                  <DecodedParam param={dataInfo} hideValue={true} />
                ) : (
                  <PlaceholderText>
                    Your decoded transaction data will appear here.
                  </PlaceholderText>
                )}
              </StyledBox>
            </Paper>
          </Grid>
        </Grid>
        
        {/* Footer */}
        <Footer>
          made by <FooterLink href="https://github.com/rmeissner" target="_blank" rel="noopener">rmeissner</FooterLink>. 
          powered by <FooterLink href="https://www.4byte.directory" target="_blank" rel="noopener">4byte.directory</FooterLink>
        </Footer>
      </Root>
    </ThemeProvider>
  );
}

export default App;
