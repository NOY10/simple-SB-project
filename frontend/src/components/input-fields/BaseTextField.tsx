import { InputLabel, Stack, TextField, TextFieldProps } from '@mui/material';
import React from 'react';

type BaseTextFieldProps = TextFieldProps & {
  name: string;
  label?: string;
};

const BaseTextField = React.memo(({ name = 'name', label, ...props }: BaseTextFieldProps) => {
  return (
    <Stack sx={{ gap: 1 }}>
      {label && (
        <InputLabel htmlFor={name}>
          {label} {props?.required && <span style={{ color: 'red' }}>*</span>}
        </InputLabel>
      )}
      <TextField fullWidth id={name} name={name} placeholder={`Enter ${label}`} {...props} />
    </Stack>
  );
});

export default BaseTextField;
