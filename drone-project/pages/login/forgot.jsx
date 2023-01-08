import LockResetIcon from "@mui/icons-material/LockReset";
import React from "react";
import { Box } from "@mui/material";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import resetPasswordUser from "../../src/utils/auth/resetPasswordUser";
import InputForm from "../../src/components/InputForm/InputForm";
import { useRouter } from "next/router";
import Header from "../../src/components/Header/Header";

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
  async function handleForgotPasswordSubmit({ event, email, password }) {
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
      const { user, session, error } = resetPasswordUser({
        email: email,
        supabase: supabase,
        setErrorMessage: setErrorMessage,
      });
      if (error) {
        setErrorMessage(error.message);
      } else {
        setSuccessState(true);
      }
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
        icon={<LockResetIcon />}
        handleSubmit={({ event, email }) =>
          handleForgotPasswordSubmit({ event, email })
        }
        mainHeadingText="Reset Password"
        hidePasswordField
        successState={successState}
        successText="Reset Password link was sent"
        hideRightLink
        leftLinkText="Already reset your password? Sign in"
        leftLinkHref="/login"
        emailError={userEmailError}
        errorMessage={errorMessage}
      />
    </Box>
  );
}
