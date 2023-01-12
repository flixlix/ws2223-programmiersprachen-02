import React from "react";
import { Box, Typography } from "@mui/material";


export default function UploadsPage() {
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
      <Typography variant="h5">Uploads</Typography>
    </Box>
  );
}
