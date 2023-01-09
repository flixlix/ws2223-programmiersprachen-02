import React from "react";
import { Typography, Skeleton } from "@mui/material";
import countSubmissionsFromUser from "../../../utils/profiles/countSubmissionsFromUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function UsernameText({ user_metadata, handleClick }) {
  const supabase = useSupabaseClient();
  const [numberOfSubmissions, setNumberOfSubmissions] = React.useState(0);
  if (!user_metadata) user_metadata = { friendly_name: "", username: "" };
  countSubmissionsFromUser({
    supabase,
    user_id: user_metadata.id,
    setNumberOfSubmissions,
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
      {user_metadata.friendly_name && user_metadata.username ? (
        <Typography
          variant="subtitle1"
          style={{
            cursor: "pointer",
          }}
          onClick={() => {
            handleClick();
          }}
        >
          {user_metadata.friendly_name || user_metadata.username}
        </Typography>
      ) : (
        <Skeleton
          variant="text"
          width={100}
          style={{
            marginBottom: "0.2rem",
            fontSize: "1.5rem",
          }}
        />
      )}

      {numberOfSubmissions > 0 ? (
        <Typography variant="caption">
          {numberOfSubmissions > 1 ? numberOfSubmissions + " posts" : "1 post"}
        </Typography>
      ) : (
        <Skeleton
          variant="text"
          width={100}
          style={{
            marginTop: "0.2rem",
          }}
        />
      )}
    </div>
  );
}
