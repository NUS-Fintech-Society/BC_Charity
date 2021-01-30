# Charity Chain

Charity Chain is a brand-new website that seeks to solve the problem of rising donation scams in Singapore in recent years. For example, during the COVID-19 Circuit Breaker period, the public had been warned of scammers who may take advantage of the situation and solicit donations from unsuspecting members of the public by impersonating organisations such as the World Health Organization or other legitimate charities. Scammers posing as charities is not an uncommon sight in Singapore, which is why there is a need to solve this problem.

Charities need your support, and we want to help them give you full confidence in your donations.
With our blockchain solution, charities can publicly and irrevocably commit the receipt of their donations for the world to see.
Donors can rest easy knowing that their donation was recieved and is accounted for as a matter of public record.
Never again will donors have doubts about being scammed or wonder if the donation they made really went to the charity of their choice.

## Table of Contents

- [Charity](#charity)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [BuildSetup](#buildsetup)
  - [File Structure](#file-structure)
  - [Questions or Feedback](#questions-or-feedback)
  - [Contributors](#contributors)

## Features

1. Verify transactions
- This function lists all transactions made from any NRIC. 
- Simply click on "Verify" and key in an NRIC to retrieve all relevant transactions made by the user with the particular NRIC.

2. Add a Transaction
- As a charity, call your smart contract and record the donations you receive using this website. 

3. Organisation Page
- Get a comprehensive summary of the donations that charities have been receiving. 
- Find out the amount of every donation, and see the notes and dedications that go with them.

## BuildSetup

### Running with no changes:

```
# change directory to the react-app
cd react-app

# install dependencies
npm install

# serve with hot reload at localhost:3000
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

This will have the CharityChain web app be deployed as is, with no change in the admin, ownership, transactions, charities or any other credentials / data used in our build.

### Adjusting the blockchain component

If you wish to redeploy CharityChain (start with a clean slate of transactions and charities) with yourself as the admin, you will have to run the following commands:

```
# First, compile the solidity code for use
cd ethr-contracts
truffle compile

# Put the compiled files into the react-app
cd react-app
mv ../ethr-contracts/build/contracts/CharityChain.json ./src/contracts/build/
```

Before the react app can actually see anything on the blockchain, the contract must be deployed.
The steps given here use ganache (which will host it only on your computer), while we deployed it on the testnet for public access:

1. Quick start Ethereum network on Ganache
1. Add `ethr-contracts/truffle-config.js` to the ganache add projects section. Save and Restart.
1. Add `.secret` file in `/ethr-contracts/` based on the mnemonic in Ganache.
1. Run `truffle migrate`
1. !!! **FILL IN** - Include infura, metamask, etc?

Now that the react app can point to the blockchain, you can load up the locally hosted react app to view the blockchain data on our website.
Now using Metamask, use the admin address used in deploying the charity to onboard charities, make transactions (more info [here](https://www.trufflesuite.com/docs/truffle/getting-started/truffle-with-metamask)).

## Questions or Feedback

If you have questions or have any feedback, reach out to us through GitHub.

## Contributors

- Bharath Sudheer (Team Lead) [@bharathcs](https://github.com/bharathcs)
- Ng Wei Hong (Assistant Team Lead) [@justweihong](https://github.com/justweihong)
- Benjamin Tan [@bentanjunrong](https://github.com/bentanjunrong)
- Gary Lim [@garysyndromes](https://github.com/garysyndromes/)
- Rachel Tan [@rxchtan](https://github.com/rxchtan)
- Sean Lee [@seanleeleelee](https://github.com/seanleeleelee)
