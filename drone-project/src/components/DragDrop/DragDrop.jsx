import { Alert, Box, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./DragDrop.module.css";

export default function DragDrop(props) {
  const [alert, setAlert] = React.useState("");
  const onDrop = useCallback((fileUploaded) => {

    /* call onUpload function */
    if (fileUploaded[0] !== undefined) {
      props.onUpload(fileUploaded);
    } else {
      props.setSubmissionState("error");
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDrop,
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />

      {isDragActive ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "primary.main",
            height: "100vh",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <Typography
            color="white"
            variant="h3"
            className={styles.dragDropText}
          >
            Drop your image here...
          </Typography>
        </Box>
      ) : (
        props.children
      )}
    </div>
  );
}
