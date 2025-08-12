import { lazy } from "react";
import Loadable from "../components/Loadable";

const JwtAuthLogin = Loadable(lazy(() => import("../pages/auth/jwt/login")));
const MaintenanceError = Loadable(
  lazy(() => import("../pages/extra-pages/404"))
);
import AuthLayout from "../layout/Auth";

import { APP_AUTH, AuthProvider } from '../config';

const LoginRoutes = {
  path: "/",
  errorElement: <MaintenanceError />,
  children: [
    {
      path: "",             
      element: <AuthLayout />,
      children: [
        {
          path: APP_AUTH === AuthProvider.JWT ? "" : "jwt",
          
          children: [
            { path: "", element: <JwtAuthLogin /> },      // matches '/'
            { path: "login", element: <JwtAuthLogin /> }, // matches '/login'
          ],
        },
      ],
    },
  ],
};


export default LoginRoutes;
