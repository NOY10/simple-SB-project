import { UploadOutlined } from '@ant-design/icons';
import { Button, FormHelperText, InputLabel, Stack, Typography } from '@mui/material';
import { FastField, FieldInputProps, FieldMetaProps, FormikProps } from 'formik';
import DownloadLink from '../buttons/DownloadLink';
import { Box } from '@mui/system';
import React from 'react';

type FormikFileUploadProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  fileName?: string;
  downloadApi?: string;
};

const FormikFileUpload = React.memo(
  ({
    name = 'file',
    label = 'Upload file',
    fileName = '',
    downloadApi = '',
    accept = 'image/*,application/pdf',
    ...props
  }: FormikFileUploadProps) => {
    return (
      <FastField name={name}>
        {({ field, meta, form }: { field: FieldInputProps<any>; meta: FieldMetaProps<any>; form: FormikProps<any> }) => {
          const { value } = field;
          const showError = meta.touched && Boolean(meta.error);

          const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.currentTarget.files?.[0] || null;
            form.setFieldValue(name, file);
            form.setFieldTouched(name, true);
          };

          return (
            <Stack sx={{ gap: 1 }}>
              {label && (
                <InputLabel>
                  {label} {props?.required && <span style={{ color: 'red' }}>*</span>}
                </InputLabel>
              )}

              <Box display="flex" alignItems="center" gap={2}>
                <label htmlFor={name}>
                  <input id={name} name={name} type="file" accept={accept} onChange={handleChange} style={{ display: 'none' }} {...props} />
                  <Button
                    variant="outlined"
                    component="span"
                    color="primary"
                    startIcon={<UploadOutlined />}
                    className="pe-2"
                    disabled={props?.disabled}
                  >
                    Upload File
                  </Button>
                </label>
                {fileName && downloadApi && <DownloadLink api={downloadApi} fileName={fileName} />}
              </Box>

              {value && (
                <Typography variant="body2" color="text.secondary">
                  {(value as File).name}
                </Typography>
              )}

              {showError && <FormHelperText error>{meta.error}</FormHelperText>}
            </Stack>
          );
        }}
      </FastField>
    );
  }
);

export default FormikFileUpload;
