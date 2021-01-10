import React from "react";
import { useParams } from "react-router-dom";
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

// Table
import { OrgRecordTable } from "../Components/DonationsTable.js";

const useStyles = makeStyles(styles);
const { charities } = require("../../util/charities");
const contractFunctions = require('../../contracts/utils/functions');
const web3 = contractFunctions.getWeb3();

//TODO: ultimately each charity page should has its own route, so maybe the path differentiation can use UEN or contract address.
//TODO: this method should also take in the contract address of the current charity page.
async function getCharityDonations() {
  const sampleContract = "0x6c262aa3a7333933BC33f9F7019D7A59021F9dC1";
  return contractFunctions.getCharityDonations(sampleContract, web3);
}

export default function ProfilePage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

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
  if (org == -1) {
    window.location.href = "/invalid-uen";
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
                    <img src={profile} alt='...' className={imageClasses} />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>{org.name}</h3>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <div className={classes.description}>
              <p>Brief description of Chrity #1.</p>
            </div>
            <h2 className={classes.title}>Record of Donations</h2>
            <div>
              <OrgRecordTable contract={org.contract}></OrgRecordTable>
            </div>
            <GridContainer justify='center'>
              <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                <Button
                  simple
                  color='success'
                  size='lg'
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = uen + "/addtxn";
                  }}
                >
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
