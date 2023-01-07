import React from "react";
import { Box, Link } from "@mui/material";
import ActiveAvatar from "./ActiveAvatar/ActiveAvatar";
import UsernameText from "./UsernameText/UsernameText";
import { useRouter } from "next/router";

export default function ProfileSection({ user_metadata }) {
  const router = useRouter();
  function handleProfileClick() {
    console.log(user_metadata.username);
    router.push(`/user?user=${user_metadata.username}`);
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "auto",
      }}
    >
      <ActiveAvatar
        user_metadata={user_metadata}
        handleClick={() => handleProfileClick()}
      />
      <UsernameText
        user_metadata={user_metadata}
        handleClick={() => handleProfileClick()}
      />
    </Box>
  );
}
