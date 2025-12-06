import { Outlet } from "react-router";
import Navbar from "../components/Shared/Navbar";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default RootLayout;
