import React, { useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

import Table from "../../Components/Table";
import { AllDonationsTable } from "../../Components/DonationsTable";

// Table Stuff
import { charities, onboarding, columns } from "../../../util/charities"
import { getCharities } from "../../../firebase"

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();

  // const allCharities = getCharities();

  // useEffect(async () => {
  //   const allCharities = await getCharities();
  //   console.log(allCharities);
  //   console.log("done")
  // })

  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>About us.</h2>
          <h5 className={classes.description}>
            Fintech is beginning to disrupt the financial world as we know it.
            The financial industry is now more focused than ever on technological innovation than at any other time.
            Since the large majority of Fintech companies deal with high volumes of fund movements, this results in
            a higher vulnerability to theft of funds. This is especially prevalent in donations to charity organisations,
            where donations are slowly shifting away from physical donations to digitalised.
          </h5>
        </GridItem>
      </GridContainer>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h3 className={classes.title}>We aim to be:</h3>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <InfoArea
                title="Secure"
                description="<insert description here>"
                icon={VerifiedUser}
                iconColor="success"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <InfoArea
                title="Unique"
                description="<insert description here>"
                icon={Fingerprint}
                iconColor="danger"
                vertical
              />
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
      <br></br>
      <h2 className={classes.title}>Data</h2>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <h4 className={classes.title}>List of Charities</h4>
            <Table
              rows={charities}
              columns={columns}
              isRedirect={true}
            ></Table>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <h4 className={classes.title}>Transaction List</h4>
            <AllDonationsTable></AllDonationsTable>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}