import { IconButton, Menu, MenuItem, ListItemIcon, Typography, Divider } from '@mui/material';
import MoreOutlined from '@ant-design/icons/MoreOutlined';
import React, { useMemo, useState } from 'react';

export interface MenuAction {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  visible?: boolean;
}

interface ActionMenuProps {
  actions: MenuAction[];
}

const ActionMenu = ({ actions }: ActionMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const visibleActions = actions.filter((a) => a.visible !== false);

  // MUI throws an warning in console if we wrap MenuItem and divider with React.Fragment
  // So we need to use an array instead, and wrap with useMemo for safety
  const renderedMenuItems = useMemo(
    () =>
      visibleActions.flatMap((action, index) => [
        <MenuItem
          key={`item-${index}-${action?.label}`}
          onClick={() => {
            action.onClick();
            handleClose();
          }}
          sx={{
            px: 2,
            py: 1,
            '&:hover': {
              bgcolor: 'primary.main',
              '& .MuiTypography-root': {
                color: 'white'
              },
              '& .MuiListItemIcon-root': {
                color: 'white'
              }
            }
          }}
        >
          {action.icon && <ListItemIcon>{action.icon}</ListItemIcon>}
          <Typography fontSize="0.95rem" fontWeight={400}>
            {action.label}
          </Typography>
        </MenuItem>,
        index < visibleActions.length - 1 && (
          <Divider
            key={`divider-${index}`}
            sx={{
              margin: '0 !important'
            }}
          />
        )
      ]),
    [visibleActions]
  );

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{
          color: 'primary.main',
          fontSize: '1.5rem',
          '&:hover': {
            bgcolor: 'primary.lighter'
          }
        }}
      >
        <MoreOutlined />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          '& .MuiMenu-paper': {
            minWidth: 140
          },
          '& .MuiMenu-list': {
            p: 0
          }
        }}
      >
        {renderedMenuItems}
      </Menu>
    </>
  );
};

export default ActionMenu;
