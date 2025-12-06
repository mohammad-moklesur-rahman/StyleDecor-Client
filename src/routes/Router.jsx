import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "home",
        Component: Home,
      },
      {
        path: "services",
        Component: Home,
      },
      {
        path: "about",
        Component: Home,
      },
      {
        path: "contact",
        Component: Home,
      },
    ],
  },
]);

export default router;
