import React from 'react';
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Outlet } from 'react-router-dom';

import Sidebar from './Drawer/index';
import AuthGuard from '../../utils/route-guard/AuthGuard';
import useAuth from 'hooks/useAuth';

const drawerWidth = 240;

export default function DashboardLayout() {
  const [open, setOpen] = React.useState(true);
  const { user, logout } = useAuth(); // assuming logout exists

  const handleDrawerToggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <AuthGuard>
      <>
        <CssBaseline />

        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ marginRight: 2 }}
            >
              <MenuIcon />
            </IconButton>

            {/* Left-side: Hello username */}
            <Typography variant="h6" noWrap component="div">
              Hello {user?.username}
            </Typography>

            {/* Push content to the right */}
            <Box sx={{ flexGrow: 1 }} />

            {/* Logout button */}
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        <Sidebar open={open} onClose={handleDrawerToggle} />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            marginLeft: open ? `${drawerWidth}px` : 0,
            transition: 'margin 0.3s'
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </>
    </AuthGuard>
  );
}
