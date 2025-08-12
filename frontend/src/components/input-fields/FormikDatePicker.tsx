import { InputLabel, Stack } from '@mui/material';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { FastField, FieldMetaProps, FieldInputProps, FormikProps } from 'formik';
import React from 'react';

type FormikDatePickerProps = DatePickerProps & {
  name: string;
  label?: string;
  required?: boolean;
};

const FormikDatePicker = React.memo(({ name = 'date', label = 'Select Date', ...props }: FormikDatePickerProps) => {
  return (
    <FastField name={name}>
      {({ field, meta, form }: { field: FieldInputProps<any>; meta: FieldMetaProps<any>; form: FormikProps<any> }) => {
        const showError = meta.touched && Boolean(meta.error);

        return (
          <Stack sx={{ gap: 1 }}>
            {label && (
              <InputLabel htmlFor={name}>
                {label} {props?.required && <span style={{ color: 'red' }}>*</span>}
              </InputLabel>
            )}
            <DatePicker
              {...props}
              value={field.value ? new Date(field.value) : null}
              onChange={(val) => {
                form.setFieldValue(name, val ? val.toISOString() : '');
              }}
              format="dd/MM/yyyy"
              slotProps={{
                textField: {
                  id: name,
                  fullWidth: true,
                  error: showError,
                  helperText: showError ? meta.error : '',
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
      }}
    </FastField>
  );
});

export default FormikDatePicker;
