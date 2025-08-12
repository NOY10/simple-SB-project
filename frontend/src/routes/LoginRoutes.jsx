import { lazy } from "react";
import Loadable from "../components/Loadable";
import AuthLayout from "../layout/Auth";
import { APP_AUTH, AuthProvider } from '../config';

const JwtAuthLogin = Loadable(lazy(() => import("../pages/auth/jwt/login")));
const Register = Loadable(lazy(() => import("../pages/auth/jwt/register")));
const MaintenanceError = Loadable(
  lazy(() => import("../pages/extra-pages/404"))
);


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
            { path: "register", element: <Register /> },
          ],
        },
      ],
    },
  ],
};


export default LoginRoutes;
