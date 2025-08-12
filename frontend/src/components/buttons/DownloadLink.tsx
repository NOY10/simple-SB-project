import { Typography } from '@mui/material';
import downloadFile from '../../utils/downloadFile';

interface DownloadLinkProps {
  label?: string;
  api: string;
  fileName: string;
}

const DownloadLink = ({ label = 'Download', api, fileName }: DownloadLinkProps) => {
  return (
    <Typography
      component="span"
      variant="body1"
      color="primary"
      fontWeight="bold"
      sx={{
        cursor: 'pointer',
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline',
          textUnderlineOffset: '3px'
        }
      }}
      onClick={() => downloadFile(api, fileName)}
    >
      {label}
    </Typography>
  );
};

export default DownloadLink;
