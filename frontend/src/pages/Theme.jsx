import { useDispatch, useSelector } from "react-redux";
import { THEMES } from "../utils/themeConstants";
import { setTheme } from "../redux/slices/theme.slice";
import toast from "react-hot-toast";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Theme = () => {
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleThemeChange = (t) => {
    dispatch(setTheme(t))
      .then(toast.success("Theme applied"))
      .catch(toast.error("Unable to change theme"));
  };

  const handleNavigate = () => navigate(-1);

  return (
    <>
      <div className="h-auto mx-auto px-4 sm:px-12 md:px-16 lg:px-20 py-10 max-w-5xl">
        <div className="space-y-6">
          <div data-aos="fade-right">
            <div className="flex justify-between items-center gap-1 mb-4">
              <div>
                <h2 className="text-md md:text-lg font-semibold">Themes</h2>
                <p className=" text-xs md:text-sm text-base-content/70">
                  Choose a theme for your interface
                </p>
              </div>

              <button
                className="tooltip flex items-center justify-center text-base-content/70 hover:text-base-content duration-300 cursor-pointer pe-2 "
                onClick={handleNavigate}
                data-tip="Go Back"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 mt-10">
              {THEMES.map((t) => (
                <button
                  key={t}
                  className={`
                    group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
                    ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}
                  `}
                  onClick={() => handleThemeChange(t)}
                >
                  <div
                    className="relative h-8 w-full rounded-md overflow-hidden"
                    data-theme={t}
                  >
                    <div className="absolute inset-0 grid grid-cols-3 gap-px p-1">
                      <div className="rounded bg-primary"></div>
                      <div className="rounded bg-secondary"></div>
                      <div className="rounded bg-neutral"></div>
                      {/* <div className="rounded bg-accent"></div> */}
                    </div>
                  </div>
                  <span className="text-[11px] font-medium truncate w-full text-center">
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Theme;
