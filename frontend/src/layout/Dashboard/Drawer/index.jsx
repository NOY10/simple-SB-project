// src/layout/Sidebar.jsx
import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Toolbar
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import menuItems from '../../../menu-items/index';

const drawerWidth = 240;

const Sidebar = ({ open, onClose }) => {
  const [openCollapse, setOpenCollapse] = React.useState({});
  const navigate = useNavigate();

  const handleCollapseToggle = (id) => {
    setOpenCollapse((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const renderNavItems = (items) =>
    items?.map((item) => {
      if (item.type === 'group' && item.children) {
        return renderNavItems(item.children);
      }

      if (item.type === 'collapse') {
        return (
          <React.Fragment key={item.id}>
            <ListItem button onClick={() => handleCollapseToggle(item.id)}>
              <ListItemIcon>{item.icon && <item.icon />}</ListItemIcon>
              <ListItemText primary={item.title} />
              {openCollapse[item.id] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openCollapse[item.id]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {renderNavItems(item.children)}
              </List>
            </Collapse>
          </React.Fragment>
        );
      }

      if (item.type === 'item') {
        return (
          <ListItem button key={item.id} onClick={() => navigate(item.url)}>
            <ListItemText inset primary={item.title} />
          </ListItem>
        );
      }

      return null;
    });

  return (
    <Drawer
      variant="persistent"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box'
        }
      }}
    >
      <Toolbar />
      <List>{renderNavItems(menuItems.items)}</List>
    </Drawer>
  );
};

export default Sidebar;
