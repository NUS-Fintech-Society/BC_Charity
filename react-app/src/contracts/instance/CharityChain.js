const CharityChainJSON = require('../build/CharityChain.json');

export const getCharityChainContract = (web3, networkId) => {
  return new web3.eth.Contract(
    CharityChainJSON.abi,
    CharityChainJSON.networks[networkId].address
  );
};