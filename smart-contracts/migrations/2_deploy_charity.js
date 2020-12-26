const utils = require('web3-utils');
const details = require('../utils/details');
const Onboarding = artifacts.require('Onboarding');
const CharityChain = artifacts.require('CharityChain');

module.exports = function (deployer) {
  const {owner, charities} = details;
  // deployer.deploy(CharityChain, charities[0].admin, charities[0].UEN);
  deployer.deploy(Onboarding, owner).then((onboarding) => {
    onboarding.onboardCharity(charities[0].admin, charities[0].UEN);
    onboarding.onboardCharity(charities[1].admin, charities[1].UEN);
    onboarding.onboardCharity(charities[1].admin, charities[1].UEN);
  })
};
