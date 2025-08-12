import DownloadOutlined from '@ant-design/icons/DownloadOutlined';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import PropTypes from 'prop-types';
import { CSVLink } from 'react-csv';

export default function CSVExport({ data, filename, headers }) {
  return (
    <CSVLink data={data} filename={filename} headers={headers}>
      <Tooltip title="CSV Export">
        <Box sx={{ color: 'text.secondary' }}>
          <DownloadOutlined style={{ fontSize: '24px', marginTop: 4, marginRight: 4, marginLeft: 4 }} />
        </Box>
      </Tooltip>
    </CSVLink>
  );
}

CSVExport.propTypes = { data: PropTypes.array, filename: PropTypes.string, headers: PropTypes.any };
