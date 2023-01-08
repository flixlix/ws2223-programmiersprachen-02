import LockResetIcon from "@mui/icons-material/LockReset";
import React from "react";
import { Box } from "@mui/material";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import InputForm from "../../src/components/InputForm/InputForm";
import { useRouter } from "next/router";
import Header from "../../src/components/Header/Header";

export default function newPassword() {
  const supabase = useSupabaseClient();
  const session = useSession();
  const router = useRouter();
  const [userPasswordError, setUserPasswordError] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successState, setSuccessState] = React.useState(false);
  async function handleNewPasswordSubmit({ event, password, passwordConfirm }) {
    event.preventDefault();
    console.log(event, password, passwordConfirm);
    if (password !== passwordConfirm) {
      setUserPasswordError("New passwords do not match");
    } else if (password === "") {
      setUserPasswordError("This is a required field");
    } else if (password.length < 8) {
      setUserPasswordError("Password must be at least 8 characters long");
    } else if (password.length > 100) {
      setUserPasswordError("Password must be less than 100 characters long");
    } else {
      setUserPasswordError("");
      const { user, session, error } = await supabase.auth.updateUser({
        password: password,
      });
      if (error) {
        setErrorMessage(error.message);
      } else {
        setSuccessState(true);
      }
    }
  }

  React.useEffect(() => {
    console.log(session);
  }, [session]);

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
        handleSubmit={({ event, password, passwordConfirm }) =>
          handleNewPasswordSubmit({ event, password, passwordConfirm })
        }
        mainHeadingText="Set a new Password"
        doublePasswordField
        hideEmailField
        successState={successState}
        successText="Password was reset"
        hideRightLink
        newPassword
        leftLinkText="Already reset your password? Sign in"
        leftLinkHref="/login"
        passwordError={userPasswordError}
        errorMessage={errorMessage}
      />
    </Box>
  );
}
