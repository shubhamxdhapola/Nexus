import {
  Copy,
  House,
  Layout,
  LayoutDashboard,
  LogIn,
  LogOut,
  Palette,
  Search,
  Sun,
  User,
  UserPen,
  UserPlus,
} from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/slices/auth.slice";
import toast from "react-hot-toast";

const Navbar = () => {
  const { pathname } = useLocation();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        console.log(res);
        navigate("/");
      })
      .catch((err) => toast.error(err.message));
  };
  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      `${import.meta.env.VITE_CLIENT_URL}/user/${user?.username}`
    );
    toast.success("Profile url copied");
  };
  return (
    <div
      className={`navbar bg-base-100 gap-4 shadow-sm justify-between px-4 py-2 md:px-8 md:py-4 sticky top-0 z-8 ${
        (pathname === "/login" ||
          pathname === "/register" ||
          pathname === "/theme") &&
        "hidden"
      }`}
    >
      <div className="">
        <Link to="/" className="btn btn-ghost text-lg sm:text-xl px-2">
          Nexus
        </Link>
      </div>
      <div className="flex justify-center items-center gap-2">
        {pathname != "/" && (
          <Link
            className="btn rounded-box bg-base-200 flex justify-center items-center"
            to="/"
          >
            <House className="size-4 sm:size-5" />
            <span className="hidden md:inline-block">Home</span>
          </Link>
        )}
        {user && pathname != "/dashboard" && (
          <Link
            to="/dashboard"
            className="btn rounded-box bg-base-200 flex justify-center items-center"
          >
            <User className="size-4 sm:size-5" />
            <span className="hidden md:inline-block">Profile</span>
          </Link>
        )}
        <Link
          className="btn rounded-box bg-base-200 flex justify-center items-center"
          to="/theme"
        >
          <Palette className="size-4 sm:size-5" />
          <span className="hidden md:inline-block">Themes</span>
        </Link>
        <button
          className={`btn rounded-box bg-base-200 flex justify-center items-center lg:hidden ${
            pathname === "/" && "hidden"
          } `}
          onClick={handleCopy}
        >
          <Copy className="size-4 sm:size-5" />
        </button>
        {!user ? (
          <>
            <Link
              className="btn rounded-box bg-base-200 flex justify-center items-center"
              to="/login"
            >
              <LogIn className="size-4 sm:size-5" />
              <span className="hidden md:inline-block">Login</span>
            </Link>
            <Link
              className="btn rounded-box bg-base-200 flex justify-center items-center"
              to="/register"
            >
              <UserPlus className="size-4 sm:size-5" />
              <span className="hidden md:inline-block">Register</span>
            </Link>
          </>
        ) : (
          <Link
            className="btn rounded-box bg-base-200 flex justify-center items-center"
            onClick={handleLogout}
          >
            <LogOut className="size-4 sm:size-5" />
            <span className="hidden md:inline-block">Logout</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
