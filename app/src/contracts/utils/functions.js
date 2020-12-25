const Web3 = require('web3');
const infura = require('./infura');
const web3 = new Web3(infura.rpcURL);
const CharityChainJSON = require('../build/CharityChain.json');

export async function getWeb3() {
  if (window.ethereum) {
    window.web3 = new Web3(window.web3.currentProvider);
    await window.ethereum.enable();
    return window.web3;
  } else {
    alert("Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!");
  }
}

export async function callMethod() {
  if (window.web3) {
    const accounts = await window.web3.eth.getAccounts();
    // const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    // params
    const nricHash = '0x0000000000000000000000000000000000000000000000000000000000000001';
    const amount = 100;
    const message = '0x0000000000000000000000000000000000000000000000000000000000000002'
    const contractAddress = CharityChainJSON.networks[3].address;
    const contract = new window.web3.eth.Contract(CharityChainJSON.abi, contractAddress);
    // const contract = new web3.eth.Contract(CharityChainJSON.abi, contractAddress);

    // contract.methods.checkTransactions(nricHash).call().then(console.log);
    // contract.methods.addTransactions(nricHash, amount, message).estimateGas({from: accounts[0]}).then(console.log);
    contract.methods.addTransactions(nricHash, amount, message).send({from: accounts[0]}).on('receipt', function(receipt) {
      console.log(receipt);
    })
  } else {
    alert("Ethereum is not enabled!");
  }
  
}