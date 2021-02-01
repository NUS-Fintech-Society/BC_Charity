import React, { useRef, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
// core components
import Header from "components/Header/Header.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/profilePage.js";

const useStyles = makeStyles(styles);

/**
 *To Validate nric field input
 * @param nric is taken from nric input field.
 * @returns {boolean} depending on whether nric is valid. i.e. All caps and containing 7 numbers.
 */
function validateNric(nric) {
  let nricArr = nric.split("");
  if (nricArr.length !== 9) {
    return false;
  }
  for (let i = 0; i < nricArr.length; i++) {
    let value = nricArr[i];
    if (i === 0 || i === 8) {
      if (!/[A-Z]/.test(value)) {
        return false;
      }
    } else if (isNaN(value)) {
      return false;
    }
  }
  return true;
}

/**
 *To Validate amount field input
 * @param amt is taken from amt input field.
 * @returns {boolean} depending on whether amount is valid. i.e. amount greater than 0.
 */
function validateAmt(amt) {
  if (isNaN(amt) || amt <= 0 || amt - Math.floor(amt) !== 0) {
    return false;
  }
  return true;
}

/**
 *To Validate note field input
 * @param note is taken from note input field.
 * @returns {boolean} depending on whether note is valid. i.e. note entered must be less than 32 characters containing only a-z A-Z , ! . ? ; : - '
 */
function validateNote(note) {
  let noteArr = note.split("");
  let value;

  if (noteArr.length > 32) {
    return false;
  }
  for (value of noteArr) {
    if (!/[a-zA-Z0-9,!.?;:\-'\s]/.test(value)) {
      return false;
    }
  }
  return true;
}
/**
 *To Validate date field input
 * @param dateString is taken from date input field.
 * @returns {boolean} depending on whether date is valid. i.e. date entered must be valid date formatted as "dd/mm/yyyy"
 */
function validateDate(dateString) {
  // First check for the pattern
  if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) return false;

  // Parse the date parts to integers
  var parts = dateString.split("/");
  var day = parseInt(parts[0], 10);
  var month = parseInt(parts[1], 10);
  var year = parseInt(parts[2], 10);

  // Check the ranges of month and year
  if (year < 1000 || year > 3000 || month === 0 || month > 12) return false;

  var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Adjust for leap years
  if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0))
    monthLength[1] = 29;

  // Check the range of the day
  return day > 0 && day <= monthLength[month - 1];
}

const firestore = require("../../firebase");
const contractFunctions = require("../../contracts/utils/functions");
const web3 = contractFunctions.getWeb3();

