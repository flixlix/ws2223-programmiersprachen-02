import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function UploadsPage() {
  const supabase = useSupabaseClient();

  async function handleLogoutButtonClick() {
    const { error } = await supabase.auth.signOut();
    if (error) console.log("Error logging out:", error.message);
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Typography variant="h5">Settings</Typography>
      <Button variant="contained" onClick={() => handleLogoutButtonClick()}>
        Logout
      </Button>
    </Box>
  );
}
