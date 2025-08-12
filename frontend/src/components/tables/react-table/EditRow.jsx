import CloseOutlined from '@ant-design/icons/CloseOutlined';
import EditTwoTone from '@ant-design/icons/EditTwoTone';
import SendOutlined from '@ant-design/icons/SendOutlined';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import * as Yup from 'yup';

import LinearWithLabel from '../../../components/@extended/progress/LinearWithLabel';

function ShowStatus(value) {
  switch (value) {
    case 'Complicated':
      return <Chip color="error" label="Complicated" size="small" />;
    case 'Relationship':
      return <Chip color="success" label="Relationship" size="small" />;
    case 'Single':
    default:
      return <Chip color="info" label="Single" size="small" />;
  }
}

export default function EditRow({ row, onSave }) {
  const [isEditMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});

  const initialEditData = useRef(
    row.getVisibleCells().reduce((acc, cell) => {
      if (cell.column.id !== 'Actions') {
        acc[cell.column.id] = cell.getValue();
      }
      return acc;
    }, {})
  );

  const [editData, setEditData] = useState(initialEditData.current);

  const validationSchemas = {
    email: Yup.string().email('Invalid email').required('Email is required'),
    age: Yup.number().required('Age is required').min(18, 'Minimum age is 18').max(65, 'Maximum age is 65'),
    visits: Yup.number().required('Visits are required').positive('Must be positive').integer('Must be an integer'),
    name: Yup.string().required('Name is required')
  };

  const handleValidate = async () => {
    const newErrors = {};

    for (const key in editData) {
      const schema = validationSchemas[key];
      if (schema) {
        try {
          await schema.validate(editData[key]);
        } catch (error) {
          newErrors[key] = error.message;
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveClick = async () => {
    const isValid = await handleValidate();
    if (isValid) {
      onSave(editData);
      setEditMode(false);
    }
  };

  const handleChange = (columnId, value) => {
    setEditData((prev) => ({ ...prev, [columnId]: value }));
  };

  const handleCancelClick = () => {
    setEditData(initialEditData.current);
    setErrors({});
    setEditMode(false);
  };

  return (
    <TableRow>
      {row.getVisibleCells().map((cell) => {
        const columnId = cell.column.id;
        // @ts-expect-error: columnDef may not always have a `dataType` property
        const dataType = cell.column.columnDef.dataType;
        const value = cell.getValue();

        let cellContent;
        switch (dataType) {
          case 'text':
          case 'number':
            cellContent = isEditMode ? (
              <Stack>
                <TextField
                  fullWidth
                  size="small"
                  type={dataType === 'number' ? 'number' : 'text'}
                  value={editData[columnId]}
                  onChange={(e) => handleChange(columnId, dataType === 'number' ? Number(e.target.value) : e.target.value)}
                  error={Boolean(errors[columnId])}
                  helperText={errors[columnId]}
                />
              </Stack>
            ) : (
              value
            );
            break;

          case 'select':
            cellContent = isEditMode ? (
              <Select value={editData[columnId]} onChange={(e) => handleChange(columnId, e.target.value)} size="small">
                <MenuItem value="Complicated">
                  <Chip color="error" label="Complicated" size="small" />
                </MenuItem>
                <MenuItem value="Relationship">
                  <Chip color="success" label="Relationship" size="small" />
                </MenuItem>
                <MenuItem value="Single">
                  <Chip color="info" label="Single" size="small" />
                </MenuItem>
              </Select>
            ) : (
              ShowStatus(value)
            );
            break;

          case 'progress':
            cellContent = isEditMode ? (
              <Slider
                value={editData[columnId]}
                min={0}
                max={100}
                step={1}
                onChange={(_, newValue) => handleChange(columnId, newValue)}
                valueLabelDisplay="auto"
              />
            ) : (
              <LinearWithLabel value={value} sx={{ minWidth: 75 }} />
            );
            break;

          case 'actions':
            cellContent = isEditMode ? (
              <Stack direction="row" spacing={1}>
                <Tooltip title="Cancel">
                  <IconButton color="error" onClick={handleCancelClick}>
                    <CloseOutlined />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Save">
                  <IconButton color="success" onClick={handleSaveClick}>
                    <SendOutlined />
                  </IconButton>
                </Tooltip>
              </Stack>
            ) : (
              <Tooltip title="Edit">
                <IconButton color="primary" onClick={() => setEditMode(true)}>
                  <EditTwoTone />
                </IconButton>
              </Tooltip>
            );
            break;

          default:
            cellContent = value;
        }

        return (
          <TableCell key={cell.id} {...cell.column.columnDef.meta}>
            {cellContent}
          </TableCell>
        );
      })}
    </TableRow>
  );
}

EditRow.propTypes = { row: PropTypes.object, onSave: PropTypes.func };
