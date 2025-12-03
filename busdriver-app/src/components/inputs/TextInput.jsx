import React from "react";
import TextField from "@mui/material/TextField"; // Import MUI pour le design

const Input = ({ label, type, value, onChange }) => {
  return (
    <TextField
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      fullWidth
      variant="outlined"
      margin="normal"
    />
  );
};

export default Input;
