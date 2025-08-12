import { InputLabel, Stack, TextFieldProps } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React from 'react';

type BaseDatePickerProps = {
  name: string;
  label?: string;
  required?: boolean;
  value: Date | null;
  onChange: (value: Date | null) => void;
  error?: boolean;
  helperText?: string;
  [key: string]: any;
};

const BaseDatePicker = React.memo(
  ({
    name = 'date',
    label = 'Select Date',
    required = false,
    value = null,
    onChange,
    error = false,
    helperText = '',
    ...props
  }: BaseDatePickerProps) => {
    return (
      <Stack sx={{ gap: 1 }}>
        {label && (
          <InputLabel htmlFor={name}>
            {label} {required && <span style={{ color: 'red' }}>*</span>}
          </InputLabel>
        )}
        <DatePicker
          value={value}
          onChange={onChange}
          format="dd/MM/yyyy"
          {...props}
          slotProps={{
            textField: {
              id: name,
              fullWidth: true,
              error,
              helperText,
              InputProps: {
                sx: {
                  height: 40
                }
              }
            },
            field: { clearable: true }
          }}
        />
      </Stack>
    );
  }
);

export default BaseDatePicker;
