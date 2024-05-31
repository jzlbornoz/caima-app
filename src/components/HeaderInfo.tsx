import React, { useEffect } from "react";
import { HeaderButtons } from "./HeaderButtons";
import { getAccessToken, userInfo } from "../stores/userStore";
import { useStore } from "@nanostores/react";

const HeaderInfo = () => {
  const $userInfo = useStore(userInfo);

  useEffect(() => {
    getAccessToken();
  }, []);
  return (
    <>
      {$userInfo?.name && (
        <span className="text-textColor w-full text-center">
          {$userInfo?.name}
        </span>
      )}

      <HeaderButtons />
    </>
  );
};

export { HeaderInfo };
