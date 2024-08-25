import { useEffect, useState } from "react";
import {
  logInUser,
  loginStatus,
  sendResetPasswordStatus,
  userInfo,
} from "../../stores/userStore";
import { useStore } from "@nanostores/react";
import { ErrorAlert } from "../ErrorAlert";
import { navigate } from "astro/virtual-modules/transitions-router.js";
import { SendRecoveryPasswordButton } from "./components/SendRecoveryPasswordButton";
import { SuccessAlert } from "../SuccessAlert";

const Login = () => {
  const $loginStatus = useStore(loginStatus);
  const $sendEmailRecoveryStatus = useStore(sendResetPasswordStatus);
  const $userInfo = useStore(userInfo);

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    loginStatus.set({ status: "", message: "" });
    sendResetPasswordStatus.set({ status: "", message: "" });
    logInUser(userLogin.email, userLogin.password);
  };

  useEffect(() => {
    if ($loginStatus.status === "success" || $userInfo?.accessToken) {
      navigate("/home");
    }
  }, [$loginStatus, $userInfo]);

  return (
    <form className="mt-8 space-y-5">
      <div>
        <label className="font-medium"> Email </label>
        <input
          type="email"
          required
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-lightPrimaryColor shadow-sm rounded-lg"
          onChange={(e) =>
            setUserLogin({ ...userLogin, email: e.target.value })
          }
        />
      </div>
      <div>
        <label className="font-medium"> Password </label>
        <input
          type="password"
          required
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-lightPrimaryColor shadow-sm rounded-lg"
          onChange={(e) =>
            setUserLogin({ ...userLogin, password: e.target.value })
          }
        />
      </div>
      <button
        type="button"
        onClick={() => handleSubmit()}
        className={`w-full px-4 py-2 text-white font-medium ${$loginStatus.status === "loading"
          ? "bg-backgroundColor"
          : "bg-lightPrimaryColor"
          } hover:bg-primaryColor active:bg-lightPrimaryColor rounded-lg duration-150`}
      >
        {$loginStatus.status === "loading" ? "Loading ..." : "Log In"}
      </button>
      {$loginStatus.status === "error" && <SendRecoveryPasswordButton />}
      {$loginStatus.status === "error" && (
        <ErrorAlert error={"Email or password are incorrect"} />
      )}
      {$sendEmailRecoveryStatus.status === "success" ? (
        <SuccessAlert header={"Email sent successfully"} />
      ) : (
        $sendEmailRecoveryStatus.status === "error" && (
          <ErrorAlert
            error={"Email don't exist. Please try again with a valid email"}
          />
        )
      )}
    </form>
  );
};

export { Login };
