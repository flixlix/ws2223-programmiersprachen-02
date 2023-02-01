import React, { useEffect } from "react";
import { Box, FormControl, MenuItem, Select } from "@mui/material";
export default function LanguagePicker({
  fullWidth,
  languages,
  languageSelected,
  changeLanguage,
  t,
  i18n,
}) {
  return (
    <FormControl fullWidth>
      <Select
        labelId="demo-simple-select-label"
        fullWidth
        id="demo-simple-select"
        value={languageSelected}
        onChange={(e) => {
          changeLanguage(e.target.value.toLowerCase());
        }}
        renderValue={(value) => {
          const language = languages.find(
            (language) => language.code === value
          );

          return (
            <Box sx={{ "& > img": { mr: 2, flexShrink: 0 } }}>
              <img
                key={language.code}
                loading="lazy"
                width="20"
                src={`https://flagcdn.com/w20/${language.code.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/w40/${language.code.toLowerCase()}.png 2x`}
                alt=""
              />
              {language.label}
            </Box>
          );
        }}
      >
        {languages.map((language) => (
          <MenuItem value={language.code} key={language.code}>
            <Box sx={{ "& > img": { mr: 2, flexShrink: 0 } }}>
              <img
                loading="lazy"
                width="20"
                src={`https://flagcdn.com/w20/${language.code.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/w40/${language.code.toLowerCase()}.png 2x`}
                alt=""
              />
              {language.label}
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
