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
import CustomInput from "components/CustomInput/CustomInput.js";

import profile from "assets/img/faces/christian.jpg";

import styles from "assets/jss/material-kit-react/views/profilePage.js";

import firebase from "firebase";
import database from "firebase.js";

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
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
            <div>
                <h3>Add Transaction</h3>
            </div>
            <form>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                        labelText="NRIC"
                        id="nric"
                        formControlProps={{
                            fullWidth: true
                        }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                        labelText="Amount"
                        id="amount"
                        formControlProps={{
                            fullWidth: true
                        }}
                        />
                    </GridItem>
                    <CustomInput
                        labelText="Note"
                        id="Note"
                        formControlProps={{
                        fullWidth: true,
                        className: classes.textArea
                        }}
                        inputProps={{
                        multiline: true,
                        rows: 5
                        }}
                    />
                </GridContainer>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                        <Button color="success">
                            Done
                        </Button>
                    </GridItem>
                </GridContainer>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}