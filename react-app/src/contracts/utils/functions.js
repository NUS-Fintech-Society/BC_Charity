const Web3 = require('web3');
var Contract = require('web3-eth-contract');
const infura = require('./infura');
const CharityChainJSON = require('../build/CharityChain.json');
const OnboardingJSON = require('../build/Onboarding.json');
// const charityFunctions = require('../../util/functions');
const charities = require('../../util/charities');

/**
 * ! window.web3 is not used.
 * Use either Metamask or infura as providers to return new Web3 instance.
 */
export function getWeb3() {

  // Use Metamask as Web3 provider if extension is enabled.
  const web3 = new Web3(Web3.givenProvider);
  if (web3.currentProvider && web3.currentProvider.isMetaMask) {
    return new Web3(window.web3.currentProvider);

    // Else use Infura as provider.
  } else {
    const infuraProvider = new Web3.providers.HttpProvider(infura.rpcURL);
    return new Web3(infuraProvider);
  }
}


/**
 * ! window.ethereum.enable() is deprecated so not used.
 * Get user first wallet address in Metamask.
 * @param {*} web3 
 */
export async function getWalletAddress(web3) {

  // Error if Metamask not enabled.
  if (!window.ethereum || !web3 || !web3.eth) {
    alert("This action requires ether but Metamask or other wallet providers are not enabled.");
  } else {

    const walletAddress = await window.ethereum.request({ method: 'eth_requestAccounts' });
    return walletAddress[0];
  }
}

/**
 * Onboard charity and returns a PromiEvent.
 * Validation of params are done on client side.
 * @param {string} adminAddress Charity's admin address
 * @param {string} UEN Charity's UEN
 * @param {string} sendFrom Wallet address of admin making this transaction
 * @param {string} network Ethereum network ID
 * @param {Web3} web3 Web3 instance
 * @returns {Promise} the PromiEvent of the method called
 */
export function onboardCharity(adminAddress, UEN, sendFrom, networkID, web3) {
  const onboardingContract = new web3.eth.Contract(OnboardingJSON.abi, CharityChainJSON.networks[networkID].address);
  return onboardingContract.methods.onboardCharity(adminAddress, UEN).send({ from: sendFrom });
}

/**
 * Get the Charity's address.
 * @param {string} UEN Charity's UEN
 * @param {Number} networkID Ethereum's network ID
 * @param {Web3} web3 Web3 instance
 * @returns {Promise} the PromiEvent of the method called
 */
export function getCharityAddress(UEN, networkID, web3) {
  const onboardingContract = new web3.eth.Contract(OnboardingJSON.abi, OnboardingJSON.networks[networkID].address);
  return onboardingContract.methods.getCharityAddress(UEN).call();
}

/**
 * Adds a user donation.
 * @param {string} nricHash NRIC of hash in bytes32 format. 
 * @param {string} amount amount in cents
 * @param {string} date date in DDMMYYYY format
 * @param {string} message message
 * @param {string} sendFrom address of user making the transaction
 * @param {string} charityContractAddress charity's smart contract
 * @param {Web3} web3 Web3 instance
 */
export function addUserDonation(nricHash, amount, date, message, sendFrom, charityContractAddress, web3) {
  const charityChainContract = new web3.eth.Contract(CharityChainJSON.abi, charityContractAddress);
  return charityChainContract.methods.addDonation(nricHash, amount, date, message).send({ from: sendFrom });
}

/**
 * Gets user's donations for a specific charity
 * @param {string} nricHash NRIC of hash in bytes32 format.
 * @param {string} charityContractAddress charity's smart contract
 * @param {Web3} web3 Web3 instance
 */
export async function getUserDonations(nricHash, charityContractAddress, web3) {
  const charityChainContract = new web3.eth.Contract(CharityChainJSON.abi, charityContractAddress);
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
}

/**
 * Gets user's donations across all charities.
 * This will be used in verify page.
 * @param {string} nricHash NRIC of hash in bytes32 format.
 * @param {Web3} web3 Web3 instance
 */
export async function getAllUserDonations(nricHash, web3) {
  var allDonations = [];

  charities.charities.forEach(async charity => {
    const charityChainContract = new web3.eth.Contract(CharityChainJSON.abi, charity.contract);
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
}

/**
 * Get all donations from all charities.
 * @param {Web3} web3 Web3 instance
 */
export async function getAllDonations(web3) {

  var allDonations = [];

  // For each charity
  charities.charities.forEach(async charity => {
    const charityChainContract = new web3.eth.Contract(CharityChainJSON.abi, charity.contract);

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
}

/**
 * Get Charity's donations.
 * @param {string} charityContract charity's contract
 * @param {Web3} web3 Web3 instance
 */
export async function getCharityDonations(charityContract, web3) {
  const charityChainContract = new web3.eth.Contract(CharityChainJSON.abi, charityContract);
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
}

/**
 * For Admin to add owner of a specific charity.
 * @param {string} walletAddress 
 * @param {string} contract Charity's contract
 * @param {string} sendFrom 
 * @param {Web3} web3 Web3 instance
 */
export async function addContractOwner(walletAddress, contract, sendFrom, web3) {
  const charityChainContract = new web3.eth.Contract(CharityChainJSON.abi, contract);
  charityChainContract.methods.addOwner(walletAddress).send({ from: sendFrom });
}

/**
 * For Admin to add owner to all charities
 * @param {string} walletAddress 
 * @param {Web3} web3 Web3 instance
 */
export async function addAllContractOwner(walletAddress, sendFrom, web3) {
  charities.charities.forEach(charity => {
    const charityChainContract = new web3.eth.Contract(CharityChainJSON.abi, charity.contract);
    charityChainContract.methods.addOwner(walletAddress).send({ from: sendFrom });;
  });
}


