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

const firestore = require('../../firebase');
const charities = require('../../util/charities');
const contractFunctions = require('../../contracts/utils/functions');

// const hello2 = firestore.doc(`onboarding/xmlVSpp4wO9f2TGEH0vu`);




const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export async function hello() {
  window.web3 = await contractFunctions.getWeb3();
  // functions.addTransaction("ganache");
  const id = firestore.firestore.doc(`onboarding/xmlVSpp4wO9f2TGEH0vu`).onSnapshot(function(doc) {
    console.log(doc.data());
  })
}

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;

  console.log(charities.charities);

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
