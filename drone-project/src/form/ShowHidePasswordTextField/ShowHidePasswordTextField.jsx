import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React from "react";

export default function ShowHidePasswordTextField({
  label,
  value,
  setValue,
  passwordError,
}) {
  const [showPassword, setShowPassword] = React.useState(false);

  function handleChangeValue(newValue) {
    setValue(newValue);
  }

  function handleClickShowPassword() {
    setShowPassword(!showPassword);
  }
  return (
    <FormControl required fullWidth margin="normal" variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">
        {label ? label : "Password"}
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        fullWidth
        value={value}
        onChange={(e) => handleChangeValue(e.target.value)}
        error={passwordError !== ""}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label ? label : "Password"}
      />
      {passwordError !== "" && (
        <FormHelperText id="helpertext" error color="error">
          {passwordError}
        </FormHelperText>
      )}
    </FormControl>
  );
}
