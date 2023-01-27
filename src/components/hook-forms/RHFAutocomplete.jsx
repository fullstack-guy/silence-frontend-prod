import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const RHFAutocomplete = ({ name, control, ...rest }) => {
  return <Controller name={name} control={control} render={({ field }) => <Autocomplete {...field} {...rest} />} />;
};

export default RHFAutocomplete;