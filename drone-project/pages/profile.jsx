import React from "react";
import Header from "../src/components/Header/Header";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import checkIfUserIsLoggedIn from "../src/utils/checkIfUserIsLoggedIn";
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";

export default function profile() {
  const supabase = useSupabaseClient();
  const session = useSession();
  const router = useRouter();
  const user = checkIfUserIsLoggedIn({ supabase });
  React.useEffect(() => {
    console.log(checkIfUserIsLoggedIn({ supabase }));
  }, []);
  React.useEffect(() => {
    console.log(session);
  }, [session]);

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
        square
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
          <TextField
            label="username"
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <TextField
              label="email"
              fullWidth
              margin="normal"
              variant="outlined"
              value={session?.user.email}
              endAdornment={
                <InputAdornment position="end">
                  <Button
                    variant="outlined"
                    padding="normal"
                    margin="normal"
                    color="success"
                  >
                    Update
                  </Button>
                </InputAdornment>
              }
              /* add action to the start of the component */

                /* add action to the end of the component */
                start
            />
            <Button
              variant="outlined"
              padding="normal"
              margin="normal"
              color="success"
            >
              Update
            </Button>
          </Box>
          <TextField
            label="password"
            fullWidth
            margin="normal"
            variant="outlined"
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
