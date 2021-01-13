import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

const useStyles = makeStyles(styles);

export default function TeamSection() {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
    <div className={classes.section}>
      <h2 className={classes.title}>Meet our Blockchain Team:</h2>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img
                  src={require("../../../assets/img/faces/bharath.jpg")}
                  alt='Profile'
                  className={imageClasses}
                />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Bharath Sudheer
                <br />
                <small className={classes.smallTitle}>Team Lead</small>
              </h4>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img
                  src={require("../../../assets/img/faces/weihong.jpg")}
                  alt='Profile'
                  className={imageClasses}
                />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Ng Wei Hong
                <br />
                <small className={classes.smallTitle}>
                  Assistant Team Lead
                </small>
              </h4>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img
                  src={require("../../../assets/img/faces/ben.JPG")}
                  alt='Profile'
                  className={imageClasses}
                />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Benjamin Tan
                <br />
                <small className={classes.smallTitle}>Developer</small>
              </h4>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img
                  src={require("../../../assets/img/faces/gary.jpg")}
                  alt='Profile'
                  className={imageClasses}
                />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Gary Lim
                <br />
                <small className={classes.smallTitle}>Developer</small>
              </h4>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img
                  src={require("../../../assets/img/faces/rachel.jpg")}
                  alt='Profile'
                  className={imageClasses}
                />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Rachel Tan
                <br />
                <small className={classes.smallTitle}>Developer</small>
              </h4>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img
                  src={require("../../../assets/img/faces/sean.jpg")}
                  alt='Profile'
                  className={imageClasses}
                />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Sean Lee
                <br />
                <small className={classes.smallTitle}>Developer</small>
              </h4>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
