import React from "react";
import {
  Badge,
  Box,
  Button,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import ShowHidePasswordTextField from "../../../form/ShowHidePasswordTextField/ShowHidePasswordTextField";
import ActiveAvatar from "../../ProfileSection/ActiveAvatar/ActiveAvatar";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
import getUserMetadataFromId from "../../../utils/profiles/getUserMetadataFromId";
import getAllProfiles from "../../../utils/profiles/getAllProfiles";
import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react";
import { LoadingButton } from "@mui/lab";
import updateUserMetadata from "../../../utils/profiles/updateUserMetadata";

export default function ProfilePage() {
  const supabase = useSupabaseClient();
  const session = useSession();
  const user_id = session.user.id;
  const [profiles, setProfiles] = React.useState("");
  const [disabledFields, setDisabledFields] = React.useState({
    first_name: true,
    last_name: true,
    username: true,
    email: true,
  });
  const [userMetadata, setUserMetadata] = React.useState("");
  const [status, setStatus] = React.useState("noChange");
  const [usernameError, setUsernameError] = React.useState("");
  React.useEffect(() => {
    getUserMetadataFromId({
      supabase,
      user_id,
      setUserMetadata,
    });
    getAllProfiles({
      supabase,
      setProfiles,
    });
  }, []);

  const [newUserData, setNewUserData] = React.useState("");

  React.useEffect(() => {
    if (userMetadata) {
      setNewUserData(userMetadata);
    }
  }, [userMetadata]);

  React.useEffect(() => {
    if (areTwoObjectsEqual(newUserData, userMetadata)) {
      setStatus("noChange");
    } else {
      setStatus("");
    }
  }, [newUserData, userMetadata]);

  /* reset status */

  React.useEffect(() => {
    if (status !== "") {
      setTimeout(() => {
        setStatus("");
      }, 3000);
    }
  }, [status]);

  function areTwoObjectsEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  function handleClickCancelButton() {
    setNewUserData(userMetadata);
  }

  async function handleClickSaveButton() {
    setStatus("loading");
    const { error } = await updateUserMetadata({
      supabase,
      user_id,
      newUserData,
      setUsernameError,
      profiles,
    });
    if (error) {
      setStatus("error");
    } else {
      setStatus("success");
    }
  }

  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "100%",
        padding: 2,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          alignSelf: "flex-start",
        }}
      >
        Profile Details
      </Typography>
      <Stack
        sx={{
          margin: 2,
        }}
      >
        <ActiveAvatar height={200} width={200} user_metadata={userMetadata} />
      </Stack>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <TextField
          margin="normal"
          variant="outlined"
          label="First Name"
          value={newUserData?.first_name || ""}
          onChange={(e) => {
            setNewUserData({
              ...newUserData,
              first_name: e.target.value,
            });
          }}
        />

        <TextField
          margin="normal"
          variant="outlined"
          label="Last Name"
          value={newUserData?.last_name || ""}
          onChange={(e) => {
            setNewUserData({
              ...newUserData,
              last_name: e.target.value,
            });
          }}
        />
      </Stack>
      <TextField
        fullWidth
        margin="normal"
        variant="outlined"
        label="Username"
        value={newUserData?.username || ""}
        error={usernameError ? true : false}
        helperText={usernameError}
        onChange={(e) => {
          setNewUserData({
            ...newUserData,
            username: e.target.value,
          });
        }}
      />
      <TextField
        fullWidth
        margin="normal"
        variant="outlined"
        label="Email"
        value={newUserData?.email || ""}
        onChange={(e) => {
          setNewUserData({
            ...newUserData,

            email: e.target.value,
          });
        }}
      />
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          gap: 2,
          margin: 2,
        }}
      >
        <Button
          variant="text"
          color="primary"
          onClick={() => handleClickCancelButton()}
        >
          reset
        </Button>
        {status ? (
          (status == "loading" && (
            <LoadingButton loading variant="contained">
              Save
            </LoadingButton>
          )) ||
          (status == "success" && (
            <Button variant="contained" color="success">
              <CheckIcon />
            </Button>
          )) ||
          (status == "error" && (
            <Button variant="contained" color="error">
              <ErrorIcon />
            </Button>
          )) ||
          (status == "noChange" && (
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
            onClick={() => handleClickSaveButton()}
          >
            Save
          </Button>
        )}
      </Stack>
      <Typography
        variant="h5"
        sx={{
          alignSelf: "flex-start",
        }}
      >
        Change Password
      </Typography>
      <ShowHidePasswordTextField
        label="Current Password"
        value={newUserData?.password || ""}
        setValue={(e) => {
          setNewUserData({
            ...newUserData,
            password: e.target.value,
          });
        }}
        passwordError={""}
      />
      <ShowHidePasswordTextField
        label="New Password"
        value={newUserData?.password || ""}
        setValue={(e) => {
          setNewUserData({
            ...newUserData,
            password: e.target.value,
          });
        }}
        passwordError={""}
      />
      <ShowHidePasswordTextField
        label="Confirm New Password"
        value={newUserData?.password || ""}
        setValue={(e) => {
          setNewUserData({
            ...newUserData,
            password: e.target.value,
          });
        }}
        passwordError={""}
      />
    </Stack>
  );
}
