import { InputLabel, MenuItem, Stack, TextField, TextFieldProps } from '@mui/material';
import { FastField, FieldInputProps, FieldMetaProps } from 'formik';
import React from 'react';

type OptionType = Record<string, any>;

type FormikSelectProps = TextFieldProps & {
  name: string;
  label?: string;
  options: OptionType[];
  loader?: boolean;
  optionLabel?: string;
  optionValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const FormikSelect = React.memo(
  ({
    name = 'item',
    label = 'Item',
    options = [],
    loader = false,
    optionLabel = 'name',
    optionValue = 'id',
    onChange,
    ...props
  }: FormikSelectProps) => {
    return (
      // Dynamic key for force re-render after options received from backend
      <FastField name={name} key={`${loader}-${options}`}>
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
                {...field}
                value={options?.length ? (field?.value ?? '') : ''}
                {...props}
                onChange={(e) => {
                  field.onChange(e); // Formik internal update
                  onChange?.(e); // Optional external usage
                }}
                select
                disabled={loader || props.disabled}
                error={showError}
                helperText={showError ? meta.error : ''}
                slotProps={{
                  select: {
                    displayEmpty: true
                  }
                }}
              >
                <MenuItem value="">{loader ? 'Loading...' : options.length === 0 ? 'No options available' : `Select ${label}`}</MenuItem>
                {options.map((option, index) => (
                  <MenuItem key={option[optionValue] ?? index} value={option[optionValue]}>
                    {option[optionLabel]}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          );
        }}
      </FastField>
    );
  }
);

export default FormikSelect;
