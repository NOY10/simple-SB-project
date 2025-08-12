import DashboardLayout from "layout/Dashboard";
import Loadable from "components/Loadable";
import { lazy } from "react";

const Dashboard = Loadable(lazy(() => import('../pages/dashboard')));
const Posts = Loadable(lazy(() => import('../pages/posts')));
const MaintenanceError500 = Loadable(lazy(() => import('../pages/extra-pages/500')));

const User = Loadable(lazy(() => import('../pages/user/User')));
const Password = Loadable(lazy(() => import('../pages/user/Password')));

const MainRoutes = {
  path: '/',
  errorElement: <MaintenanceError500 />,
  children: [
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: '/dashboard',
          element: <Dashboard />
        },
      ]
    },
    {
      path: '/post',
      element: <DashboardLayout />,
      children: [
        {
          path: 'posts',
          element: <Posts />
        },
      ]
    },
       {
      path: '/user',
      element: <DashboardLayout />,
      children: [
        {
          path: 'user',
          element: <User />
        },
        {
          path: 'password',
          element: <Password />
        },
      ]
    },
      

  ]
};

export default MainRoutes;
