import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Avatar,
  Link,
  InputAdornment,
  ThemeProvider,
  CssBaseline,
  Alert,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { AlertTitle } from "@mui/material";
import ShowHidePasswordTextField from "../../form/ShowHidePasswordTextField/ShowHidePasswordTextField";

export default function InputForm({
  handleSubmit,
  mainHeadingText,
  emailError,
  passwordError,
  errorMessage,
  submitButtonText,
  errorMessageText,
  successState,
  successText,
  successMainText,
  successLinkTo,
  successSecondaryText,
  linkText,
  linkHref,
  icon,
  hidePasswordField,
  hideRightLink,
  leftLinkText,
  leftLinkHref,
  hideEmailField,
  newPassword,
  doublePasswordField,
}) {
  const theme = createTheme();
  let internalSuccessState = successState;
  React.useEffect(() => {
    internalSuccessState = successState;
  }, [successState]);

  const [userEmail, setUserEmail] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");
  const [userPasswordConfirm, setUserPasswordConfirm] = React.useState("");

  function newPasswordFields() {
    return (
      <>
        <ShowHidePasswordTextField
          label="New Password"
          value={userPassword}
          setValue={setUserPassword}
          passwordError={passwordError}
          helperText={passwordError}
        />
        <ShowHidePasswordTextField
          label="New Password Confirmation"
          value={userPasswordConfirm}
          setValue={setUserPasswordConfirm}
          passwordError={passwordError}
          helperText={passwordError}
        />
      </>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100%" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url('/images/sign_in_side_img.png')",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              {icon ? icon : <LockOutlinedIcon />}
            </Avatar>
            <Typography component="h1" variant="h5">
              {mainHeadingText ? mainHeadingText : "Sign in"}
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={(event) =>
                handleSubmit({
                  event,
                  email: userEmail,
                  password: userPassword,
                  passwordConfirm: userPasswordConfirm,
                })
              }
              sx={{ mt: 1 }}
            >
              {errorMessageText && (
                <Alert severity="error">{errorMessageText}</Alert>
              )}
              {internalSuccessState && (
                <Alert severity="success">
                  {successText ? (
                    successText
                  ) : (
                    <div>
                      <AlertTitle>
                        {successMainText
                          ? successMainText
                          : "You have successfully signed up!"}
                      </AlertTitle>
                      {successSecondaryText
                        ? successSecondaryText
                        : "Please check your inbox for a confirmation email."}
                      <br />
                      {successLinkTo && (
                        <Link href="/login" underline="hover">
                          Sign in
                        </Link>
                      )}
                    </div>
                  )}
                </Alert>
              )}
              {newPassword ? (
                newPasswordFields()
              ) : (
                <>
                  {!hideEmailField && (
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      autoComplete="email"
                      autoFocus
                      error={emailError !== ""}
                      helperText={emailError}
                    />
                  )}
                  {!hidePasswordField && (
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      value={userPassword}
                      onChange={(e) => setUserPassword(e.target.value)}
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      error={passwordError !== ""}
                      helperText={passwordError}
                    />
                  )}
                  {doublePasswordField && (
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      value={userPasswordConfirm}
                      onChange={(e) => setUserPasswordConfirm(e.target.value)}
                      label="Password Again"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      error={passwordError !== ""}
                      helperText={passwordError}
                    />
                  )}
                </>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {submitButtonText ? submitButtonText : "Sign in"}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    href={leftLinkHref ? leftLinkHref : "/login/forgot"}
                    variant="body2"
                  >
                    {leftLinkText ? leftLinkText : "Forgot password?"}
                  </Link>
                </Grid>
                {!hideRightLink && (
                  <Grid item>
                    <Link
                      href={linkHref ? linkHref : "/login/signUp"}
                      variant="body2"
                    >
                      {linkText ? linkText : "Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
