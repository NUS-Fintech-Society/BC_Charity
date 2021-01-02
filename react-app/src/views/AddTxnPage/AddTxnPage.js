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

const useStyles = makeStyles(styles);

let state = {
  nric: "",
  amount: "",
  note: "",
  nricError: "",
  amountError: "Invalid Amount. Amount must be greater than 0.00 e.g. 1.23",
  noteError:"Max 32 characters. Only accepts a-z,A-Z,0-9 and the following special characters: , ! . ? ; : - '"
}

function handleSubmit() {
  const isValid = validate();
  if (isValid) {
    console.log(state);
  }
}

function handleNricChange(value) {
  console.log(value + " nric error value");
  state.nric = value;

}

function handleAmountChange(value) {
  this.setState({
    amount: value
  });
}

function handleNoteChange(value) {
  this.setState({
    note: value
  });
}

function validateNric(nric){
  let nricArr = nric.split('');
  let start = 0;
  var value;
  if (nricArr.length !== 9) {
    return false;
  }
  for (value of nric.split('')) {
    if (start === 0) {
      // check if value = capital letter
      if (!(/[A-Z]/.test(value))) {
        return false;
      }
      start = start + 1;
    }
    if (start === 8) {
      // check if last letter = capital letter
      if (!(/[A-Z]/.test(value))) {
        return false;
      }
      return true;
    }
    if (isNaN(value)) {
      return false;
    }
    start = start + 1;

  }
}


function validate() {
  let nricError: "";
//    let amountError: "";
//    let noteError:"";

  if (validateNric(state.nric)) {
    nricError = "Invalid NRIC. e.g. S1234567X";
  }
  if (nricError) {
    this.setState({nricError})
    return false;
  }

  return true;
}


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
    const sendFrom = await contractFunctions.getWalletAddress(web3);
    const charityContractAddress = "0xEeD494fdCD9287c4B223Fa8810A83E822Da0A150";

    contractFunctions.addUserDonation(nricHash, amount, date, message, sendFrom, charityContractAddress, web3)
        .on('transactionHash', function (hash) {
          alert("Mining transaction...");
          console.log("Mining this transaction: " + hash);
        })
        .on('confirmation', function (confirmationNumber, receipt) {
          console.log("No: " + confirmationNumber + ", receipt: " + receipt);
        })
        .on('receipt', function (receipt) {
          alert("Success! Transaction has been completed.");
          console.log(receipt);
        })
        .on('error', function (error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
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

              <form onSubmit={handleSubmit} >
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                        labelText="NRIC (Case Sensitive)"
                        id="nric"
                        formControlProps={{
                          fullWidth: true
                        }}
                        onChange={e => handleNricChange(e.target.value)}
                    />
                    <div style ={{fontSize:12 , color: "red"}}>{state.nricError}</div>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                        labelText="Amount"
                        id="amount"
                        formControlProps={{
                          fullWidth: true
                        }}
                        onChange={e => handleAmountChange(e.target.value)}

                    />
                    <div style ={{fontSize:12 , color: "red"}}>{state.amountError}</div>
                  </GridItem>
                  <CustomInput
                      labelText="Note"
                      id="note"
                      formControlProps={{
                        fullWidth: true,
                        className: classes.textArea
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 5
                      }}
                      onChange={e => handleNoteChange(e.target.value)}
                  />
                  <div style ={{fontSize:12 , color: "red"}}>{state.noteError}</div>

                  {/*<div className="alert alert-danger">*/}
                  {/*    <div className="container-fluid">*/}
                  {/*        <div className="alert-icon">*/}
                  {/*            <i className="material-icons">error_outline</i>*/}
                  {/*        </div>*/}
                  {/*        <button type="button" className="close" data-dismiss="alert" aria-label="Close">*/}
                  {/*            <span aria-hidden="true"><i className="material-icons">clear</i></span>*/}
                  {/*        </button>*/}
                  {/*           <div>*/}
                  {/*               <b>Error:</b> Please check the following inputs.*/}
                  {/*           </div>*/}
                  {/*        <div>*/}
                  {/*            NRIC: Valid NRIC (Case Sensitive) e.g. S1234567X*/}
                  {/*        </div>*/}
                  {/*        <div>*/}
                  {/*            Amount: Amount must be greater than 0.00 e.g. 1.23*/}
                  {/*        </div>*/}
                  {/*        <div>*/}
                  {/*        Note: Max 32 characters. Only accepts a-z,A-Z,0-9 and the following special characters: , ! . ? ; : - '*/}
                  {/*        </div>*/}
                  {/*    </div>*/}
                  {/*</div>*/}

                </GridContainer>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                    <Button color="success" onClick={handleSubmit}>
                      Done
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