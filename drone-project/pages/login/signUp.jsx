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
import signUpUser from "../../src/utils/auth/signUpUser";
import InputForm from "../../src/components/InputForm/InputForm";
import { useRouter } from "next/router";
import Header from "../../src/components/Header/Header";

export default function signUp() {
  const supabase = useSupabaseClient();
  const session = useSession();
  const router = useRouter();
  const [userEmail, setUserEmail] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");
  const [userEmailError, setUserEmailError] = React.useState("");
  const [userPasswordError, setUserPasswordError] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successState, setSuccessState] = React.useState(false);
  async function handleSignUpSubmit({ event, email, password }) {
    event.preventDefault();
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
      signUpUser({
        supabase,
        email,
        password,
        setErrorMessage,
        setSuccessState,
      });
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Header />
      <InputForm
        handleSubmit={({ event, email, password }) =>
          handleSignUpSubmit({ event, email, password })
        }
        emailError={userEmailError}
        linkHref="/login"
        successLinkTo
        successState={successState}
        passwordError={userPasswordError}
        errorMessage={errorMessage}
        submitButtonText="Sign Up"
        mainHeadingText="Sign up"
        linkText="Already have an account? Sign In"
      />
    </Box>
  );
}
