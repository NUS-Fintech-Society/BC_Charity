import React, {useEffect, useRef, useState} from "react";
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

const state = {
  nric: "",

  note: "",
  nricError: "",
  amountError: "Invalid Amount. Amount must be greater than 0.00 e.g. 1.23",
  noteError:"Max 32 characters. Only accepts a-z,A-Z,0-9 and the following special characters: , ! . ? ; : - '"
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
      continue;
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

Number.prototype.countDecimals = function () {
  if(Math.floor(this.valueOf()) === this.valueOf()) return 0;
  return this.toString().split(".")[1].length || 0;
};


function validateAmt(amt) {
  const num = Number(amt);
  if (isNaN(num)) {
    return false;
  } else if (num < 0) {
    return false;
  } else if ( num.countDecimals() !== 2 ){
    return false;
  } else {
      return true;
  };

}

function validateNote(note) {
  let noteArr = note.split('');
  let value;

  if (noteArr.length > 32) {
    return false;
  }
  for (value of noteArr) {
      if (!(/[a-zA-Z0-9,!.?;:\-']/.test(value))) {
        return false;
      }
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
    const [nric, setNric] = useState('');
    const [nricError, setNricError] = useState('');
    const nricErrorMessageRef = useRef('');

    const [amt, setAmt] = useState('');
    const [amtError, setAmtError] = useState('');
    const amtErrorMessageRef = useRef('');

    const [note, setNote] = useState('');
    const [noteError, setNoteError] = useState('');
    const noteErrorMessageRef = useRef('');


  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);

    const onChangeHandlerNric = (event) => {
      const {name, value} = event.currentTarget;
        setNric(value);
    };

    const onChangeHandlerAmount = (event) => {
      const {name, value} = event.currentTarget;
      setAmt(value);
    };

    const onChangeHandlerNote = (event) => {
      const {name, value} = event.currentTarget;
      setNote(value);
    };

    const validateHelperNric = () => {


    if (!(validateNric(nric))) {
        nricErrorMessageRef.current = 'Currently Entered NRIC: ' + nric + '\nInvalid NRIC. e.g. S1234567X';
         setNricError('Invalid NRIC. e.g. S1234567X');
      console.log(nricErrorMessageRef.current);
    }

    if (nricErrorMessageRef.current !== '') {
      return false;
    }

    return true;
  };

    const validateHelperAmt = () => {
      if (!(validateAmt(amt))) {
        amtErrorMessageRef.current = "Current Entered Amount: " + amt + "\nInvalid Amount. Amount must be greater than 0.00 e.g. 1.23";
        setAmtError("Invalid Amount. Amount must be greater than 0.00 e.g. 1.23");
        console.log(amtErrorMessageRef.current);
      }
      if (amtErrorMessageRef.current !== '') {
        return false;
      }

      return true;
    };

    const validateHelperNote = () => {

      if (!(validateNote(note))) {
        noteErrorMessageRef.current = "Max 32 characters. Only accepts a-z,A-Z,0-9 and the following special characters: , ! . ? ; : - '";
        setNoteError("Max 32 characters. Only accepts a-z,A-Z,0-9 and the following special characters: , ! . ? ; : - '");
        console.log(noteErrorMessageRef.current);
      }

      if (noteErrorMessageRef.current !== '') {
        return false;
      }

      return true;
    };



  function handleSubmit() {
    const isValidNric = validateHelperNric();
    const isValidAmt = validateHelperAmt();
    const isValidNote = validateHelperNote();

    if (isValidNric) {
      console.log("Successful NRIC: " + nric);
      // clear forms
      setNricError('');
    }
    if (isValidAmt) {
      console.log("Successful Amount: " + amt);
      setAmtError('');
    }
    if (isValidNote) {
      console.log("Note: " + note);
      setNoteError('');
    }

    nricErrorMessageRef.current ='';
    amtErrorMessageRef.current = '';
    noteErrorMessageRef.current = '';
  }


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

              <form>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6} >
                    <input
                        labelText="NRIC (Case Sensitive)"
                        id="nric"
                        name = "nric"
                        formControlProps={{
                          fullWidth: true
                        }}
                        onChange={(e) => onChangeHandlerNric(e)}
                    />
                    <div style ={{fontSize:12 , color: "red"}}>{nricError}</div>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <input
                        labelText="Amount"
                        id="amount"
                        name = "amount"
                        formControlProps={{
                          fullWidth: true
                        }}
                        onChange={(e) => onChangeHandlerAmount(e)}

                    />
                    <div style ={{fontSize:12 , color: "red"}}>{amtError}</div>
                  </GridItem>
                  <input
                      labelText="Note"
                      id="note"
                      name = "note"
                      formControlProps={{
                        fullWidth: true,
                        className: classes.textArea
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 5
                      }}
                      onChange={e => onChangeHandlerNote(e)}
                  />
                  <div style ={{fontSize:12 , color: "red"}}>{noteError}</div>

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
                    <Button color="success" onClick ={handleSubmit}>
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