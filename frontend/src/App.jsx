import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { useEffect } from "react";
import { getUserInfo } from "./redux/slices/auth.slice";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const { authenticating } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  if (authenticating) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  }

  return (
    <div data-theme={theme}>
      <Toaster
        toastOptions={{
          style: { fontSize: "13px", fontFamily: "inherit" },
        }}
      />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
