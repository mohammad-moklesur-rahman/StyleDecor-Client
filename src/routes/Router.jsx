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
        Component: DashboardHome,
      },
      {
        path: "/dashboard/my-profile",
        Component: MyProfile,
      },
      {
        path: "/dashboard/add-service",
        Component: AddService,
      },
      {
        path: "/dashboard/my-bookings",
        Component: MyBookings,
      },
      {
        path: "/dashboard/manage-users",
        Component: ManageUsers,
      },
      {
        path: "/dashboard/manage-decorators",
        Component: ManageDecorators,
      },
      {
        path: "/dashboard/manage-bookings",
        Component: ManageBookings,
      },
      {
        path: "/dashboard/assign-decorator",
        Component: AssignDecorator,
      },
      {
        path: "/dashboard/my-projects",
        Component: MyAssignedProjects,
      },
      {
        path: "/dashboard/today-schedule",
        Component: TodaySchedule,
      },
      {
        path: "/dashboard/update-status",
        Component: UpdateProjectStatus,
      },
      {
        path: "/dashboard/payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "/dashboard/payment-history",
        Component: PaymentHistory,
      },
    ],
  },
]);

export default router;
