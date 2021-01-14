/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

// core components
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);
import firebase from "firebase";
import { useState } from "react";

export default function HeaderLinks() {
  const classes = useStyles();
  const [, setLoggedIn] = useState("");
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      // console.log("IS SIGNED IN");
      setLoggedIn(user);
    } else {
      // No user is signed in.
      // console.log("IS SIGNED OUT");
    }
  });

  return (
    <List className={classes.list}>
      {/* <ListItem className={classes.listItem}>
        <Button href='/' color='transparent' className={classes.navLink}>
          <HomeIcon className={classes.icons} /> Home
        </Button>
      </ListItem> */}
      <ListItem className={classes.listItem}>
        <Button href='/verify' color='transparent' className={classes.navLink}>
          <CheckCircleIcon className={classes.icons} /> Verify
        </Button>
      </ListItem>
      {/* { loggedIn ?
        (
          <ListItem className={classes.listItem}>
            <Button
              onClick={onLogoutClick}
              color='transparent'
              className={classes.navLink}
            >
              <LockIcon className={classes.icons} /> Charity Log Out
          </Button>
          </ListItem>
        ) : (
          <ListItem className={classes.listItem}>
            <Button
              href='/login-page'
              color='transparent'
              className={classes.navLink}
            >
              <LockIcon className={classes.icons} /> Charity Log In
          </Button>
          </ListItem>
        )} */}
    </List>
  );
}
