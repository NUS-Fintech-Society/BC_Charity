import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
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

const charities = require("../../util/charities");
const contractFunctions = require("../../contracts/utils/functions");
const dashboardRoutes = [];

const useStyles = makeStyles(styles);

/**
 * Only used when new contracts are deployed to get addresses.
 */
// eslint-disable-next-line
async function getContracts() {
  charities.charities.forEach(async (charity) => {
    const contract = await contractFunctions.getCharityAddress(charity.UEN, 3);
    console.log("UEN: " + charity.UEN + ", contract: " + contract);
  });
}

// eslint-disable-next-line
function getCharities() {
  return charities.charities;
}

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;

  return (
    <div>
      <Header
        color='transparent'
        routes={dashboardRoutes}
        brand='CharityChain'
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />
      <Parallax filter image={require("assets/img/background.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Welcome to CharityChain.</h1>
              <h4>
                Our team aims to authenticate the legitimacy of charity
                organisations and store a record of donations.
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
