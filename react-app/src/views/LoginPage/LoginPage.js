import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import firebase from "firebase";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/background2.jpg";
import { useState } from "react";
import { Redirect } from "react-router";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        // Signed in
        // ...
        console.log("Signed in");
        console.log(email + password);
        props.history.push("/");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + ": " + errorMessage);
        if (errorCode == "auth/wrong-password") {
          alert("Invalid password! Please try again.");
        } else if ((errorCode = "auth/too-many-requests")) {
          alert("Too many attempts! Please try again at a later time.");
        } else if ((errorCode = "auth/user-not-found")) {
          alert("No such username! Please enter your Charity username.");
        }
      });
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  return (
    <div>
      <Header
        absolute
        color='transparent'
        brand='Charity'
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify='center'>
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color='primary' className={classes.cardHeader}>
                    <h4>Login</h4>
                  </CardHeader>
                  <CardBody>
                    <p>Email: </p>
                    <input
                      labelText='Please key in a valid email address.'
                      id='first'
                      onChange={(event) => onChangeHandler(event)}
                      name='email'
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position='end'>
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <p>Password: </p>
                    <input
                      onChange={(event) => onChangeHandler(event)}
                      name='password'
                      type='password'
                      labelText='Please key in your secure password.'
                      id='pass'
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "password",
                        endAdornment: (
                          <InputAdornment position='end'>
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button
                      simple
                      color='primary'
                      size='lg'
                      onClick={(event) => {
                        signInWithEmailAndPasswordHandler(
                          event,
                          email,
                          password
                        );
                      }}
                    >
                      Let's Go
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
