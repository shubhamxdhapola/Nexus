import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPinterest,
  FaSnapchatGhost,
  FaSpotify,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const ICONS = [
  { icon: <FaInstagram className="text-base-content/40 size-8 absolute" /> },
  { icon: <FaLinkedinIn className="text-base-content/40 size-8 absolute" /> },
  { icon: <FaFacebookF className="text-base-content/40 size-8 absolute" /> },
  { icon: <FaXTwitter className="text-base-content/40 size-8 absolute" /> },
  { icon: <FaYoutube className="text-base-content/40 size-8 absolute" /> },
  { icon: <FaSpotify className="text-base-content/40 size-8 absolute" /> },
  { icon: <FaTiktok className="text-base-content/40 size-8 absolute" /> },
  {
    icon: <FaSnapchatGhost className="text-base-content/40 size-8 absolute" />,
  },
  { icon: <FaPinterest className="text-base-content/40 size-8 absolute" /> },
];

const AuthPagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-14 fixed right-0 w-[45%] h-full">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {ICONS.map(({ icon }, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-primary/10 flex justify-center items-center ${
                i % 2 === 0 ? "animate-pulse" : ""
              }`}
            >
              {" "}
              {icon}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthPagePattern;
