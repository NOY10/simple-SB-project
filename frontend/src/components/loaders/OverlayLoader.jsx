import { Box, Card, CircularProgress } from '@mui/material';

const OverlayLoader = ({ style = {} }) => {
  return (
    <Card
      sx={{
        position: 'absolute',
        inset: 0,
        opacity: 0.8,
        mb: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style
      }}
    >
      <Box textAlign="center">
        <CircularProgress />
      </Box>
    </Card>
  );
};

export default OverlayLoader;
