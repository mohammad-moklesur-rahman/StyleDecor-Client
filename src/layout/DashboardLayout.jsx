import { Link, Outlet } from "react-router";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { TbDeviceIpadDollar } from "react-icons/tb";
import { FaHistory, FaHome } from "react-icons/fa";
import {
  MdAssignmentInd,
  MdManageAccounts,
  MdManageHistory,
  MdOutlineManageAccounts,
} from "react-icons/md";
import { GoProjectSymlink } from "react-icons/go";
import { GrDocumentUpdate, GrSchedules } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const { role } = useRole();
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-gray-500 text-white">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <Link to="/dashboard" className="px-4">
            Dashboard
          </Link>
        </nav>
        {/* Page content here */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-gray-400 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}

            {/* Home page */}
            <li>
              <Link
                to="/"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right py-2.5 text-base-100 font-semibold"
                data-tip="Homepage"
              >
                {/* add profile icon */}
                <FaHome size={20} />
                <span className="is-drawer-close:hidden">Home page</span>
              </Link>
            </li>

            {/* My Profile */}
            <li>
              <Link
                to="/dashboard/my-profile"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right py-2.5 text-base-100 font-semibold"
                data-tip="My Profile"
              >
                {/* add profile icon */}
                <CgProfile size={20} />
                <span className="is-drawer-close:hidden">My Profile</span>
              </Link>
            </li>

            {role === "user" && (
              <>
                {/* My Bookings*/}
                <li>
                  <Link
                    to="/dashboard/my-bookings"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right py-2.5 text-base-100 font-semibold"
                    data-tip="My Bookings"
                  >
                    {/* add document icon */}
                    <TbDeviceIpadDollar size={20} />
                    <span className="is-drawer-close:hidden">My Bookings</span>
                  </Link>
                </li>

                {/* My Payment History*/}
                <li>
                  <Link
                    to="/dashboard/payment-history"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right py-2.5 text-base-100 font-semibold"
                    data-tip="Payment History"
                  >
                    {/* add document icon */}
                    <FaHistory size={20} />
                    <span className="is-drawer-close:hidden">
                      Payment History
                    </span>
                  </Link>
                </li>
              </>
            )}
            {role === "decorator" && (
              <>
                {/* My Assigned Projects */}
                <li>
                  <Link
                    to="/dashboard/my-projects"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right py-2.5 text-base-100 font-semibold"
                    data-tip="My Assigned Projects"
                  >
                    {/* add Project icon */}
                    <GoProjectSymlink size={20} />
                    <span className="is-drawer-close:hidden">
                      My Assigned Projects
                    </span>
                  </Link>
                </li>

                {/* Today Schedule */}
                <li>
                  <Link
                    to="/dashboard/today-schedule"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right py-2.5 text-base-100 font-semibold"
                    data-tip="Today Schedule"
                  >
                    {/* add Project icon */}
                    <GrSchedules size={20} />
                    <span className="is-drawer-close:hidden">
                      Today Schedule
                    </span>
                  </Link>
                </li>

                {/* Update Project Status */}
                <li>
                  <Link
                    to="/dashboard/update-status"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right py-2.5 text-base-100 font-semibold"
                    data-tip="Update Project Status"
                  >
                    {/* add update icon */}
                    <GrDocumentUpdate size={20} />
                    <span className="is-drawer-close:hidden">
                      Update Project Status
                    </span>
                  </Link>
                </li>
              </>
            )}
            {role === "admin" && (
              <>
                {/* Add service*/}
                <li>
                  <Link
                    to="/dashboard/add-service"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right py-2.5 text-base-100 font-semibold"
                    data-tip="Add Service"
                  >
                    {/* add document icon */}
                    <HiOutlineDocumentAdd size={20} />
                    <span className="is-drawer-close:hidden">Add Service</span>
                  </Link>
                </li>

                {/* Manage Users*/}
                <li>
                  <Link
                    to="/dashboard/manage-users"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right py-2.5 text-base-100 font-semibold"
                    data-tip="Manage Users"
                  >
                    {/* add Manage icon */}
                    <MdManageAccounts size={20} />
                    <span className="is-drawer-close:hidden">Manage Users</span>
                  </Link>
                </li>

                {/* Manage Decorators*/}
                <li>
                  <Link
                    to="/dashboard/manage-decorators"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right py-2.5 text-base-100 font-semibold"
                    data-tip="Manage Decorators"
                  >
                    {/* add Manage icon */}
                    <MdOutlineManageAccounts size={20} />
                    <span className="is-drawer-close:hidden">
                      Manage Decorators
                    </span>
                  </Link>
                </li>

                {/* Assign Decorator*/}
                <li>
                  <Link
                    to="/dashboard/assign-decorator"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right py-2.5 text-base-100 font-semibold"
                    data-tip="Assign Decorator"
                  >
                    {/* add Assign icon */}
                    <MdAssignmentInd size={20} />
                    <span className="is-drawer-close:hidden">
                      Assign Decorator
                    </span>
                  </Link>
                </li>

                {/* Manage Bookings*/}
                <li>
                  <Link
                    to="/dashboard/manage-bookings"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right py-2.5 text-base-100 font-semibold"
                    data-tip="Manage Bookings"
                  >
                    {/* add Manage icon */}
                    <MdManageHistory size={20} />
                    <span className="is-drawer-close:hidden">
                      Manage Bookings
                    </span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
