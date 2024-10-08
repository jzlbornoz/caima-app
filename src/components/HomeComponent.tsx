import { useEffect } from "react";
import { useStore } from "@nanostores/react";
import {
  getAccessToken,
  getUserInformationAndStatsById,
  userInfo,
  userInfoLoading,
} from "../stores/userStore";
import UsersTable from "./UsersTable";
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
  useEffect(() => {
    if (!$userInfo) {
      window.location.href = "/";
    }
  }, [$userInfo]);

  return (
    <>
      {$userInfoLoading ? (
        <Loader />
      ) : (
        <div className="max-w-full w-full text-textColor">
          {$userInfo?.isAdmin && <RegisterCaimaButton />}
          <GeneralStatsTable />
          <PartiesList />
          {$userInfo?.isAdmin && <UsersTable />}
        </div>
      )}
    </>
  );
};

export { HomeComponent };
