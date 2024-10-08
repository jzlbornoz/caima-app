import { useEffect } from "react";
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
        <span
          className="text-textColor w-full text-center"
          onClick={() => (window.location.href = `/user/${$userInfo?.id}`)}
        >
          {$userInfo?.name}
        </span>
      )}

      <HeaderButtons />
    </>
  );
};

export { HeaderInfo };
