import React from "react";
import { Button, Typography, TextField, Stack, Typography } from "@mui/material";
import { MuiChipsInput } from "mui-chips-input";
import { MuiFileInput } from "mui-file-input";

export default function add() {
  const [file, setFile] = React.useState(null);
  const [tags, setTags] = React.useState([]);

  function handleFileUpload(event) {
    console.log("File uploaded");
    console.log(event.target.files);
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  }

  function handleTagsChange(tags) {
    setTags(tags);
  }

  return (
    <div style={{ width: "500px", margin: "2rem" }}>
      <Typography variant="h1">Add Images</Typography>
      <Stack spacing={2}>
        <TextField
          id="name-text-field"
          type="text"
          required
          label="Name"
          placeholder="Name"
        />
        <MuiChipsInput label="Tags" value={tags} onChange={handleTagsChange} />
        <TextField
          id="description-text-field"
          type="text"
          label="Description"
          multiline
          autoCapitalize="true"
          autoCorrect="true"
          rows={4}
          placeholder="Please enter a description"
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>{file ? (file.name+ " ( " + (Math.floor(file.size / 1024)) + " kB )" ) : "No File Uploaded"}</Typography>
          <Button
            variant="outlined"
            aria-required
            component="label"
            color="primary"
          >
            {" "}
            Upload your image
            <input
              type="file"
              hidden
              required
              onChange={(e) => handleFileUpload(e)}
            />
          </Button>
        </div>
        <Button variant="contained" color="primary">
          Submit
        </Button>
      </Stack>
    </div>
  );
}
