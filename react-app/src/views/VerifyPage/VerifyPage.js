import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";

// core components
import Header from "components/Header/Header.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

// local components
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import { UserRecordTable } from "views/Components/DonationsTable";

const useStyles = makeStyles(styles);

const contractFunctions = require("../../contracts/utils/functions");
const web3 = contractFunctions.getWeb3();

export default function ProfilePage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const [nric, setNric] = useState("");
  const [submittedNRICHash, setNRICHash] = useState(
    "0x0000000000000000000000000000000000000000000000000000000000000000"
  );
  const onChangeHandlerNRIC = async (event) => {
    await setNric(event.target.value);
  };

    /**
     * Hashes input nric and set the state to the hash.
     */
  function onSubmitNRIC() {
    if (String(nric).length > 0) {
      setNRICHash(web3.utils.sha3(nric.toUpperCase()));
    }
  }
    /**
     * Used by Admin to add owner.
     */
  function addNewOwner() {
    const walletAddress = "0x7af9D93643553CbA5D1d297C3cBB451dBfAd1d09";
    // const sendFrom = "0xF87d7aee9C262249C5ebb1424a2FDE86A68D1c14";
    // contractFunctions.addAllContractOwner(walletAddress, sendFrom, web3);
    contractFunctions.checkContractOwner(walletAddress, "0xE34a7f5fC9d653Fb510494E857A387aA1426a4E4", web3).then(console.log);
    contractFunctions.checkContractOwner(walletAddress, "0xda532bb1cdf942cB2802EEb70BdbB9375b9203D5", web3).then(console.log);
    contractFunctions.checkContractOwner(walletAddress, "0x1Ed8BD5b9FfeC35A8F1a5fad3993bb6B8Fc3180B", web3).then(console.log);
    contractFunctions.checkContractOwner(walletAddress, "0xB8746a8fad46aDbEA4FA188956ef38FDF6350960", web3).then(console.log);
    contractFunctions.checkContractOwner(walletAddress, "0xe853F05E05D0ab97CD46BCAcf422384781f0Ed61", web3).then(console.log);
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
      <Parallax small filter image={require("assets/img/background3.jpg")} />
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
          <div
            className={classes.container}
            style={{
              padding: "24px",
            }}
          >
            <GridContainer justify='center'>
              <GridItem xs={12} sm={12} md={6}>
                <h2 className={classes.title}>Verify your donations.</h2>
                <p>
                  Don't worry, your NRICs are not recorded in the chain. We
                  store your NRIC Hash instead.
                </p>
              </GridItem>
              <br></br>
              <br></br>
              <GridItem xs={12} sm={12} md={8}>
                <br></br>
                <GridContainer
                  style={{
                    width: "420px",
                  }}
                >
                  <div
                    style={{
                      width: "80px",
                      marginTop: "auto",
                      marginBottom: "auto",
                      marginLeft: "16px",
                    }}
                  >
                    Your NRIC:
                  </div>
                  <input
                    style={{
                      height: "24",
                      width: "120px",
                      marginTop: "auto",
                      marginLeft: "20px",
                      marginBottom: "auto",
                    }}
                    labelText='Your NRIC'
                    id='nric'
                    onChange={onChangeHandlerNRIC}
                    type='text'
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                  <div
                    style={{
                      marginTop: "auto",
                      marginBottom: "auto",
                      marginLeft: "16px",
                    }}
                  >
                    Your NRIC hash : {submittedNRICHash}
                  </div>
                </GridContainer>
                <br></br>
                <Button
                  style={{
                    height: "12px",
                    width: "240px",
                    marginTop: "auto",
                    marginBottom: "auto",
                  }}
                  color='success'
                  size='lg'
                  onClick={onSubmitNRIC}
                >
                  Search
                </Button>
              </GridItem>
            </GridContainer>
            <br></br>
            <UserRecordTable
              nricHash={submittedNRICHash}
              style={{ padding: "24px" }}
            ></UserRecordTable>
          </div>
        </div>
      </div>
    </div>
  );
}
