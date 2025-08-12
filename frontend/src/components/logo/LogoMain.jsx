import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import logo from '../../assets/images/icons/logo-icon.png';
import { ThemeMode } from '../../config';

export default function LogoMain({ reverse }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === ThemeMode.DARK || reverse;

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <img src={isDark ? logo : logo} alt="ATOMS Logo" width={80} height="auto" style={{ objectFit: 'contain' }} />
      <Typography variant="h3" fontWeight={700} color={isDark ? theme.palette.common.white : theme.palette.common.black}>
        ATOMS
      </Typography>
    </Box>
  );
}
