import { useEffect, useState } from "react";
import { addUserItem, loginStatus } from "../stores/userStore";
import { navigate } from "astro/virtual-modules/transitions-router.js";
import { useStore } from "@nanostores/react";
import { ErrorAlert } from "./ErrorAlert";
import { SuccessAlert } from "./SuccessAlert";

const SignInForm = () => {
  const $loginStatus = useStore(loginStatus);

  const [newUserData, setNewUserData] = useState<UserInterface>(
      {} as UserInterface
    ),
    [password, setPassword] = useState(""),
    [formError, setFormError] = useState("");

  useEffect(() => {
    setNewUserData({} as UserInterface);
    setPassword("");
  }, []);
  const handleSubmit = () => {
    setFormError("");
    if (
      !newUserData.name ||
      !newUserData.userName ||
      !newUserData.email ||
      !password
    ) {
      setFormError("There are empty fields");
      return;
    }

    addUserItem(newUserData, password);
  };

  return (
    <form className="space-y-4 p-10 text-textColor">
      <div>
        <label className="font-medium">Full Name</label>
        <input
          type="text"
          required
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-lightPrimaryColor shadow-sm rounded-lg"
          onChange={(e) =>
            setNewUserData({ ...newUserData, name: e.target.value })
          }
        />
      </div>
      <div>
        <label className="font-medium">Username</label>
        <input
          type="text"
          required
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-lightPrimaryColor shadow-sm rounded-lg"
          onChange={(e) =>
            setNewUserData({ ...newUserData, userName: e.target.value })
          }
        />
      </div>
      <div>
        <label className="font-medium">Email</label>
        <input
          type="email"
          required
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-lightPrimaryColor shadow-sm rounded-lg"
          onChange={(e) =>
            setNewUserData({ ...newUserData, email: e.target.value })
          }
        />
      </div>
      <div>
        <label className="font-medium">Password</label>
        <input
          type="password"
          required
          className="w-full mt-2 mb-6  px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-lightPrimaryColor shadow-sm rounded-lg"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        className="w-full px-4 py-3 text-backgroundColor font-medium bg-lightPrimaryColor hover:bg-primaryColor active:bg-lightPrimaryColor rounded-lg duration-150"
        onClick={handleSubmit}
        type="button"
      >
        {$loginStatus.status === "loading" ? "Loading..." : "Register"}
      </button>
      {formError && <ErrorAlert error={formError} />}
      {$loginStatus.status === "error" && (
        <ErrorAlert error={$loginStatus.message} />
      )}
      {$loginStatus.status === "success" && (
        <SuccessAlert message="Register success. You can now log in" url="/" />
      )}
    </form>
  );
};

export { SignInForm };
