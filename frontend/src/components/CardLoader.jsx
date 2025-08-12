// material-ui
import Stack from '@mui/material/Stack';

// project imports
import CircularWithPath from './@extended/progress/CircularWithPath';
import MainCard from './MainCard';

// ==============================|| LOADER - CIRCULAR ||============================== //

export default function CardLoader() {
  return (
    <MainCard sx={{ py: 8 }}>
      <Stack sx={{ alignItems: 'center', justifyContent: 'center', height: 1 }}>
        <CircularWithPath />
      </Stack>
    </MainCard>
  );
}
