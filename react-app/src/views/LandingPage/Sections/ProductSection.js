import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import Table from "../../Components/Table";
import { AllDonationsTable } from "../../Components/DonationsTable";
import { charities, columns } from "../../../util/charities";
// styles
import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  const charitiesList = {
    cursor: "pointer",
  };

  return (
    <div className={classes.section}>
      <GridContainer justify='center'>
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>About us.</h2>
          <h5 className={classes.description}>
            Charities need your support, and we want to help them give you full
            confidence in your donations. With our blockchain solution,
            charities can publicly and irrevocably commit the reciept of the
            donation for the world to see. Donors can rest easy knowing that
            their donation was recieved and is accounted for as a matter of
            public record.
          </h5>
        </GridItem>
      </GridContainer>
      <GridContainer justify='center'>
        <GridItem xs={12} sm={12} md={8}>
          <h3 className={classes.title}>Our solution is</h3>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <InfoArea
                title='Secure'
                description="Only the charity's designated wallet can add transactions. Once made, transactions cannot be modified or revoked."
                icon={VerifiedUser}
                iconColor='success'
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <InfoArea
                title='Private'
                description='Donors can find their transactions using their NRIC, without the blockchain revealing their NRIC to the public.'
                icon={Fingerprint}
                iconColor='danger'
                vertical
              />
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
      <br></br>
      <h2 className={classes.title}>Tamper-proof donation records</h2>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <h4 className={classes.title}>Our Charities</h4>
            <Table
              rows={charities}
              columns={columns}
              isRedirect={true}
              style={charitiesList}
            ></Table>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <h4 className={classes.title}>Latest Donations</h4>
            <AllDonationsTable></AllDonationsTable>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
