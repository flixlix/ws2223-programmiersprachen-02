import React, { useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  CssBaseline,
  Paper,
  Box,
  Avatar,
  Typography,
  Link,
  Checkbox,
  FormControlLabel,
  Alert,
} from "@mui/material";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import signInUser from "../../src/utils/signInUser";
import InputForm from "../../src/components/InputForm/InputForm";
import { useRouter } from "next/router";

export default function index() {
  const supabase = useSupabaseClient();
  const session = useSession();
  const router = useRouter();
  const [userEmail, setUserEmail] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");
  const [userEmailError, setUserEmailError] = React.useState("");
  const [userPasswordError, setUserPasswordError] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successState, setSuccessState] = React.useState(false);
  const [successText, setSuccessText] = React.useState("");

  async function handleSignInSubmit({ event, email, password }) {
    event.preventDefault();
    /* checks if input is an email address containing a prefix, an @-symbol, and a domain followed by an extension (.com for example)  */
    let emailRegex = new RegExp(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
    if (email === "" || !emailRegex.test(email) || password === "") {
      if (email === "") {
        setUserEmailError("Email is required");
      } else if (!emailRegex.test(email)) {
        setUserEmailError("Not an email address");
      } else {
        setUserEmailError("");
      }
      if (password === "") {
        setUserPasswordError("Password is required");
      } else {
        setUserPasswordError("");
      }
    } else {
      /* reset error message from textfields */
      setUserEmailError("");
      setUserPasswordError("");
      const { user, session, error } = await signInUser({
        email: email,
        password: password,
        supabase: supabase,
        setErrorMessage: setErrorMessage,
      });
      if (error) {
        console.log(error);
        setErrorMessage(error.message);
      } else {
        console.log(session);
        setSuccessState(true);
        setSuccessText("You have successfully signed in! Redirecting you to the home page...");
        /* redirect user to home page */
        setTimeout(() => {
          router.push("/");
        }, 3000);
      }
    }
  }


  return (
    <div>
      <InputForm
        handleSubmit={({ event, email, password }) =>
          handleSignInSubmit({ event, email, password })
        }
        successState={successState}
        successMainText="You have successfully signed in!"
        successSecondaryText="You will be redirected to the home page..."
        emailError={userEmailError}
        passwordError={userPasswordError}
        errorMessageText={errorMessage}
      />
    </div>
  );
}
