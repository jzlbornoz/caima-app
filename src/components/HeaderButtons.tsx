import { useStore } from "@nanostores/react";
import { logOutUser, userInfo, userInfoLoading } from "../stores/userStore";
import { navigate } from "astro/virtual-modules/transitions-router.js";
import { admissionApplicationStatus, partyStatus } from "../stores/partyStore";

const HeaderButtons = () => {
  const $userInfo = useStore(userInfo);
  const $userInfoLoading = useStore(userInfoLoading);

  const handleLogout = () => {
    logOutUser();
    admissionApplicationStatus.set({ status: "", message: "" });
    partyStatus.set({ status: "", message: "" });
    navigate("/");
  };

  return (
    <>
      {!$userInfoLoading && (
        <section className="flex items-center gap-4">
          {!$userInfo?.accessToken ? (
            <div className="sm:flex sm:gap-4">
              <span
                className="rounded-md bg-backgroundColor hover:bg-textColor px-5 py-2.5 text-sm font-medium text-titleColor hover:text-backgroundColor shadow"
                onClick={() => navigate("/sign-in")}
              >
                Register
              </span>
            </div>
          ) : (
            <div className="sm:flex sm:gap-4">
              <span
                className="rounded-md bg-backgroundColor hover:bg-textColor px-5 py-2.5 text-sm font-medium text-titleColor hover:text-backgroundColor shadow"
                onClick={() => handleLogout()}
              >
                Logout
              </span>
            </div>
          )}
        </section>
      )}
    </>
  );
};

export { HeaderButtons };
