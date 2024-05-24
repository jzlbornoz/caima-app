import { useStore } from "@nanostores/react";
import { LogInForm } from "./LogInForm";
import { getAccessToken, userInfo, userInfoLoading } from "../stores/userStore";
import UsersTable from "./UsersTable";
import { useEffect } from "react";
import { Loader } from "./Loader";

const Landing = () => {
  const $userInfo = useStore(userInfo);
  const $userInfoLoading = useStore(userInfoLoading);

  useEffect(() => {
    getAccessToken();
  }, []);

  return (
    <main className="w-full h-85vh flex flex-col items-center justify-center px-4">
      {$userInfo?.accessToken ? (
        <div className="max-w-full w-full text-textColor">
          <UsersTable />
        </div>
      ) : (
        <>
          {$userInfoLoading ? (
            <Loader />
          ) : (
            <div className="max-w-sm w-full text-textColor">
              <div className="text-center">
                <div className="mt-5 space-y-2">
                  <h3 className="text-lightPrimaryColor text-2xl font-bold sm:text-3xl">
                    Log in to your account
                  </h3>
                  <p className="">
                    Don't have an account?{" "}
                    <a className="font-medium text-lightPrimaryColor hover:text-lightSecondaryColor">
                      Sign up
                    </a>
                  </p>
                </div>
              </div>
              <LogInForm />
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default Landing;
