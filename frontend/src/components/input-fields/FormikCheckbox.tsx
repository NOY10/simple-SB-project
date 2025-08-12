import React from 'react';
import { Checkbox, CheckboxProps, FormHelperText, InputLabel, Stack } from '@mui/material';
import { FastField, FieldInputProps, FieldMetaProps, FormikProps } from 'formik';
import { Box } from '@mui/system';

type FormikCheckboxProps = CheckboxProps & {
  name: string;
  label?: string;
  required?: boolean;
};

const FormikCheckbox = React.memo(({ name = 'checkbox', label = 'Checkbox', required = false, ...props }: FormikCheckboxProps) => {
  return (
    <FastField name={name}>
      {({ field, meta, form }: { field: FieldInputProps<any>; meta: FieldMetaProps<any>; form: FormikProps<any> }) => {
        const showError = meta.touched && Boolean(meta.error);

        return (
          <Stack gap={1} sx={{ display: 'inline-flex', alignItems: 'flex-start' }}>
            {label && (
              <InputLabel>
                {label} {required && <span style={{ color: 'red' }}>*</span>}
              </InputLabel>
            )}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                height: 40
              }}
            >
              <Checkbox
                id={name}
                {...props}
                name={name}
                checked={Boolean(field.value)}
                onChange={(e) => form.setFieldValue(name, e.target.checked)}
                onBlur={field.onBlur}
              />
            </Box>
            {showError && <FormHelperText error>{meta.error}</FormHelperText>}
          </Stack>
        );
      }}
    </FastField>
  );
});

export default FormikCheckbox;
