import { Avatar, Skeleton } from "@mui/material";
import React from "react";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  if (!name) return;
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

export default function ActiveAvatar({
  user_metadata,
  handleClick,
  width,
  height,
}) {
  React.useEffect(() => {
    console.log(user_metadata);
  }, [user_metadata]);

  return (
    <div
      style={{
        cursor: "pointer",
      }}
      onClick={() => {
        handleClick();
      }}
    >
      {user_metadata === null ? (
        <Skeleton
          variant="circular"
          width={width || 40}
          height={height || 40}
        />
      ) : (
        <>
          {user_metadata.avatar_url ? (
            <Avatar
              alt={user_metadata?.username || "anonymous"}
              src={user_metadata?.avatar_url}
              loading="lazy"
              sx={{
                width: width || 40,
                height: height || 40,
              }}
            />
          ) : user_metadata.friendly_name ? (
            <Avatar
              {...stringAvatar(user_metadata.friendly_name)}
              alt={user_metadata.friendly_name}
              sx={{
                width: width || 40,
                height: height || 40,
              }}
            />
          ) : (
            <Avatar
              {...stringAvatar(user_metadata.username)}
              alt={user_metadata.username}
              sx={{
                width: width || 40,
                height: height || 40,
              }}
            />
          )}
        </>
      )}
    </div>
  );
}
