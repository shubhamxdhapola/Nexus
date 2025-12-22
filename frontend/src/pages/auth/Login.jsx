import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthPagePattern from "../../components/AuthPagePattern";
import { Link2, Loader2, Lock, Mail } from "lucide-react";
import Input from "../../components/input/Input";
import { validateLoginForm } from "../../utils/helper";
import { googleSignIn, loginUser } from "../../redux/slices/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../config/firebase";
import toast from "react-hot-toast";

const Login = () => {
  const defaultFormData = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(defaultFormData);
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleGoogleSignIn = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const token = await response.user.getIdToken();
      dispatch(googleSignIn(token))
        .unwrap()
        .then((res) => {
          toast.success(res.message);
          navigate("/dashboard", { replace: true });
        })
        .catch((err) => toast.error(err.message));
    } catch (error) {
      toast.error("Unable to sign in");
      console.log("Error in oAuth : ", error);
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const isFormValid = validateLoginForm(formData.email, formData.password);

    if (isFormValid === true) {
      dispatch(loginUser(formData))
        .unwrap()
        .then((res) => {
          toast.success(res.message);
          navigate("/dashboard", { replace: true });
        })
        .catch((err) => toast.error(err.message));
    }
  };
  return (
    <div className="min-h-screen grid lg:grid-cols-[1fr_45%]">
      <AuthPagePattern
        title="Join our community!"
        subtitle="Start organizing your links in one beautiful, shareable space."
      />

      <div className="flex flex-col justify-center items-center p-6 sm:px-20 sm:py-14">
        <div className="w-full max-w-2xl space-y-6">
          <div className="mb-10">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Link2 className="size-6 text-primary" />
              </div>
              <h1 className="text-lg font-bold mt-2">Login Account</h1>
              <p className="text-base-content/60 text-[0.9rem] -mt-1">
                Get started with your free account
              </p>
            </div>
          </div>

          <form
            className="space-y-6 max-w-md mx-auto"
            onSubmit={handleOnSubmit}
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={formData?.email}
              Icon={Mail}
              onChange={handleOnChange}
              label="Email"
              name="email"
            />
            <Input
              type="password"
              placeholder="Enter your password"
              value={formData?.password}
              Icon={Lock}
              onChange={handleOnChange}
              label="Password"
              name="password"
            />

            <button
              className={`btn btn-primary w-full  rounded-box ${
                loading ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="flex justify-center flex-col gap-1 -mt-4 max-w-md mx-auto">
            <div className="text-center p-4 flex items-center justify-center">
              <hr className="grow border-t border-base-content/30" />
              <span className="text-base-content/60 text-sm mx-4">OR</span>
              <hr className="grow border-t border-base-content/30" />
            </div>
            <button
              className="btn w-full bg-white flex  items-center justify-center text-black border-[#e5e5e5] rounded-box mx-auto"
              onClick={handleGoogleSignIn}
            >
              <span className="">
                <svg
                  aria-label="Google logo"
                  width="25"
                  height="25"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    ></path>
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    ></path>
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    ></path>
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    ></path>
                  </g>
                </svg>
              </span>
              <span className="justify-self-center">Continue with Google</span>
            </button>
          </div>

          <div className="text-center text-sm">
            <p className="text-base-content/60">
              Don't have an account? {""}
              <Link to="/register" className="link link-primary">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

