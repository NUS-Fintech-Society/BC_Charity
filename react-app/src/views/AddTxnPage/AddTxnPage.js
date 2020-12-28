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


  async function sampleAddDonation() {

    // Parameters 
    //TODO: Now dummy parameters are given, but these should be filled in with method parameter instead.
    //TODO: rmb that nric input taken by the form should be hashed before calling this method too.
    const nricHash = "0x0000000000000000000000000000000000000000000000000000000000000001";
    const amount = 30;
    const date = 27122020;
    const message = "hello 3";
    const sendFrom = "0x1b13746A46FCC474e3d71Cd6678813C97fA945b1";
    const charityContractAddress = "0xEeD494fdCD9287c4B223Fa8810A83E822Da0A150";

    contractFunctions.addUserDonation(nricHash, amount, date, message, sendFrom, charityContractAddress)
    .on('transactionHash', function(hash) {
      console.log("Mining this transaction: " + hash);
    })
    .on('confirmation', function(confirmationNumber, receipt) {
      console.log("No: " + confirmationNumber + ", receipt: " + receipt);
    })
    .on('receipt', function(receipt) {
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
                        <Button color="success" onClick={sampleAddDonation}>
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