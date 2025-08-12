// components
import { CloseOutlined } from '@ant-design/icons';
import { DialogTitle, Divider, IconButton, Modal } from '@mui/material';

import SimpleBar from '..//third-party/SimpleBar';
import MainCard from '../MainCard';

export default function MasterModal({ open, onClose, title, children, maxWidth = 768, minWidth = 320, showClose = true }) {
  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
      onClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      disableEscapeKeyDown
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{ '& .MuiPaper-root:focus': { outline: 'none' } }}
    >
      <MainCard
        sx={{
          minWidth: { xs: minWidth, sm: 600, md: maxWidth },
          maxWidth: maxWidth,
          height: 'auto',
          maxHeight: 'calc(100vh - 48px)'
        }}
        modal
        content={false}
      >
        <SimpleBar sx={{ maxHeight: `calc(100vh - 48px)`, '& .simplebar-content': { display: 'flex', flexDirection: 'column' } }}>
          {title && (
            <>
              <DialogTitle id="modal-title" sx={{ position: 'relative', pr: showClose ? 6 : 2 }}>
                {title}
                {showClose && (
                  <IconButton
                    onClick={onClose}
                    sx={{
                      position: 'absolute',
                      right: 10,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      borderRadius: '50%',
                      transition: (theme) => theme.transitions.create(['background-color', 'box-shadow']),
                      '&:hover': {
                        boxShadow: (theme) => theme.shadows[2],
                        backgroundColor: (theme) => theme.palette.background.default
                      }
                    }}
                    aria-label="close"
                    size="medium"
                  >
                    <CloseOutlined style={{ fontSize: '18px', color: 'red' }} />
                  </IconButton>
                )}
              </DialogTitle>
              <Divider />
            </>
          )}
          {children}
        </SimpleBar>
      </MainCard>
    </Modal>
  );
}
