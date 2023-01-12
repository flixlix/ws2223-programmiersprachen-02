import React from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import uuid from "react-uuid";
import { TextField, Stack, Button, Typography, Alert } from "@mui/material";
import { MuiChipsInput } from "mui-chips-input";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
import Header from "../src/components/Header/Header";
import redirectUnauthUser from "../src/utils/auth/redirecting/redirectUnauthUser";

export default function add() {
  const supabase = useSupabaseClient();
  const session = useSession();
  const router = useRouter();
  const maxTags = 50;
  const [file, setFile] = React.useState("");
  const [fileHelperText, setFileHelperText] = React.useState("");
  const [nameErrorText, setNameErrorText] = React.useState("");
  const [tagsErrorText, setTagsErrorText] = React.useState("");
  const [imageExtension, setImageExtension] = React.useState("");
  const [imageId, setImageId] = React.useState(uuid());
  const [imagePath, setImagePath] = React.useState("");
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const [submissionState, setSubmissionState] = React.useState("");

  React.useEffect(() => {
    redirectUnauthUser({
      supabase: supabase,
      router: router,
    });
  }, []);

  async function handleSubmit() {
    if (
      !file ||
      !name ||
      checkTagsErrors({
        tags,
        setTagsErrorText,
        maxTags,
        checkForEmpty: true,
      })
    ) {
      if (!file) {
        setFileHelperText("Image Upload is required");
      } else {
        setFileHelperText("");
      }

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
      setFileHelperText("");
      setNameErrorText("");
      setTagsErrorText("");
      setImageId(uuid());
      setSubmissionState("loading");
      uploadImage();
      uploadMetadataToTable();
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

  function checkIfSpacesInTags(tags) {
    for (let i = 0; i < tags.length; i++) {
      if (tags[i].includes(" ")) {
        return true;
      }
    }
    return false;
  }

  /* console.log with purple background and white text the submission state everytime it updates */
  /* React.useEffect(() => {
    console.log("%c" + submissionState, "background: purple; color: white");
  }, [submissionState]); */

  async function uploadImage() {
    const { data, error } = await supabase.storage
      .from("photos")
      .upload(imageId + "." + imageExtension, file, {
        cacheControl: "3600",
        upsert: false,
      });
    if (error) {
      setSubmissionState("error");
      console.log(error);
    }
    setSubmissionState("success");
  }

  async function uploadMetadataToTable() {
    const { data, error } = await supabase.from("photos_metadata").insert({
      name: name ? name : "No Name",
      description: description ? description : "No Description",
      tags: tags ? tags : "No Tags",
      user_id: session.user.id ? session.user.id : "No User ID",
      image_path: imagePath ? imagePath : "No Image Path",
    });
    if (error) {
      console.log(error);
    }
    console.log(data);
  }

  async function handleFileUpload(e) {
    setFile(e.target.files[0]);
    setImageExtension(e.target.files[0].name.split(".").pop());
    setImagePath(imageId + "." + e.target.files[0].name.split(".").pop());
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

  return (
    <div>
      <Header />
      <Stack
        spacing={2}
        direction="column"
        sx={{
          padding: 5,
          width: "500px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color={fileHelperText == "" ? "" : "error"}>
            {file
              ? file.name + " ( " + Math.floor(file.size / 1024) + " kB )"
              : fileHelperText
              ? fileHelperText
              : "No image selected"}
            {" *"}
          </Typography>
          <Button
            variant="outlined"
            aria-required
            component="label"
            color="primary"
          >
            Upload your image
            <input
              type="file"
              accept="image/*"
              hidden
              required
              onChange={(e) => handleFileUpload(e)}
            />
          </Button>
        </div>
        <TextField
          required
          error={nameErrorText == "" ? false : true}
          helperText={nameErrorText}
          id="name"
          type="text"
          label="Name"
          variant="outlined"
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="description"
          type="text"
          label="Description"
          variant="outlined"
          onChange={(e) => setDescription(e.target.value)}
        />
        <MuiChipsInput
          error={tagsErrorText == [] ? false : true}
          helperText={tagsErrorText}
          label={"Tags * (" + tags.length + "/" + maxTags + ")"}
          value={tags}
          onChange={(e) => handleTagsChange(e)}
          placeholder=""
        />
        {submissionState == "loading" ? (
          <LoadingButton id="submit-button" variant="contained" loading>
            Submit
          </LoadingButton>
        ) : (
          <Button
            id="submit-button"
            variant="contained"
            onClick={() => handleSubmit()}
          >
            Submit
          </Button>
        )}
        {submissionState == "error" ? (
          <Alert
            severity="error"
            onClose={() => {
              setSubmissionState("");
            }}
          >
            Error submitting your image
          </Alert>
        ) : null}
        {submissionState == "success" ? (
          <Alert
            severity="success"
            onClose={() => {
              setSubmissionState("");
            }}
          >
            Image successfully submitted
          </Alert>
        ) : null}
      </Stack>
    </div>
  );
}
