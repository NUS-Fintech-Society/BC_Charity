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
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import { UserRecordTable } from "views/Components/DonationsTable";
import { useState } from 'react';

const useStyles = makeStyles(styles);

const contractFunctions = require("../../contracts/utils/functions");
const web3 = contractFunctions.getWeb3();

// TODO: this function should have a parameter: user's HASHED nric, so the hashing also need to handle.
async function getSampleUserDonations(nric) {
  // Parameters
  const nricHash = web3.utils.sha3(nric.toUpperCase());

  // Method call
  const donations = await contractFunctions.getAllUserDonations(nricHash, web3);
  console.log(donations);
}

export default function ProfilePage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  const [nric, setNric] = useState('');
  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === 'nric') {
      setNric(value);
    }
  };

  return (
    <div>
      <Header
        color='transparent'
        brand='Charity'
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white",
        }}
        {...rest}
      />
      <Parallax small filter image={require("assets/img/background3.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify='center'>
              <GridItem xs={12} sm={12} md={6}>
                <h2 className={classes.title}>Verify your transaction.</h2>
              </GridItem>
              <br></br>
              <br></br>
              <GridItem xs={12} sm={12} md={8}>
                <p>NRIC: </p>
                <input
                  labelText='Your NRIC'
                  id='nric'
                  onChange={(event) => onChangeHandler(event)}
                  name="nric"
                  type="text"
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
              <CardFooter className={classes.cardFooter}>
                <Button simple color='success' size='lg'>
                  Submit
                </Button>
                <Button
                  simple
                  color='success'
                  size='lg'
                  onClick={getSampleUserDonations(nric)}
                >
                  Get Sample User Donations
                </Button>
              </CardFooter>
            </GridContainer>
            <UserRecordTable nricHash={web3.utils.sha3(nric.toUpperCase())}></UserRecordTable>
          </div>
        </div>
      </div>
    </div >
  );
}
