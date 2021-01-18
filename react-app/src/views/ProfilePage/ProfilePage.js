import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
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

import styles from "assets/jss/material-kit-react/views/profilePage.js";

// Table
import { OrgRecordTable } from "../Components/DonationsTable.js";

const useStyles = makeStyles(styles);
const { charities } = require("../../util/charities");
const contractFunctions = require("../../contracts/utils/functions");
const web3 = contractFunctions.getWeb3();

/**
 * Check if current wallet is one of charity's owner
 */
async function checkOwner(charityContract, web3) {
  const result = await contractFunctions.checkOwner(charityContract, web3);
  return result;
}

export default function ProfilePage(props) {
  const history = useHistory();
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
  if (org === -1) {
    window.location.href = "/invalid-uen";
  }

  const [ownerStatus, setOwnerStatus] = useState(0);
  checkOwner(org.contract, web3).then((status) => setOwnerStatus(status));

  function goToExplorer(contractAddress) {
    const ropstenURL = "https://ropsten.etherscan.io/address/";
    window.open(ropstenURL + contractAddress, "_blank");
  }

  const charityLogo = {
    height: "10em",
    width: "10em",
  };

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
          <Button
            href='/'
            style={{
              marginLeft: "2em",
              marginTop: "2em",
            }}
          >
            ← back to home
          </Button>
          <div className={classes.container}>
            <GridContainer justify='center'>
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img
                      src={require("../../assets/img/charities/" + org.img + ".jpg")}
                      alt='Organisation Logo'
                      className={imageClasses}
                      style={charityLogo}
                    />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>{org.name}</h3>
                  </div>
                  <div>
                    <a href='#' onClick={() => goToExplorer(org.contract)}>
                      view charity's contract on explorer
                    </a>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <div className={classes.description}>
              <p>
                Note: If you have recently added a donation, please wait till
                transaction has been mined before refreshing this page.
              </p>
            </div>
            <h2 className={classes.title}>Donations Received</h2>
            <div>
              <OrgRecordTable contract={org.contract}></OrgRecordTable>
            </div>
            <GridContainer justify='center'>
              <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                <span></span>

                {/* Display add transaction button if is owner */}
                {ownerStatus === 1 ? (
                  <Button
                    simple
                    color='success'
                    size='lg'
                    onClick={() => history.push(org.UEN + "/addtxn")}
                  >
                    + Add a transaction
                  </Button>
                ) : ownerStatus === 0 ? (
                  // If not owner, show message
                  "Note: You are not the admin of this charity. Please contact the CharityChain's admin if this is a mistake."
                ) : (
                      // If no valid Metamask or wallet provider
                      "Note: You do not have Metamask or an Ethereum wallet provider. If you are the charity admin, please configure a wallet provider."
                    )}
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
