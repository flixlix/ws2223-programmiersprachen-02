import React from "react";
import Header from "../src/components/Header/Header";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import DisabledEnabledTextField from "../src/form/DisabledEnabledTextField/DisabledEnabledTexField";
import ShowHidePasswordTextField from "../src/form/ShowHidePasswordTextField/ShowHidePasswordTextField";

export default function profile() {
  const supabase = useSupabaseClient();
  const session = useSession();
  const user = session?.user;
  const router = useRouter();
  const [userEmail, setUserEmail] = React.useState(
    "luca.ziegler.felix@gmail.com"
  );
  const [username, setUsername] = React.useState("");
  const [userFriendlyName, setUserFriendlyName] = React.useState("");

  const [emailDisabled, setEmailDisabled] = React.useState(true);

  function NoProfile() {
    function handleLoginButton() {
      router.push("/login");
    }
    return (
      <div
        className="no-profile-page"
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Box>
          <Typography variant="h5">
            Please sign in to access your profile
          </Typography>
          <Button variant="outlined" onClick={() => handleLoginButton()}>
            Sign In
          </Button>
        </Box>
      </div>
    );
  }

  function Profile() {
    return (
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        elevation={6}
        style={{
          height: "100%",
        }}
      >
        <Box
          className="profile-page"
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Profile</Typography>
          <DisabledEnabledTextField
            label="Email"
            value={userEmail}
            setValue={(e) => setUserEmail(e)}
            disabled={emailDisabled}
            setDisabled={(state) => setEmailDisabled(state)}
          />
          <DisabledEnabledTextField
            label="Username"
            value={username}
            setValue={(e) => setUsername(e)}
          />
          <DisabledEnabledTextField
            label="Friendly Name"
            value={userFriendlyName}
            setValue={(e) => setUserFriendlyName(e)}
          />
          <Button
            variant="outlined"
            padding="normal"
            margin="normal"
            color="success"
          >
            Update
          </Button>
          <Button
            variant="outlined"
            margin="normal"
            padding="normal"
            color="error"
            onClick={() => supabase.auth.signOut()}
          >
            Logout
          </Button>
        </Box>
      </Grid>
    );
  }
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Header />
      {user ? <Profile /> : <NoProfile />}
    </div>
  );
}
