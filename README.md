# Transaction Decoder

Simple webapp to decode transaction data with the signatures provided at [4byte.directory](https://www.4byte.directory)

The webapp will also decode some complex nested transaction data:
- [Multisend](https://github.com/gnosis/safe-contracts/blob/v1.1.1/contracts/libraries/MultiSend.sol) transaction 
- [Safe](https://github.com/gnosis/safe-contracts/blob/v1.1.1/contracts/GnosisSafe.sol#L114) transaction 

## Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.