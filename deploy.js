const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");

var provider = new HDWalletProvider(
    'call glow acoustic vintage front ring trade assist shuffle mimic volume reject',
    'https://rinkeby.infura.io/orDImgKRzwNrVCDrAk5Q'
);
var web3 = new Web3(provider);
var { interface, bytecode} = require("./compile");

async function deploy () {
    var accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);

    var simpleVCFundDecision = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: [accounts[1], accounts[2], "Test Project", accounts[3]] })
        .send({ from: accounts[0], gas: '1000000', value: "1000000000000000000" }); // Value in wei
    
    console.log(interface);
    console.log('Contract deployed to', simpleVCFundDecision.options.address);
    // You can view this contract in https://rinkeby.etherscan.io/
};

deploy();
