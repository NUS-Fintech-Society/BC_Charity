import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import TeamSection from "./Sections/TeamSection.js";
import WorkSection from "./Sections/WorkSection.js";

// Web3
const Web3 = require('web3');
const rpcURL = "https://ropsten.infura.io/v3/7fea032eb84442f5a78945d99a0b0953";
const web3 = new Web3(rpcURL);

// Contract deployed on Ropsten
const contractAddress = "0xD301b7ACdeF30e7721c311Cfbd17Ba71094ec0e4";
const walletAddress = "0xF87d7aee9C262249C5ebb1424a2FDE86A68D1c14"; // Wei Hong's Wallet.


const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;

  //Test Web3
  const address = "0x90e63c3d53E0Ea496845b7a03ec7548B70014A91";
  web3.eth.getBalance(address, (err, wei) => {
    var balance = web3.utils.fromWei(wei, 'ether')
    console.log(balance); // This should be 5.096220648983052418 Ether
  })
  
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
