import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Header from "components/Header/Header.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import profile from "assets/img/faces/christian.jpg";

import styles from "assets/jss/material-kit-react/views/profilePage.js";

import firebase from "firebase";
import database from "firebase.js";

const useStyles = makeStyles(styles);

const contractFunctions = require('../../contracts/utils/functions')
const charities = require('../../util/charities');
const web3 = contractFunctions.getWeb3();

export default function ProfilePage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);

  /**
   * Used by Wei Hong to add owner hehe.
   */
  async function addOwner() {
    const seanAddr = "0x1b13746A46FCC474e3d71Cd6678813C97fA945b1";
    // const charityContract = "0xEeD494fdCD9287c4B223Fa8810A83E822Da0A150";
    const sendFrom = "0xF87d7aee9C262249C5ebb1424a2FDE86A68D1c14";
    contractFunctions.addAllContractOwner(seanAddr, sendFrom, web3);
  }

  /**
   * Generate multiple sample donations based on sample data in charities.js.
   * Used by Wei Hong
   */
  async function addMultipleSampleDonations() {
    const addAmount = 50;
    for (let i = 0; i < addAmount; i++) {
      const sendFrom = await contractFunctions.getWalletAddress(web3);

      const sampleNRICs = charities.sampleNRICs;
      const nricIndex = Math.floor(Math.random() * sampleNRICs.length);
      const nricHash = sampleNRICs[nricIndex].nricHash;
      
      const sampleAmounts = charities.sampleAmounts;
      const amountIndex = Math.floor(Math.random() * sampleAmounts.length);
      const amount = sampleAmounts[amountIndex];

      const charityIndex = Math.floor(Math.random() * charities.charities.length);
      const charityContract = charities.charities[charityIndex].contract;

      const sampleDates = charities.sampleDates;
      const dateIndex = Math.floor(Math.random() * sampleDates.length);
      const date = sampleDates[dateIndex];

      const sampleMessages = charities.sampleMessages;
      const messageIndex = Math.floor(Math.random() * sampleMessages.length);
      const message = sampleAmounts[messageIndex];

      contractFunctions.addUserDonation(nricHash, amount, date, message, sendFrom, charityContract, web3)
      .on('transactionHash', function(hash) {
        console.log("Mining this transaction: " + hash);
      })
      .on('confirmation', function(confirmationNumber, receipt) {
        console.log("No: " + confirmationNumber + ", receipt: " + receipt);
      })
      .on('receipt', function(receipt) {
        console.log(receipt);
      })
      .on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
        alert("Transaction rejected! Check that this waller address have the permission or have enough ethers.");
        console.log(receipt);
      });

    }
  }


  async function addSampleDonation() {
    // Parameters 
    //TODO: Now dummy parameters are given, but these should be filled in with method parameter instead.
    //TODO: rmb that nric input taken by the form should be hashed before calling this method too.
    const nricHash = "0xded8af907adb3643df2490d59d1713f2a162e15864220503fdc6441e2b114ee7";
    const amount = 95000;
    const date = '02052021';
    const message = "by John Apple Seed daddy";
    const sendFrom = await contractFunctions.getWalletAddress(web3);
    const charityContractAddress = "0xde3653964686daAC5a96A14bfD096706022aE5cA";

    contractFunctions.addUserDonation(nricHash, amount, date, message, sendFrom, charityContractAddress, web3)
    .on('transactionHash', function(hash) {
      console.log("Mining this transaction: " + hash);
    })
    .on('confirmation', function(confirmationNumber, receipt) {
      console.log("No: " + confirmationNumber + ", receipt: " + receipt);
    })
    .on('receipt', function(receipt) {
      console.log(receipt);
    })
    .on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
      alert("Transaction rejected! Check that this waller address have the permission or have enough ethers.");
      console.log(receipt);
    });
  }

  return (
    <div>
      <Header
        color="transparent"
        brand="Charity"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white"
        }}
        {...rest}
      />
      <Parallax small filter image={require("assets/img/background.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img src={profile} alt="..." className={imageClasses} />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>Charity #1</h3>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <div className={classes.description}>
              <p>
                Brief description of Charity #1.
              </p>
            </div>
            <div>
                <h3>Add Transaction</h3>
            </div>
            <form>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                        labelText="NRIC"
                        id="nric"
                        formControlProps={{
                            fullWidth: true
                        }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                        labelText="Amount"
                        id="amount"
                        formControlProps={{
                            fullWidth: true
                        }}
                        />
                    </GridItem>
                    <CustomInput
                        labelText="Note"
                        id="Note"
                        formControlProps={{
                        fullWidth: true,
                        className: classes.textArea
                        }}
                        inputProps={{
                        multiline: true,
                        rows: 5
                        }}
                    />
                </GridContainer>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                        <Button color="success">
                            Done
                        </Button>
                        <Button color="success" onClick={addSampleDonation}>
                            Add donations
                        </Button>
                        <Button color="success" onClick={addOwner}>
                            add owner
                        </Button>
                    </GridItem>
                </GridContainer>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}