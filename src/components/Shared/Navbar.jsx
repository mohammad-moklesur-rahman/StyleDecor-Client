import { Link, NavLink, useLocation } from "react-router";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Button from "./Button";
import Logo from "./Logo";
import MyContainer from "./MyContainer";
import useAuth from "../../hooks/UseAuth";

const Navbar = () => {
  const { user, signOUt, authLoading } = useAuth();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);

  const menuItems = ["Home", "Services", "About", "Contact"];
  const linkPath = (name) => (name === "Home" ? "/" : `/${name.toLowerCase()}`);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handelSignOut = () => {
    signOUt();
  };

  return (
    <Motion.div
      className="bg-secondary"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <MyContainer>
        <div className="navbar">
          {/* LEFT */}
          <div className="navbar-start flex items-center gap-3">
            {/* Mobile Hamburger */}
            <div className="lg:hidden relative" ref={menuRef}>
              <button
                onClick={() => setOpen(!open)}
                className="btn btn-ghost p-2"
              >
                <Motion.svg
                  initial={false}
                  animate={{ rotate: open ? 90 : 0 }}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </Motion.svg>
              </button>

              {/* Modern dropdown */}
              <AnimatePresence>
                {open && (
                  <Motion.ul
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="absolute top-12 left-0 right-0 mx-auto w-52 bg-white rounded-2xl shadow-lg p-4 flex flex-col gap-2 z-50"
                  >
                    {menuItems.map((item) => {
                      const path = linkPath(item);
                      const isActive = location.pathname === path;
                      return (
                        <Motion.li
                          key={item}
                          whileHover={{ scale: 1.03 }}
                          transition={{ duration: 0.2 }}
                          className={`py-3 px-4 rounded-lg cursor-pointer flex items-center ${
                            isActive
                              ? "bg-primary/10 text-primary font-semibold"
                              : "hover:bg-gray-50 text-gray-800 font-medium"
                          }`}
                        >
                          <NavLink
                            to={path}
                            onClick={() => setOpen(false)}
                            className="w-full"
                          >
                            {item}
                          </NavLink>
                        </Motion.li>
                      );
                    })}
                  </Motion.ul>
                )}
              </AnimatePresence>
            </div>

            <Link to="/">
              <Motion.div whileHover={{ scale: 1.05 }}>
                <Logo />
              </Motion.div>
            </Link>
          </div>

          {/* CENTER */}
          <div className="navbar-center hidden lg:flex">
            <ul className="flex gap-6">
              {menuItems.map((item) => {
                const path = linkPath(item);
                const isActive = location.pathname === path;

                return (
                  <Motion.li
                    key={item}
                    className="relative cursor-pointer"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.2 }}
                  >
                    <NavLink
                      to={path}
                      className={`font-medium ${
                        isActive ? "text-primary" : "text-gray-700"
                      }`}
                    >
                      {item}
                    </NavLink>

                    {/* Animated underline */}
                    <AnimatePresence>
                      {isActive && (
                        <Motion.div
                          layoutId="underline"
                          className="absolute left-0 right-0 h-0.5 bg-primary mx-auto"
                          style={{ bottom: -3 }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        />
                      )}
                    </AnimatePresence>
                  </Motion.li>
                );
              })}
            </ul>
          </div>

          {/* RIGHT */}
          <div className="navbar-end">
            {authLoading ? (
              // Only button area loading spinner
              <div className="w-24 h-10 flex items-center justify-end">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : user ? (
              <>
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} className="avatar avatar-online">
                    <div className="w-8 sm:w-10 rounded-full border-2 border-primary">
                      <img
                        src={
                          user.photoURL ||
                          "https://img.icons8.com/?size=100&id=z-JBA_KtSkxG&format=png&color=000000"
                        }
                      />
                    </div>
                  </div>

                  <ul
                    tabIndex="-1"
                    className="dropdown-content menu font-semibold bg-secondary rounded-box z-10 w-35 p-1 mt-2 shadow-sm"
                  >
                    <li>
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                      <a onClick={handelSignOut}>Sign Out</a>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <Motion.div whileHover={{ scale: 1.05 }}>
                <Link to="/login">
                  <Button className="px-8 py-2 rounded-xl">Login</Button>
                </Link>
              </Motion.div>
            )}
          </div>
        </div>
      </MyContainer>
    </Motion.div>
  );
};

export default Navbar;
