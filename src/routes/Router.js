import { Navigate } from "react-router-dom";
import FullLayout from "../layouts/FullLayout";
import Starter from "../views/Starter";
import About from "../views/About";
import Badges from "../views/ui/Badges";
// import login from "../views/login";
// import Login from "../components/login";
// import RegistrationPage from "../components/RegistrationPage";
// import AuthLayout from "../components/AuthLayout";

const ThemeRoutes = [
  {
    path: "/",
    
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/starter" /> },
      { path: "/starter", exact: true, element: <Starter /> },
      { path: "/about", exact: true, element: <About /> },
      { path: "/badges", exact: true, element: <Badges /> },
      // { path: "/login", exact: true, element: <Login /> },
      // { path: "/RegistrationPage", exact: true, element: <RegistrationPage /> },
    ],
  },
];

export default ThemeRoutes;
