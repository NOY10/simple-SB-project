// material-ui
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';

// project imports
import logoIcon from '../../assets/images/icons/logo-icon.png';

const logoProps = {
  lg: {
    logoWidth: '250px',
    logoFont: 'h1',
    gap: 4
  },
  md: {
    logoWidth: '180px',
    logoFont: 'h3',
    gap: 2
  }
};

const LogoFull = ({ size = 'lg' }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: logoProps[size].gap }}>
      <img src={logoIcon} alt="Atoms" width={logoProps[size].logoWidth} />
      <Typography variant={logoProps[size].logoFont} textAlign="center" fontWeight={700}>
        Air Transport and Operations Management System
      </Typography>
    </Box>
  );
};

export default LogoFull;
