const utils = require('web3-utils');
const details = require('../utils/details');
const CharityChain = artifacts.require('CharityChain');

module.exports = function (deployer) {
  const {charities} = details;
  deployer.deploy(CharityChain, charities[0].address, charities[0].UEN);
};
