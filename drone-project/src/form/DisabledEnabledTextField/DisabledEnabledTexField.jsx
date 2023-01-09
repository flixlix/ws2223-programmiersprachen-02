import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React from "react";
import { Button } from "@mui/material";

export default function DisabledEnabledTextField({
  label,
  value,
  setValue,
  error,
}) {
  const [disabled, setDisabled] = React.useState(true);
  function handleChangeValue(e) {
    e.preventDefault();
    const newValue = e.target.value;
    setValue(newValue);
  }

  function handleClickDisabled(e) {
    e.preventDefault();
    if (!disabled) {
      console.log(e);
      e.target.innerHTML = value;
    }
    setDisabled(!disabled);
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "space-between",
        justifyContent: "center",
      }}
    >
      <TextField
        label={label}
        value={value}
        onChange={handleChangeValue}
        disabled={disabled}
        error={error}
        sx={{
          width: "100%",
          margin: "0.5rem",
        }}
      />

      <Button variant="text" color="primary" onClick={handleClickDisabled}>
        {disabled ? "Enable" : "Disable"}
      </Button>
    </Box>
  );
}
