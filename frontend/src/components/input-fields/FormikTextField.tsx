import { InputLabel, Stack, TextField, TextFieldProps } from '@mui/material';
import { FastField, FieldInputProps, FieldMetaProps } from 'formik';
import React from 'react';

type FormikTextFieldProps = TextFieldProps & {
  name: string;
  label?: string;
};

const FormikTextField = React.memo(({ name = 'name', label = 'Input', ...props }: FormikTextFieldProps) => {
  return (
    <FastField name={name}>
      {({ field, meta }: { field: FieldInputProps<any>; meta: FieldMetaProps<any> }) => {
        const showError = meta.touched && Boolean(meta.error);

        return (
          <Stack sx={{ gap: 1 }}>
            {label && (
              <InputLabel htmlFor={name}>
                {label} {props?.required && <span style={{ color: 'red' }}>*</span>}
              </InputLabel>
            )}
            <TextField
              fullWidth
              id={name}
              placeholder={`Enter ${label}`}
              {...field}
              value={field?.value ?? ''}
              {...props}
              error={showError}
              helperText={showError ? meta.error : ''}
            />
          </Stack>
        );
      }}
    </FastField>
  );
});

export default FormikTextField;
