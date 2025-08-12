import { Autocomplete, CircularProgress, InputLabel, Stack, TextField, AutocompleteProps } from '@mui/material';
import { FastField, FieldProps } from 'formik';
import React from 'react';

type OptionType = Record<string, any>;

interface FormikAutocompleteProps extends AutocompleteProps<OptionType, true, false, false> {
  name: string;
  label?: string;
  optionLabel?: keyof OptionType;
  optionValue?: keyof OptionType;
  loader?: boolean;
  required?: boolean;
}

const FormikMultiSelect = React.memo(
  ({
    name = 'multi-select',
    label = 'Item',
    options = [],
    loader = false,
    optionLabel = 'name',
    optionValue = 'id',
    ...props
  }: FormikAutocompleteProps) => {
    return (
      <FastField name={name} key={`${loader}-${options}`}>
        {({ form }: FieldProps) => {
          const formValue = Array.isArray(form.values[name]) ? form.values[name] : [];

          return (
            <Stack sx={{ gap: 1 }}>
              {label && (
                <InputLabel htmlFor={name}>
                  {label} {props?.required && <span style={{ color: 'red' }}>*</span>}
                </InputLabel>
              )}
              <Autocomplete
                multiple
                fullWidth
                disableCloseOnSelect
                id={name}
                options={Array.isArray(options) ? options : []}
                value={formValue}
                loading={loader}
                getOptionLabel={(option) => option?.[optionLabel] ?? ''}
                isOptionEqualToValue={(option, value) => option?.[optionValue] === value?.[optionValue]}
                onChange={(_, newValue) => {
                  form.setFieldValue(name, newValue);
                }}
                {...props}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name={name}
                    placeholder={loader ? 'Loading...' : `Add ${label}`}
                    error={Boolean(form.touched[name] && form.errors[name])}
                    helperText={form.touched[name] && form.errors[name] ? String(form.errors[name]) : ''}
                    slotProps={{
                      input: {
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {loader ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </>
                        )
                      }
                    }}
                  />
                )}
              />
            </Stack>
          );
        }}
      </FastField>
    );
  }
);

export default FormikMultiSelect;
