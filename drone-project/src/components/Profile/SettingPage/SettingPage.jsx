import React, { useEffect } from "react";
import { Box, Button, FormControl, Stack, Typography } from "@mui/material";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import LanguagePicker from "../../LanguagePicker/LanguagePicker";
import { Trans, Translation } from "react-i18next";
/* import i18n.js file inside pages folder */
/* import "../../../../pages/i18n"; */

export default function SettingPage({ languages }) {
  const supabase = useSupabaseClient();

  async function handleLogoutButtonClick() {
    const { error } = await supabase.auth.signOut();
    if (error) console.log("Error logging out:", error.message);
  }

  return (
    <Stack
      sx={{
        display: "flex",
        boxSizing: "border-box",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        p: 5,
        width: "100%",
        height: "100%",
      }}
      spacing={2}
    >
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Typography variant="h5">{t("Settings")}</Typography>
      </Stack>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <FormControl>
          <Button
            variant="text"
            color="error"
            onClick={() => handleLogoutButtonClick()}
          >
            Logout
          </Button>
        </FormControl>
      </Box>
    </Stack>
  );
}
