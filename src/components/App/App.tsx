"use client"

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'
import Image from 'next/image';
import { ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import { DecodedParam } from '../DecodedData/DecodedData';
import { DecodedValue, loadSignatures } from '../../utils/decoding';
import { createAppTheme } from '../../styles/theme';
import { 
  Root, 
  StyledTextField, 
  TransactionData, 
  TransactionDataSubtitle,
  TransactionDataContainer,
  TransactionInputContainer,
  ButtonContainer,
  DecodeButton,
  ClearButton,
  PlaceholderText,
  Footer,
  FooterLink,
  Sidebar,
  SidebarHeader,
  MainContent,
  SidebarToggle,
  OutputBox,
  InputBox,
  LogoContainer
} from './styles';

function App() {
  const query = useSearchParams()
  const [txData, setTxData] = useState(query.get("data") || "")
  const [dataInfo, setDataInfo] = useState<DecodedValue | undefined>(undefined)
  const [isMounted, setIsMounted] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
  
  const loadDataInfo = async (data: string) => {
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
  }
  
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(() => createAppTheme(prefersDarkMode), [prefersDarkMode])
  
  if (!isMounted) {
    return <div style={{ visibility: 'hidden' }}></div>;
  }
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Sidebar className={isSidebarOpen ? "" : "sidebar-collapsed"}>
        <SidebarHeader>
          <LogoContainer>
            <Image src="/logo.svg" alt="Safe Logo" width={24} height={24} />
          </LogoContainer>
          <div onClick={toggleSidebar} style={{ cursor: 'pointer' }}>
            <Image src="/sidebar_icon.svg" alt="sidebar-icon" width={24} height={24} />
          </div>
        </SidebarHeader>
        <div className="sidebar-content">
          {/* Input Box */}
          <InputBox>
            <TransactionDataContainer>
              <TransactionData variant="h6" gutterBottom>
                Decode Safe transaction
              </TransactionData>
              <TransactionDataSubtitle variant="body1" gutterBottom>
                Copy raw transaction data and paste it below to decode its function.
              </TransactionDataSubtitle>
            </TransactionDataContainer>
            <TransactionInputContainer>
              <StyledTextField
                multiline
                rows={8}
                variant="outlined"
                fullWidth
                placeholder="Enter raw data (e.g. 0x6a761202020000...)"
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
          </InputBox>
        </div>
        {/* Footer */}
        <Footer>
          made by <FooterLink href="https://github.com/rmeissner" target="_blank" rel="noopener">rmeissner</FooterLink>. 
          powered by <FooterLink href="https://www.4byte.directory" target="_blank" rel="noopener">4byte.directory</FooterLink>
        </Footer>
      </Sidebar>

      <MainContent className={`${isSidebarOpen ? "" : "main-expanded"} ${!dataInfo ? "empty-state" : ""}`}>
        {!isSidebarOpen && (
          <SidebarToggle onClick={toggleSidebar}>
            <Image src="/sidebar_icon.svg" alt="expand sidebar" width={24} height={24} />
          </SidebarToggle>
        )}
        {dataInfo ? (
          <Root>
            <OutputBox>
              <TransactionData variant="h6" gutterBottom>
                Called method
              </TransactionData>
              <DecodedParam param={dataInfo} hideValue={true} />
            </OutputBox>
          </Root>
        ) : (
          <PlaceholderText>
            Your decoded transaction data will appear here.
          </PlaceholderText>
        )}
      </MainContent>
    </ThemeProvider>
  );
}

export default App;
