import { useStore } from "@nanostores/react";
import { getAccessToken, userInfo, userInfoLoading } from "../stores/userStore";
import UsersTable from "./UsersTable";
import { useEffect } from "react";
import { Loader } from "./Loader";
import { RegisterCaimaButton } from "./RegisterCaimaButton";
import { PartiesList } from "./PartiesList";
import { GeneralStatsTable } from "./GeneralStatsTable/GeneralStatsTable";

const HomeComponent = () => {
  const $userInfo = useStore(userInfo);
  const $userInfoLoading = useStore(userInfoLoading);

  useEffect(() => {
    getAccessToken();
  }, []);

  return (
    <>
      {$userInfoLoading ? (
        <Loader />
      ) : (
        <div className="max-w-full w-full text-textColor">
          {$userInfo?.isAdmin && <RegisterCaimaButton />}
          <PartiesList />
          <GeneralStatsTable />
          {$userInfo?.isAdmin && <UsersTable />}
        </div>
      )}
    </>
  );
};

export { HomeComponent };
