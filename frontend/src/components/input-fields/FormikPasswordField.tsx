import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps,
  Stack,
  Typography
} from '@mui/material';
import { FastField, FieldInputProps, FieldMetaProps, FormikProps } from 'formik';
import React, { useState } from 'react';

import { strengthColor, strengthIndicator } from '../../utils/password-strength';

type FormikPasswordFieldProps = OutlinedInputProps & {
  name: string;
  label?: string;
  required?: boolean;
};

const FormikPasswordField = React.memo(
  ({ name = 'password', label = 'Password', required = false, ...inputProps }: FormikPasswordFieldProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [level, setLevel] = useState<{ color: string; label: string } | null>(null);

    const handleToggleVisibility = () => setShowPassword((prev) => !prev);

    return (
      <FastField name={name}>
        {({ field, meta, form }: { field: FieldInputProps<any>; meta: FieldMetaProps<any>; form: FormikProps<any> }) => {
          const showError = meta.touched && Boolean(meta.error);

          const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            form.setFieldValue(name, value);
            const strength = strengthIndicator(value);
            setLevel(strengthColor(strength));
          };

          return (
            <Stack sx={{ gap: 1 }}>
              {label && (
                <InputLabel htmlFor={name}>
                  {label} {required && <span style={{ color: 'red' }}>*</span>}
                </InputLabel>
              )}

              <FormControl fullWidth variant="outlined" error={showError}>
                <OutlinedInput
                  {...field}
                  id={name}
                  placeholder={`Enter ${label}`}
                  type={showPassword ? 'text' : 'password'}
                  value={field.value}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handleToggleVisibility} edge="end" color="secondary">
                        {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                      </IconButton>
                    </InputAdornment>
                  }
                  {...inputProps}
                />
                {showError && <FormHelperText>{meta.error}</FormHelperText>}
              </FormControl>

              {field.value && level && (
                <Grid container spacing={1} alignItems="center">
                  <Grid>
                    <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                  </Grid>
                  <Grid>
                    <Typography variant="subtitle1" fontSize="0.75rem">
                      {level?.label}
                    </Typography>
                  </Grid>
                </Grid>
              )}
            </Stack>
          );
        }}
      </FastField>
    );
  }
);

export default FormikPasswordField;
