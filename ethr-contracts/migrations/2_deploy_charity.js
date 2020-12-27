const utils = require('web3-utils');
const details = require('../utils/details');
const Onboarding = artifacts.require('Onboarding');
const CharityChain = artifacts.require('CharityChain');

module.exports = function (deployer) {
  const {owner, charities} = details;
  // deployer.deploy(CharityChain, charities[0].admin, charities[0].UEN);
  deployer.deploy(Onboarding, owner).then((onboarding) => {
    charities.forEach((charity) => {
      onboarding.onboardCharity(charity.admin, charity.UEN);
    })
  })
};
