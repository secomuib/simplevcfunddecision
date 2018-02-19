# Documentation for begin a project with Ethereum

Requirements:
* [Node 8.0](https://nodejs.org/en/download/).
* Solc (Solidity compiler) npm module
* Mocha (JavaScript test framework) npm module
* Ganache (personal Ethereum blockchain) npm module
* Web3 (Ethereum JavaScript API) npm module

Plugin for Visual Studio Code: https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity

Execute once, only in Windows, as administrator (to install Web3)
```
npm install --global --production windows-build-tools 
```

Execute:
```
mkdir SimpleVCFundDecision
cd SimpleVCFundDecision
npm init
npm install --save solc
npm install --save mocha
npm install --save ganache-cli
npm install --save web3@1.0.0-beta.26
npm install --save truffle-hdwallet-provider
```