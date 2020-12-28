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

/**
 * Adds a user donation.
 * @param {string} nricHash NRIC of hash in bytes32 format. 
 * @param {string} amount amount in cents
 * @param {string} date date in DDMMYYYY format
 * @param {string} message message
 * @param {string} sendFrom address of user making the transaction
 * @param {string} charityContractAddress charity's smart contract
 */
export function addUserDonation(nricHash, amount, date, message, sendFrom, charityContractAddress) {
  if (window.web3) {
    const charityChainContract = new window.web3.eth.Contract(CharityChainJSON.abi, charityContractAddress);
    return charityChainContract.methods.addDonation(nricHash, amount, date, message).send({from: sendFrom});
  } else {
    alert("Ethereum is not enabled!");
  }
}

/**
 * Gets user's donations for a specific charity
 * @param {string} nricHash NRIC of hash in bytes32 format.
 * @param {string} charityContractAddress charity's smart contract
 */
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

/**
 * Gets user's donations across all charities.
 * This will be used in verify page.
 * @param {*} nricHash NRIC of hash in bytes32 format.
 */
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

/**
 * Get all donations from all charities.
 */
export async function getAllDonations() {
  if (window.web3) {

    var allDonations = [];

    // For each charity
    charities.charities.forEach(async charity => {
      const charityChainContract = new window.web3.eth.Contract(CharityChainJSON.abi, charity.contract);
      
      // For each donor
      const donors = await charityChainContract.methods.getDonors().call();
      donors.forEach(async donor => {
        const donationCount = await charityChainContract.methods.getDonationCount(donor).call();

        // Get donations
        for (let i = 0; i < donationCount; i++) {
          const donationResult = await charityChainContract.methods.getDonation(donor, i).call();
          const donation = {
            amount: donationResult[0],
            date: donationResult[1],
            message: donationResult[2],
            donor: donor,
            charity: charity
          }
          allDonations.push(donation);
        }
      });

    })
    return allDonations;
    
  } else {
    alert("Ethereum is not enabled!");
  }
}

/**
 * Get Charity's donations.
 * @param {string} charityContract charity's contract
 */
export async function getCharityDonations(charityContract) {
  if (window.web3) {
    const charityChainContract = new window.web3.eth.Contract(CharityChainJSON.abi, charityContract);
    var allDonations = [];

    // For each donor
    const donors = await charityChainContract.methods.getDonors().call();
    donors.forEach(async donor => {
      const donationCount = await charityChainContract.methods.getDonationCount(donor).call();

      // Get donations
      for (let i = 0; i < donationCount; i++) {
        const donationResult = await charityChainContract.methods.getDonation(donor, i).call();
        const donation = {
          amount: donationResult[0],
          date: donationResult[1],
          message: donationResult[2],
          donor: donor
        }
        allDonations.push(donation);
      }
    });

    return allDonations;

  } else {
    alert("Ethereum is not enabled!");
  }
}

