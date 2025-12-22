import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DashboardLayout from "../layout/DashboardLayout";
import AddService from "../Dashboard/Admin/AddService";
import Services from "../pages/Services";
import ServiceDetails from "../pages/ServiceDetails";
import MyBookings from "../Dashboard/User/MyBookings";
import PaymentSuccess from "../Dashboard/User/PaymentSuccess";
import PaymentHistory from "../Dashboard/User/PaymentHistory";
import ManageBookings from "../Dashboard/Admin/ManageBookings";
import ManageUsers from "../Dashboard/Admin/ManageUsers";
import AssignDecorator from "../Dashboard/Admin/AssignDecorator";
import ManageDecorators from "../Dashboard/Admin/ManageDecorators";
import MyAssignedProjects from "../Dashboard/Decorator/MyAssignedProjects";
import TodaySchedule from "../Dashboard/Decorator/TodaySchedule";
import UpdateProjectStatus from "../Dashboard/Decorator/UpdateProjectStatus";
import MyProfile from "../Dashboard/MyProfile";
import DashboardHome from "../Dashboard/DashboardHome";
import PrivateRoute from "./PrivateRoute";
import DecoratorRoute from "./DecoratorRoute";
import AdminRoute from "./AdminRoute";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <NotFound />,
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
        Component: Services,
      },
      {
        path: "services/:id",
        Component: ServiceDetails,
      },
      {
        path: "about",
        Component: Home,
      },
      {
        path: "contact",
        Component: Home,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <DashboardHome />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },

      {
        path: "/dashboard/my-bookings",
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/add-service",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AddService />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/manage-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/manage-decorators",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageDecorators />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/assign-decorator",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AssignDecorator />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/manage-bookings",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageBookings />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-projects",
        element: (
          <PrivateRoute>
            <DecoratorRoute>
              <MyAssignedProjects />
            </DecoratorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/today-schedule",
        element: (
          <PrivateRoute>
            <DecoratorRoute>
              <TodaySchedule />
            </DecoratorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/update-status",
        element: (
          <PrivateRoute>
            <DecoratorRoute>
              <UpdateProjectStatus />
            </DecoratorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/payment-success",
        element: (
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/payment-history",
        element: (
          <PrivateRoute>
            <PaymentHistory />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
