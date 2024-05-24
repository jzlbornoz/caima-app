import { useState } from "react";
import { logInUser, loginStatus } from "../stores/userStore";
import { useStore } from "@nanostores/react";
import { ErrorAlert } from "./ErrorAlert";

const LogInForm = () => {
  const $loginStatus = useStore(loginStatus);

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    logInUser(userLogin.email, userLogin.password);
  };

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
        className={`w-full px-4 py-2 text-white font-medium ${
          $loginStatus.status === "loading"
            ? "bg-backgroundColor"
            : "bg-lightPrimaryColor"
        } hover:bg-primaryColor active:bg-lightPrimaryColor rounded-lg duration-150`}
      >
        {$loginStatus.status === "loading" ? "Loading ..." : "Log In"}
      </button>
      {$loginStatus.status === "error" && (
        <ErrorAlert error={$loginStatus.message} />
      )}
      <div className="text-center">
        <a className="hover:text-lightPrimaryColor">Forgot password?</a>
      </div>
    </form>
  );
};

export { LogInForm };
