/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import LockIcon from "@material-ui/icons/Lock";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import HomeIcon from "@material-ui/icons/Home";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);
import firebase from "firebase";
import { useState } from "react";

export default function HeaderLinks(props) {
  const classes = useStyles();
  const [loggedIn, setLoggedIn] = useState("");
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      console.log("IS SIGNED IN");
      setLoggedIn(user);
    } else {
      // No user is signed in.
      console.log("IS SIGNED OUT");
    }
  });

  const onLogoutClick = (e) =>
    firebase
      .auth()
      .signOut()
      .then(function () {
        // Sign-out successful.
        console.log("Signing out");
        // Refresh navbar
        window.location.reload(false);
      })
      .catch(function (error) {
        // An error happened.
        console.log(error);
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
      { loggedIn ?
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
        )}
    </List>
  );
}
