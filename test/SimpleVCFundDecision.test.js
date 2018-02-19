const assert = require("assert");        // Mocha test framework
const ganache = require("ganache-cli");  // Personal Ethereum blockchain
const Web3 = require("web3");            // Web3 is a constructor function

var web3 = new Web3(ganache.provider());
var { interface, bytecode} = require("../compile");
var accounts;
var simpleVCFundDecision;

beforeEach(async function () {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();
    // With a promise
    /*web3.eth.getAccounts().then(fetchedAccounts => {
        console.log(fetchedAccounts);
    });*/
    
    // Use one of those accounts to deploy
    // the contract 
    simpleVCFundDecision = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: [accounts[1], accounts[2], "Test Project", accounts[3]] })
        .send({ from: accounts[0], gas: '1000000', value: "1000000000000000000" }); // Value in wei
        // 1000000000000000000 Wei = 1 ETH
});

describe("SimpleVCFundDecision", function ()  {
    it("deploys a contract", function () {
        // Tests that this value exists
        assert.ok(simpleVCFundDecision.options.address); 
    });

    it("has a default project name", async function () {
        var project = await simpleVCFundDecision.methods.project().call();
        assert.equal(project, "Test Project");
    });

    it("has an amount of balance", async function () {
        var amount = parseInt(await simpleVCFundDecision.methods.amount().call());
        assert.equal(amount, 1000000000000000000);
    });

    it("can be approved and balance is transfered to beneficiary", async function () {
        var prevAmount = parseInt(await simpleVCFundDecision.methods.amount().call());
        var prevBal = parseInt(await web3.eth.getBalance(accounts[3]));
        await simpleVCFundDecision.methods.approve()
            .send({ from: accounts[1] });
        await simpleVCFundDecision.methods.approve()
            .send({ from: accounts[2] });
        var nextAmount = parseInt(await simpleVCFundDecision.methods.amount().call());
        var nextBal = parseInt(await web3.eth.getBalance(accounts[3]));
        
        assert.equal(nextBal-prevBal, prevAmount);
        assert.equal(nextAmount, 0);
    });
})