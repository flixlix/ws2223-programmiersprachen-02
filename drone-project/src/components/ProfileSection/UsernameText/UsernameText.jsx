import React from "react";
import { Typography } from "@mui/material";
import countSubmissionsFromUser from "../../../utils/countSubmissionsFromUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function UsernameText({ user_metadata, handleClick }) {
  const supabase = useSupabaseClient();
  const [numberOfSubmissions, setNumberOfSubmissions] = React.useState(0);

  countSubmissionsFromUser({
    user_id: user_metadata.id,
    supabase: supabase,
  }).then((data) => {
    if (data) setNumberOfSubmissions(data.length);
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        marginLeft: "1rem",
      }}
    >
      <Typography
        variant="subtitle1"
        component="subtitle1"
        style={{
          cursor: "pointer",
        }}
        onClick={() => {
          handleClick();
        }}
      >
        {user_metadata.friendly_name || user_metadata.username}
      </Typography>
      <Typography variant="caption" component="caption">
        {numberOfSubmissions > 1 ? numberOfSubmissions + " posts" : "1 post"}
      </Typography>
    </div>
  );
}
