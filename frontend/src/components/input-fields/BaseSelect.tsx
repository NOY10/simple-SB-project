import { InputLabel, MenuItem, Stack, TextField, TextFieldProps } from '@mui/material';
import React from 'react';

type OptionType = Record<string, any>;

type BaseSelectProps = TextFieldProps & {
  name: string;
  label?: string;
  options: OptionType[];
  loader?: boolean;
  optionLabel?: string;
  optionValue?: string;
};

const BaseSelect = React.memo(
  ({
    name = 'item',
    label = 'Item',
    options = [],
    loader = false,
    optionLabel = 'name',
    optionValue = 'id',
    ...props
  }: BaseSelectProps) => {
    return (
      <Stack sx={{ gap: 1 }}>
        {label && (
          <InputLabel htmlFor={name}>
            {label} {props?.required && <span style={{ color: 'red' }}>*</span>}
          </InputLabel>
        )}
        <TextField
          select
          fullWidth
          id={name}
          name={name}
          disabled={loader || props?.disabled}
          slotProps={{
            select: {
              displayEmpty: true
            }
          }}
          {...props}
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
  }
);

export default BaseSelect;
