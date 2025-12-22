/* eslint-disable */
import { Eye, EyeOffIcon } from "lucide-react";
import { useState } from "react";

const Input = ({ type, placeholder, value, Icon, onChange, label, name }) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  return (
    <div className="flex-1">
      <div className="relative">
        <div className="absolute inset-y-0 z-2 pl-3 flex items-center pointer-events-none">
          <Icon className="size-5 text-base-content/40" />
        </div>
        <label className="floating-label">
          <span className="text-[17px]">{label}</span>

          <input
            type={
              type == "password" ? (showPassword ? "text" : "password") : type
            }
            className="input border-[0.5px] border-base-content/20 w-full pl-10 py-6 placeholder:text-base-content/40 focus:outline-base-content/30 focus:outline-offset-2 focus:border-base-content/30"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            name={name}
          />
          {type === 'password' && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center z-2 cursor-pointer"
              onClick={toggleShowPassword}
            >
              {showPassword ? (
                <EyeOffIcon className="size-5 text-base-content/40" />
              ) : (
                <Eye className="size-5 text-base-content/40" />
              )}
            </button>
          )}
        </label>
      </div>
    </div>
  );
};

export default Input;
