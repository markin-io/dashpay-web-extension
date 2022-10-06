# DashPay Web Extension

A Web Extension POC for Dash Layer 1 payments.

WARNING: Web Extension does not support secure key storage. Never submit your mainnet mnemonics and private keys in options.

## Development
DashPay Web Extension uses [a special branch of the Dash Platform](https://github.com/dashevo/platform/tree/feat/adapt-for-web-extension) workspace. 
This branch is not published to NPM yet, and development requires cloning of the Platform repository and linking it to the Web Extension using Yarn.

### Prerequisites
- Node JS 16+
- [Yarn 3.2.0+](https://yarnpkg.com/getting-started)

### Setting up development environment
- Set up Dash Platform repository
  - `$ git clone git@github.com:dashevo/platform.git`
  - `$ git checkout feat/adapt-for-web-extension`
  - `$ yarn install`
- Set up DashPay Web Extension repository
  - `$ git clone git@github.com:markin-io/dashpay-web-extension.git`
  - `$ yarn install`
- Link Platform workspaces to Web Extension
  - `yarn link --all /path/to/platform` - absolute path to the paltform repo directory cloned on previous step
  - Ensure that `package.json` has all `@dasevo/*` resolutions in it, e.g.
  ```
    "@dashevo/dapi-grpc": "portal:/Users/bob/dashevo/platform/packages/dapi-grpc",
    "@dashevo/dash-spv": "portal:/Users/bob/dashevo/platform/packages/dash-spv",
    "dashmate": "portal:/Users/bob/dashevo/platform/packages/dashmate",
    "@dashevo/dashpay-contract": "portal:/Users/bob/dashevo/platform/packages/dashpay-contract",
    "@dashevo/dpns-contract": "portal:/Users/bob/dashevo/platform/packages/dpns-contract",
    "@dashevo/feature-flags-contract": "portal:/Users/bob/dashevo/platform/packages/feature-flags-contract",
    "@dashevo/dapi-client": "portal:/Users/bob/dashevo/platform/packages/js-dapi-client",
    "dash": "portal:/Users/bob/dashevo/platform/packages/js-dash-sdk",
    "@dashevo/dpp": "portal:/Users/bob/dashevo/platform/packages/js-dpp",
    "@dashevo/grpc-common": "portal:/Users/bob/dashevo/platform/packages/js-grpc-common",
    "@dashevo/masternode-reward-shares-contract": "portal:/Users/bob/dashevo/platform/packages/masternode-reward-shares-contract",
    "@dashevo/wallet-lib": "portal:/Users/bob/dashevo/platform/packages/wallet-lib"
  ```
- Run one of the commands to start extension, e.g.
  - `$ yarn dev:chrome`

### Run Extension in the browser
- Open `chrome://extensions`
- Turn `Developer mode` slider on
- Click `Load unpacked` button and choose `extension/chrome` folder
- Right click on DashPay Extension at the browser toolbar and choose `Options`
- Enter your Dash Wallet testnet mnemonic phrase and click `Save`
- Open DashPay Extension and wait for synchronization to complete
  


