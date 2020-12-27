const Web3 = require('web3');
const infura = require('./infura');
const web3 = new Web3(infura.rpcURL);
const CharityChainJSON = require('../build/CharityChain.json');
const OnboardingJSON = require('../build/Onboarding.json');
// const charityFunctions = require('../../util/functions');
const charities = require('../../util/charities');

/**
 * Get current Web3 Provider and return configured Web3 instance.
 */
export async function getWeb3() {
  if (window.ethereum) {
    window.web3 = new Web3(window.web3.currentProvider);
    await window.ethereum.enable();
    return window.web3;
  } else {
    alert("Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!");
  }
}

/**
 * Onboard charity and returns a PromiEvent.
 * Validation of params are done on client side.
 * @param {string} adminAddress Charity's admin address
 * @param {string} UEN Charity's UEN
 * @param {string} sendFrom Wallet address of admin making this transaction
 * @param {string} network Ethereum network ID
 * @returns {Promise} the PromiEvent of the method called
 */
export function onboardCharity(adminAddress, UEN, sendFrom, networkID) {
  if (window.web3) {
    const onboardingContract = new window.web3.eth.Contract(OnboardingJSON.abi, CharityChainJSON.networks[networkID].address);
    return onboardingContract.methods.onboardCharity(adminAddress, UEN).send({from: sendFrom});
  } else {
    alert("Ethereum is not enabled!");
  }
}

/**
 * Get the Charity's address.
 * @param {*} UEN Charity's UEN
 * @returns {Promise} the PromiEvent of the method called
 */
export function getCharityAddress(UEN, networkID) {
  if (window.web3) {
    const onboardingContract = new window.web3.eth.Contract(OnboardingJSON.abi, OnboardingJSON.networks[networkID].address);
    return onboardingContract.methods.getCharityAddress(UEN).call();
  } else {
    alert("Ethereum is not enabled!");
  }
}

export function addUserDonation(nricHash, amount, date, message, sendFrom, charityContractAddress) {
  if (window.web3) {
    const charityChainContract = new window.web3.eth.Contract(CharityChainJSON.abi, charityContractAddress);
    return charityChainContract.methods.addDonation(nricHash, amount, date, message).send({from: sendFrom});
  } else {
    alert("Ethereum is not enabled!");
  }
}

export async function getUserDonations(nricHash, charityContractAddress) {
  if (window.web3) {
    const charityChainContract = new window.web3.eth.Contract(CharityChainJSON.abi, charityContractAddress);
    const donationCount = await charityChainContract.methods.getDonationCount(nricHash).call();
    
    var donations = [];
    for (let i = 0; i < donationCount; i++) {
      const donationResult = await charityChainContract.methods.getDonation(nricHash, i).call();
      const donation = {
        amount: donationResult[0],
        date: donationResult[1],
        message: donationResult[2],
      }
      donations.push(donation);
    }
    return donations;
  } else {
    alert("Ethereum is not enabled!");
  }
}

export async function getAllUserDonations(nricHash) {
  if (window.web3) {
    var allDonations = [];

    charities.charities.forEach(async charity => {
      const charityChainContract = new window.web3.eth.Contract(CharityChainJSON.abi, charity.contract);
      const donationCount = await charityChainContract.methods.getDonationCount(nricHash).call();

      for (let i = 0; i < donationCount; i++) {
        const donationResult = await charityChainContract.methods.getDonation(nricHash, i).call();
        const donation = {
          amount: donationResult[0],
          date: donationResult[1],
          message: donationResult[2],
          charity: charity
        }
        allDonations.push(donation);
      }
    });
    return allDonations;

  } else {
    alert("Ethereum is not enabled!");
  }
}

