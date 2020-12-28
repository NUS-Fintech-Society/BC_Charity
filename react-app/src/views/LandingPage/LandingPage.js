import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import TeamSection from "./Sections/TeamSection.js";

import Web3 from 'web3';

const firestore = require('../../firebase');
const charities = require('../../util/charities');
const contractFunctions = require('../../contracts/utils/functions');

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

/**
 * Only used when new contracts are deployed to get addresses.
 */
async function getContracts() {
  window.web3 = await contractFunctions.getWeb3();
  charities.charities.forEach( async charity => {
    const contract = await contractFunctions.getCharityAddress(charity.UEN, 3);
    console.log("UEN: " + charity.UEN + ", contract: " + contract);
  })
}

//TODO: charities list are here but structure might not be ideal.
//TODO: additional fields like address and cause can be included in the "util/charities.js" file.
function getCharities() {
  return charities.charities;
}

//TODO: the data format a bit messy, maybe can arrange in chronological order?
async function getAllDonations() {
  // window.web3 = await contractFunctions.getWeb3();
  const web3 = await contractFunctions.getWeb3();
  // const infuraURL = 'https://ropsten.infura.io/v3/7fea032eb84442f5a78945d99a0b0953';
  // const infuraProvider = new Web3.providers.HttpProvider(infuraURL);
  // const web3 = new Web3(infuraProvider);
  // const accounts = await web3.eth.getAccounts();
  // console.log(accounts);
  // const web3 = await contractFunctions.getWeb3();
  // const web3 = new Web3(Web3.givenProvider);
  // console.log(web3.currentProvider);
  // console.log(web3.currentProvider.isMetaMask);

  const donations = await contractFunctions.getAllDonations(web3);
  return donations;
}

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;

  // Get the list of charities.
  const charities = getCharities();
  console.log(charities);

  // Get all donations.
  getAllDonations().then(console.log);

  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Charity"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      <Parallax filter image={require("assets/img/background.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Welcome to Charity.</h1>
              <h4>
                Our team aims to authenticate the legitimacy of charity organisations and store a record of donations.
              </h4>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection />
          <TeamSection />
        </div>
      </div>
    </div>
  );
}
