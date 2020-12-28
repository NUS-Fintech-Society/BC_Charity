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

import profile from "assets/img/faces/christian.jpg";

import styles from "assets/jss/material-kit-react/views/profilePage.js";

const useStyles = makeStyles(styles);
const contractFunctions = require('../../contracts/utils/functions');

//TODO: ultimately each charity page should has its own route, so maybe the path differentiation can use UEN or contract address.
//TODO: this method should also take in the contract address of the current charity page.
async function getCharityDonations() {
  window.web3 = await contractFunctions.getWeb3();
  const sampleContract = "0xC897d46a255004c3E2b46FbD5Ac726d866Ebf5d7";
  return contractFunctions.getCharityDonations(sampleContract);
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

  getCharityDonations().then(console.log);

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
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                <Button simple color="success" size="lg" onClick={(e) => {
                  e.preventDefault();
                  window.location.href='/addtxn';
                }}>
                  + Add a transaction
                </Button>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
