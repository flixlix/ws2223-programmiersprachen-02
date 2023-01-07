import { Box, Typography, Skeleton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import React from "react";
import ActiveAvatar from "../ProfileSection/ActiveAvatar/ActiveAvatar";

export default function HeroUser({ user_metadata }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "auto",
        padding: 4,
        paddingRight: 0,
        paddingBottom: 0,
        marginInline: "8px",
      }}
    >
      <ActiveAvatar width={100} height={100} user_metadata={user_metadata} />
      {user_metadata ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            width: "auto",
            padding: 4,

          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
              }}
            >
              {user_metadata?.friendly_name || user_metadata?.username}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "light",
                marginLeft: 1,
              }}
            >
              #{user_metadata?.username}
            </Typography>
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "light",
            }}
          >
            {user_metadata.email}
          </Typography>
        </Box>
      ) : (
        /* incase the metadata is still loading, show skeletons */
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            width: "auto",
            padding: 4,
          }}
        >
          <Skeleton
            variant="text"
            width={200}
            sx={{
              fontSize: "2.215rem",
            }}
          />
          <Skeleton
            variant="text"
            width={250}
            sx={{
              fontSize: "1.25rem",
            }}
          />
        </Box>
      )}
    </Box>
  );
}
