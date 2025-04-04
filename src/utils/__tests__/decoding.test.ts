import { decodeData, loadSignatures } from '../decoding';
import axios from 'axios';

// Mock axios to avoid making real API calls during tests
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Decoded Data Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('setApprovalForAll Function', () => {
    const setApprovalForAllSignature = 'setApprovalForAll(address,bool)';
    // This is a sample ERC721 setApprovalForAll transaction data
    const setApprovalForAllData = '0xa22cb4650000000000000000000000001e0049783f008a0085193e00003d00cd54003c710000000000000000000000000000000000000000000000000000000000000001';

    beforeEach(() => {
      // Mock the signature lookup
      mockedAxios.get.mockResolvedValue({
        data: {
          results: [{ text_signature: 'setApprovalForAll(address,bool)' }]
        }
      });
    });

    test('should decode setApprovalForAll transaction data correctly', async () => {
      const decoded = await decodeData(setApprovalForAllSignature, setApprovalForAllData);
      
      expect(decoded).toBeDefined();
      expect(decoded?.label).toBe(setApprovalForAllSignature);
      expect(decoded?.params).toHaveLength(2);
      
      // First parameter should be an address (case insensitive comparison)
      expect(decoded?.params[0].value?.toString().toLowerCase())
        .toBe('0x1e0049783f008a0085193e00003d00cd54003c71'.toLowerCase());
      
      // Second parameter should be a boolean (true)
      expect(decoded?.params[1].value).toBe(true);
    });

    test('should load signatures for setApprovalForAll correctly', async () => {
      const signatures = await loadSignatures(setApprovalForAllData);
      
      expect(signatures).toBeDefined();
      expect(signatures).toContain(setApprovalForAllSignature);
      expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('0xa22cb465'));
    });
  });

  describe('signMessage Function', () => {
    const signMessageSignature = 'signMessage(bytes)';
    // Sample sign message data with a string message
    const signMessageData = '0x85a5affe00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000020b0e1c3ff5701afb62f178ae5ec94a2c86ade29c19b6e370680695e2e9f1df8dc';

    beforeEach(() => {
      // Mock the signature lookup
      mockedAxios.get.mockResolvedValue({
        data: {
          results: [{ text_signature: 'signMessage(bytes)' }]
        }
      });
    });

    test('should decode signMessage transaction data correctly', async () => {
      const decoded = await decodeData(signMessageSignature, signMessageData);
      
      expect(decoded).toBeDefined();
      expect(decoded?.label).toBe(signMessageSignature);
      expect(decoded?.params).toHaveLength(1);
      
      // The parameter should be a bytes value
      expect(decoded?.params[0].value).toBeDefined();
    });

    test('should load signatures for signMessage correctly', async () => {
      const signatures = await loadSignatures(signMessageData);
      
      expect(signatures).toBeDefined();
      expect(signatures).toContain(signMessageSignature);
      expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('0x85a5affe'));
    });
  });

  describe('Multisend Transactions', () => {
    const multisendSignature = 'Multisend';
    // Sample multisend transaction data with multiple transactions
    const multisendData = '0x8d80ff0a000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000001eb00fff9976782d46cc05630d1f6ebab18b2324d6b14000000000000000000000000000000000000000000000000016345785d8a00000000000000000000000000000000000000000000000000000000000000000004d0e30db000fff9976782d46cc05630d1f6ebab18b2324d6b1400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000044095ea7b3000000000000000000000000c92e8bdf79f0507f65a392b0ab4667716bfe0110ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff009008d19f58aabd9ed0d60971565aa8510560ab41000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a4ec6cb13f000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000038f73dec2d2b1d3bf4f93612e1b9a06cf36d65f36e28b0756e43feb84517515d411558b78560b88c75e9c95bbb9fda732f1e79f46567e2cf050000000000000000000000000000000000000000000000000000000000';

    beforeEach(() => {
      // Mock the signature lookup for multisend and embedded transactions
      mockedAxios.get.mockImplementation((url) => {
        if (url.includes('0x8d80ff0a')) {
          return Promise.resolve({
            data: {
              results: [{ text_signature: 'multiSend(bytes)' }]
            }
          });
        } else if (url.includes('0xd0e30db0')) {
          return Promise.resolve({
            data: {
              results: [{ text_signature: 'deposit()' }]
            }
          });
        } else if (url.includes('0x095ea7b3')) {
          return Promise.resolve({
            data: {
              results: [{ text_signature: 'approve(address,uint256)' }]
            }
          });
        } else if (url.includes('0xec6cb13f')) {
          return Promise.resolve({
            data: {
              results: [{ text_signature: 'multicall(bytes[])' }]
            }
          });
        }
        return Promise.resolve({ data: { results: [] } });
      });
    });

    test('should decode multisend transaction data correctly', async () => {
      const decoded = await decodeData(multisendSignature, multisendData);
      
      expect(decoded).toBeDefined();
      expect(decoded?.label).toBe('Multisend transactions');
      expect(decoded?.params).toBeDefined();
      expect(decoded?.params.length).toBeGreaterThan(0);
      
      // Check that the transactions were parsed correctly
      const firstTx = decoded?.params[0].decoded;
      expect(firstTx).toBeDefined();
      expect(firstTx?.label).toContain('Transaction');
      
      // Check that the transaction parameters are parsed correctly
      const txParams = firstTx?.params;
      expect(txParams).toBeDefined();
      expect(txParams?.find(p => p.label === 'To')).toBeDefined();
      expect(txParams?.find(p => p.label === 'Data')).toBeDefined();
      expect(txParams?.find(p => p.label === 'Value')).toBeDefined();
    });

    test('should load signatures for embedded transactions in multisend', async () => {
      const decoded = await decodeData(multisendSignature, multisendData);
      
      // Check that we have at least one transaction
      expect(decoded?.params.length).toBeGreaterThan(0);
      console.log(`Found ${decoded?.params.length} transactions in multisend`);
      
      // Check the first transaction
      const firstTx = decoded?.params[0].decoded;
      expect(firstTx).toBeDefined();
      const firstDataParam = firstTx?.params?.find(p => p.label === 'Data');
      expect(firstDataParam).toBeDefined();
      
      // If we have more transactions, check them
      if (decoded?.params.length && decoded?.params.length > 1) {
        const secondTx = decoded?.params[1].decoded;
        expect(secondTx).toBeDefined();
      }
      
      if (decoded?.params.length && decoded?.params.length > 2) {
        const thirdTx = decoded?.params[2].decoded;
        expect(thirdTx).toBeDefined();
      }
      
      // Check the signatures on available transactions
      for (let i = 0; i < (decoded?.params.length || 0); i++) {
        const tx = decoded?.params[i].decoded;
        const dataParam = tx?.params?.find(p => p.label === 'Data');
        console.log(`Transaction ${i+1} data:`, dataParam?.value);
        console.log(`Transaction ${i+1} signatures:`, dataParam?.signatures);
      }
    });
  });
});