export default function ProfilePage(props) {
  const history = useHistory();

  const { charities } = require("../../util/charities");

  //fetch routing value
  const { uen } = useParams();
  const getOrgInfo = () => {
    const matches = charities.filter((charity) => charity.UEN === uen);
    if (matches.length !== 1) {
      return -1;
    } else {
      return matches[0];
    }
  };
  const org = getOrgInfo(uen);
  if (org === -1) {
    window.location.href = "/invalid-uen";
  }


  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  // Hooks to track input nric, amount, note and date.
  const [nric, setNric] = useState("");
  const [nricError, setNricError] = useState("");
  const nricErrorMessageRef = useRef("");

  const [amt, setAmt] = useState("");
  const [amtError, setAmtError] = useState("");
  const amtErrorMessageRef = useRef("");

  const [note, setNote] = useState("");
  const [noteError, setNoteError] = useState("");
  const noteErrorMessageRef = useRef("");

  const [date, setDate] = useState("");
  const [dateError, setDateError] = useState("");
  const dateErrorMessageRef = useRef("");

  const onChangeHandlerNric = (event) => {
    const { value } = event.currentTarget;
    setNric(value);
  };

  const onChangeHandlerAmount = (event) => {
    const { value } = event.currentTarget;
    setAmt(Number(value) * 100);
  };

  const onChangeHandlerNote = (event) => {
    const { value } = event.currentTarget;
    setNote(value);
  };

  const onChangeHandlerDate = (event) => {
    const { value } = event.currentTarget;
    setDate(value);
  };

  /**
   *Helper function to validate nric field input. Sets the error message for the nric input field if input is not valid.
   * @returns {boolean} depending on whether nric is valid. i.e. All caps and containing 7 numbers.
   */
  const validateHelperNric = () => {
    if (!validateNric(nric)) {
      nricErrorMessageRef.current =
        "Currently Entered NRIC: " + nric + "\nInvalid NRIC. e.g. S1234567X";
      setNricError("Invalid NRIC. e.g. S1234567X");
    }

    if (nricErrorMessageRef.current !== "") {
      return false;
    }

    return true;
  };

  /**
   *Helper function to validate amount field input. Sets the error message for the amount input field if input is not valid.
   * @returns {boolean} depending on whether amount is valid. i.e. amount greater than 0.
   */
  const validateHelperAmt = () => {
    if (!validateAmt(amt)) {
      amtErrorMessageRef.current =
        "Current Entered Amount: " +
        amt +
        "\nInvalid Amount. Amount must be greater than 0.00 e.g. 1.23";
      setAmtError("Invalid Amount. Amount must be greater than 0.00 e.g. 1.23");
    }
    if (amtErrorMessageRef.current !== "") {
      return false;
    }
    return true;
  };

  /**
   *Helper function to validate note field input. Sets the error message for the note input field if input is not valid.
   * @returns {boolean} depending on whether note is valid. i.e. note entered must be less than 32 characters containing only a-z A-Z , ! . ? ; : - '
   */
  const validateHelperNote = () => {
    if (!validateNote(note)) {
      noteErrorMessageRef.current =
        "Max 32 characters. Only accepts a-z,A-Z,0-9 and the following special characters: , ! . ? ; : - '";
      setNoteError(
        "Max 32 characters. Only accepts a-z,A-Z,0-9 and the following special characters: , ! . ? ; : - '"
      );
    }

    if (noteErrorMessageRef.current !== "") {
      return false;
    }

    return true;
  };

  /**
   *Helper function to validate date field input. Sets the error message for the date input field if input is not valid.
   * @returns {boolean} depending on whether date is valid. i.e. date entered must be valid date formatted as "dd/mm/yyyy"
   */
  const validateHelperDate = () => {
    if (!validateDate(date)) {
      dateErrorMessageRef.current =
        "Invalid Date. Date input should be in the format: DD/MM/YYYY." +
        "\n" +
        "Please include the '/'";
      setDateError(
        "Invalid Date. Date input should be in the format: DD/MM/YYYY"
      );
    }

    if (dateErrorMessageRef.current !== "") {
      return false;
    }

    return true;
  };

  /**
   *On Submit, this will call the validation functions of the input fields. If input is valid, no error message will be shown.
   * and upon successful validation of all fields, the input fields and error messages will be cleared. And a new donation will be recorded.
   */
  function handleSubmit() {
    const isValidNric = validateHelperNric();
    const isValidAmt = validateHelperAmt();
    const isValidNote = validateHelperNote();
    const isValidDate = validateHelperDate();

    if (isValidNric) {
      setNricError("");
    }
    if (isValidAmt) {
      setAmtError("");
    }
    if (isValidNote) {
      setNoteError("");
    }
    if (isValidDate) {
      setDateError("");
    }

    nricErrorMessageRef.current = "";
    amtErrorMessageRef.current = "";
    noteErrorMessageRef.current = "";
    dateErrorMessageRef.current = "";

    if (isValidNric && isValidAmt && isValidNote && isValidDate) {
      addDonationHelper();
    }
  }

  /**
   * Adding a new owner
   */
  // eslint-disable-next-line
  async function addOwner() {
    const seanAddr = "0x1b13746A46FCC474e3d71Cd6678813C97fA945b1";
    // const charityContract = "0xEeD494fdCD9287c4B223Fa8810A83E822Da0A150";
    const sendFrom = "0xF87d7aee9C262249C5ebb1424a2FDE86A68D1c14";
    contractFunctions.addAllContractOwner(seanAddr, sendFrom, web3);
  }
  /**
   * Helper function to addDonation. Formats the input to pass to addDonation function.
   */
  function addDonationHelper() {
    const hash = web3.utils.sha3(nric);
    const amount = Number(amt);

    var parts = date.split("/");
    var day = parts[0];
    var month = parts[1];
    var year = parts[2];

    if (day.length === 1) {
      day = "0" + day;
    }
    if (month.length === 1) {
      month = "0" + month;
    }
    const dateFormatted = day + month + year;

    addDonation(hash, amount, dateFormatted, note);
  }

  /**
   * Adds a new donation to the blockchain. Parameters are formatted in addDonationHelper().
   * @param hashString hashed nric string
   * @param amt amount donated
   * @param dateFormatted formatted date
   * @param note note
   */
  async function addDonation(hashString, amt, dateFormatted, note) {
    const nricHash = hashString;
    const amount = amt;
    const date = dateFormatted;
    const message = note;
    const sendFrom = await contractFunctions.getWalletAddress(web3);
    const charityContractAddress = org.contract;

    contractFunctions
      .addUserDonation(
        nricHash,
        amount,
        date,
        message,
        sendFrom,
        charityContractAddress,
        web3
      )
      .on("transactionHash", function (hash) {
        // Add donation (with transaction hash) into Firestore
        firestore
          .addDonation(nricHash, amount.toString(), date, message, hash)
          .then(() => {
            const ropstenURL = "https://ropsten.etherscan.io/tx/";
            window.open(ropstenURL + hash, "_blank");
            history.goBack();
          });
      })
      .on("confirmation", function (confirmationNumber, receipt) {
      })
      .on("receipt", function (receipt) {
        alert("Success! Transaction has been completed.");
      })
      .on("error", function (error, receipt) {
        // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
        alert(
          "Transaction rejected! Check that this waller address have the permission or have enough ethers."
        );
      });
  }

  return (
    <div>
      <Header
        color='transparent'
        brand='CharityChain'
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white",
        }}
        {...rest}
      />
      <Parallax small filter image={require("assets/img/background.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify='center'>
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img
                      src={require("../../assets/img/charities/" + org.img + ".jpg")}
                      alt='Organisation Logo'
                      className={imageClasses}
                    />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>{org.name}</h3>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <div className={classes.description}>
              <p>
                Note: You need to be a charity admin for the transaction to be
                processed successfully.
              </p>
            </div>
            <div>
              <h3>Add Donation</h3>
            </div>

            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <Input
                  labelText='NRIC (Case Sensitive)'
                  id='nric'
                  placeholder='NRIC (Case Sensitive)'
                  formControlProps={{
                    fullWidth: true,
                  }}
                  onChange={(e) => onChangeHandlerNric(e)}
                />
                <div style={{ fontSize: 12, color: "red" }}>{nricError}</div>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <Input
                  labelText='Amount'
                  id='amount'
                  placeholder='Amount (dollars)'
                  formControlProps={{
                    fullWidth: true,
                  }}
                  onChange={(e) => onChangeHandlerAmount(e)}
                />
                <div style={{ fontSize: 12, color: "red" }}>{amtError}</div>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem alignItems='stretch'>
                <Input
                  labelText='Note'
                  id='note'
                  placeholder='Note'
                  multiline='true'
                  formControlProps={{
                    fullWidth: true,
                    className: classes.textArea,
                  }}
                  inputProps={{
                    multiline: true,
                    rows: 5,
                  }}
                  onChange={(e) => onChangeHandlerNote(e)}
                />
                <div style={{ fontSize: 12, color: "red" }}>{noteError}</div>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <Input
                  labelText='Date'
                  id='date'
                  placeholder='Date: DD/MM/YYYY'
                  formControlProps={{
                    fullWidth: true,
                  }}
                  onChange={(e) => onChangeHandlerDate(e)}
                />
                <div style={{ fontSize: 12, color: "red" }}>{dateError}</div>
              </GridItem>
            </GridContainer>
            <GridContainer justify='center'>
              <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                <Button color='success' onClick={handleSubmit}>
                  Done
                </Button>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
