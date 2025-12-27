import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { axiosInstace } from "../utils/axiosInstance";
import { LuUser } from "react-icons/lu";
import { Copy } from "lucide-react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const User = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [links, setLinks] = useState([]);
  const [searching, setSearching] = useState(true);
  const { theme } = useSelector((state) => state.theme);
  const location = useLocation();

  useEffect(() => {
    async function fetchUser() {
      const response = await axiosInstace.get(`/api/user/${id}`);
      setUser(response.data.user);
      setLinks(response.data.links);
      setSearching(false);
    }
    fetchUser();
  }, [id]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      `${import.meta.env.VITE_CLIENT_URL}${location.pathname}`
    );
    toast.success("Profile url copied");
  };

  if (searching) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  }
  return (
    <div
      className="flex justify-center items-center min-h-screen flex-col"
      data-theme={theme}
    >
      {links?.length > 0 ? (
        <div className="card bg-base-200 px-4 pt-8 pb-4 md:pb-6 md:px-6 shadow-md flex items-center gap-8 mx-auto w-90 border-base-content/10 border-[0.5px] ring-4 ring-offset-4 ring-offset-base-100 ring-base-200 max-h-[87vh] overflow-scroll scrollbar-hide">
          <button
            onClick={handleCopy}
            className="absolute right-4 top-4 cursor-pointer hover:text-base-content duration-300 text-base-content/80 tooltip tooltip-left"
            data-tip="Copy URL"
          >
            <Copy className=" size-4" />
          </button>
          <div className="flex flex-col items-center justify-center gap-4">
            {user?.profilePic ? (
              <div className="ring-primary ring-offset-base-100 w-20 rounded-full ring-2 ring-offset-3 flex items-center justify-center">
                <img
                  src={user?.profilePic}
                  alt="profile-photo"
                  className="w-20 h-20 rounded-full object-cover"
                />
              </div>
            ) : (
              <div className="avatar">
                <div className="ring-primary bg-base-100 ring-offset-base-100 w-21 rounded-full ring-2 ring-offset-3 flex items-center justify-center">
                  <LuUser className="text-2xl text-base-content" />
                </div>
              </div>
            )}

            <div className="flex justify-center items-center gap-1 flex-col">
              <span className="text-base-content">{user?.name}</span>
              <span className="text-sm text-base-content/70">{user?.bio}</span>
            </div>
          </div>
          <div className="flex flex-col justify-center w-full gap-4 mt-1">
            {links?.map((link) => (
              <Link
                to={link?.url}
                target="_blank"
                key={link._id}
                className="bg-base-100 p-4 text-center text-sm text-base-content card border-base-content/10 border-[0.5px]"
              >
                {link?.title}
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          {" "}
          <p className="text-base-content">
            This user hasn’t added any links yet.
          </p>
        </div>
      )}

      <Link
        to="https://www.instagram.com/orewashubham"
        className="-bottom-6 relative text-sm text-base-content"
        target="_blank"
      >
        Developed with 💖 by <span className="underline underline-offset-4 text-primary">SHUBHAM</span>
      </Link>
    </div>
  );
};

export default User;
