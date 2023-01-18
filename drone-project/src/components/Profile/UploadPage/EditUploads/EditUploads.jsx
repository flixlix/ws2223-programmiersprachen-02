import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  IconButton,
  Alert,
  AlertTitle,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import { MuiChipsInput } from "mui-chips-input";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { LoadingButton } from "@mui/lab";
import ErrorIcon from "@mui/icons-material/Error";
import CheckIcon from "@mui/icons-material/Check";

export default function EditUploads({ item, setUploadSelected, supabase }) {
  const maxTags = 50;
  const [tagsErrorText, setTagsErrorText] = React.useState("");
  const [tags, setTags] = React.useState(item.tags);
  const [name, setName] = React.useState(item.name);
  const [nameErrorText, setNameErrorText] = React.useState("");
  const [description, setDescription] = React.useState(item.description);
  const [submissionState, setSubmissionState] = React.useState("");
  const [error, setError] = React.useState("");
  const [confirmDialogOpen, setConfirmDialogOpen] = React.useState(false);

  async function handleSubmit() {
    if (
      !name ||
      checkTagsErrors({
        tags,
        setTagsErrorText,
        maxTags,
        checkForEmpty: true,
      })
    ) {
      if (!name) {
        setNameErrorText("Name is required");
      } else {
        setNameErrorText("");
      }

      checkTagsErrors({
        tags,
        setTagsErrorText,
        maxTags,
        checkForEmpty: true,
      });
    } else {
      setNameErrorText("");
      setTagsErrorText("");
      setSubmissionState("loading");
      updateMetadata();
    }
  }

  async function updateMetadata() {
    const { data, error } = await supabase
      .from("photos_metadata")
      .update({
        name: name,
        description: description,
        tags: tags,
      })
      .match({ id: item.id });
    if (error) {
      console.log("error", error);
      setSubmissionState("error");
      setError(error.message);
    } else {
      setSubmissionState("success");
    }
  }

  function checkTagsErrors({ tags, setTagsErrorText, maxTags, checkForEmpty }) {
    if (checkForEmpty === true) {
      if (tags.length === 0) {
        setTagsErrorText("At least one tag is required");
        return true;
      }
    }
    if (tags.length > maxTags) {
      setTagsErrorText(
        "Exceeded maximum number of tags (" + tags.length + "/" + maxTags + ")"
      );
      return true;
    }
    if (checkDuplicateTags(tags) === true) {
      setTagsErrorText("Duplicate tags are not allowed");
      return true;
    }
    if (checkIfSpacesInTags(tags) === true) {
      setTagsErrorText("Tags cannot contain spaces");
      return true;
    }
    setTagsErrorText("");
    return false;
  }
  function handleTagsChange(e) {
    checkTagsErrors({
      tags: e,
      setTagsErrorText,
      maxTags,
      checkForEmpty: false,
    });
    setTags(e);
  }

  function checkIfSpacesInTags(tags) {
    for (let i = 0; i < tags.length; i++) {
      if (tags[i].includes(" ")) {
        return true;
      }
    }
    return false;
  }

  function checkDuplicateTags(tags) {
    let tagsAlreadySeen = [];

    for (let i = 0; i < tags.length; i++) {
      if (tagsAlreadySeen.includes(tags[i])) {
        return true;
      }
      tagsAlreadySeen.push(tags[i]);
    }
    return false;
  }

  async function handleDeleteItem() {
    const { data, error } = await supabase
      .from("photos_metadata")
      .delete()
      .match({ id: item.id });
    if (error) {
      console.log("error", error);
      setSubmissionState("error");
      setError(error.message);
    } else {
      setSubmissionState("success");
      /* return back after 3 seconds */
      setTimeout(() => {
        setUploadSelected("");
      }, 3000);
    }
  }

  const publicUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const imageSrc = `${publicUrl}/storage/v1/object/public/photos/${item.image_path}`;
  return (
    <Stack
      sx={{
        marginInline: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-start",
        }}
      >
        <Button
          onClick={() => {
            setUploadSelected("");
          }}
          sx={{
            gap: 1,
          }}
        >
          <ArrowBackIcon />
          Go Back
        </Button>
      </Box>
      <Stack
        spacing={2}
        direction="column"
        sx={{
          marginInline: 1.5,
          marginTop: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "400px",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5">Edit Upload</Typography>
          <Button
            variant="text"
            color="error"
            onClick={() => setConfirmDialogOpen(true)}
          >
            Delete
          </Button>
        </Box>
        <Box
          sx={{
            width: "100%",
            overflow: "hidden",
            display: "grid",
            gridTemplateColumns: "400px auto",
            gap: 5,
          }}
        >
          <Stack spacing={2} direction="column" id="edit-upload-left">
            <TextField
              required
              margin="normal"
              id="outlined-basic"
              label="Name"
              error={nameErrorText == "" ? false : true}
              helperText={nameErrorText}
              variant="outlined"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              multiline
              minRows={4}
              margin="normal"
              id="outlined-basic"
              label="Description"
              variant="outlined"
              value={description || ""}
              onChange={(e) => setDescription(e.target.value)}
            />
            <MuiChipsInput
              error={tagsErrorText == [] ? false : true}
              helperText={tagsErrorText}
              label={"Tags * (" + tags.length + "/" + maxTags + ")"}
              value={tags || []}
              onChange={(e) => handleTagsChange(e)}
              placeholder=""
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                variant="text"
                onClick={() => {
                  setName(item.name);
                  setDescription(item.description);
                  setTags(item.tags);
                }}
              >
                Reset
              </Button>
              {submissionState ? (
                (submissionState == "loading" && (
                  <LoadingButton loading variant="contained">
                    Save
                  </LoadingButton>
                )) ||
                (submissionState == "success" && (
                  <Button variant="contained" color="success">
                    <CheckIcon />
                  </Button>
                )) ||
                (submissionState == "error" && (
                  <Button variant="contained" color="error">
                    <ErrorIcon />
                  </Button>
                )) ||
                (submissionState == "noChange" && (
                  <Tooltip title="No changes to save" placement="left">
                    <span>
                      <Button variant="contained" color="primary" disabled>
                        Save
                      </Button>
                    </span>
                  </Tooltip>
                ))
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSubmit()}
                >
                  Save
                </Button>
              )}
            </Box>
            {submissionState == "error" && (
              <Alert
                severity="error"
                onClose={() => {
                  setSubmissionState("");
                }}
              >
                <AlertTitle>Unable to update the information</AlertTitle>
                {error}
              </Alert>
            )}
          </Stack>
          <Box
            id="edit-upload-right"
            sx={{
              paddingTop: 2,
              maxHeight: "500px",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-start",
            }}
          >
            <img
              src={imageSrc}
              alt={item.title}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
        </Box>
      </Stack>
      <Dialog
        open={confirmDialogOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete this upload"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this upload?
            <br />
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)}>cancel</Button>
          <Button
            autoFocus
            variant="contained"
            color="error"
            onClick={() => handleDeleteItem()}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
