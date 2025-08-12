import DeleteFilled from '@ant-design/icons/DeleteFilled';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';

// project imports
import Avatar from '../../components/@extended/Avatar';
import { PopupTransition } from '../../components/@extended/Transitions';
import CircularWithPath from '../@extended/progress/CircularWithPath';

// ==============================|| DELETE ||============================== //

export default function DeleteConfirm({ modalProps, modalToggler, deleteAction }) {
  const closeModal = () => modalToggler({});
  const [isLoading, setIsLoading] = useState(false);

  const deleteHandler = async () => {
    setIsLoading(true);
    const result = await deleteAction(modalProps?.id);

    if (!result.success) {
      enqueueSnackbar(result.error, { variant: 'error' });

      setIsLoading(false);
      return;
    }

    enqueueSnackbar(result.message, { variant: 'success' });
    setIsLoading(false);
    closeModal();
  };

  return (
    <Dialog
      open={modalProps?.open}
      onClose={(event, reason) => {
        if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
          closeModal();
        }
      }}
      keepMounted
      maxWidth="xs"
      aria-labelledby="column-delete-title"
      aria-describedby="column-delete-description"
      slots={{ transition: PopupTransition }}
    >
      <DialogContent sx={{ mt: 2, my: 1 }}>
        <Stack sx={{ gap: 3.5, alignItems: 'center' }}>
          <Avatar color="error" sx={{ width: 72, height: 72, fontSize: '1.75rem' }}>
            <DeleteFilled />
          </Avatar>
          <Stack sx={{ gap: 2 }}>
            <Typography variant="h4" align="center">
              Confirm Action
            </Typography>
            <Typography align="center">
              Are you sure you want to delete{' '}
              <Box component="span" sx={{ fontWeight: 700 }}>
                {modalProps?.title || 'this item'}
              </Box>
              ? This action cannot be undone.
            </Typography>
          </Stack>

          <Stack direction="row" sx={{ gap: 2, width: 1 }}>
            <Button fullWidth onClick={closeModal} color="secondary" variant="outlined" disabled={isLoading}>
              Cancel
            </Button>
            <Button
              fullWidth
              color="error"
              variant="contained"
              onClick={deleteHandler}
              autoFocus
              disabled={isLoading}
              startIcon={isLoading && <CircularWithPath size={20} />}
            >
              {isLoading ? 'Deleting...' : 'Delete'}
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
