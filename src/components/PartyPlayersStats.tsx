import { PartyPlayersTable } from "./PartyPlayersTable";
import { PartyStatsList } from "./PartyStatsList";
import { useStore } from "@nanostores/react";
import { userInfo } from "../stores/userStore";
import { useEffect } from "react";
import {
  getPartyDataFunction,
  closePartyFunction,
  partyDataStats,
  closePartyStatus,
} from "../stores/partyStore";

const PartyPlayersStats = ({ partyId }: { partyId: string }) => {
  const $userInfo = useStore(userInfo);
  const $partyDataStats = useStore(partyDataStats);
  const $closePartyStatus = useStore(closePartyStatus);

  useEffect(() => {
    getPartyDataFunction(partyId);
  }, [partyId]);

  return (
    <>
      <section className="max-w-screen-2xl md:mx-auto px-4 md:px-8 bg-secondBackgroundColor mt-8 p-4 rounded-xl mx-2">
        <span className="text-titleColor text-2xl">Caima players</span>
        <PartyPlayersTable />
      </section>
      {$userInfo.isAdmin && (
        <section className="max-w-screen-2xl md:mx-auto px-4 md:px-8 bg-secondBackgroundColor mt-8 p-4 rounded-xl mx-2">
          <span className="text-titleColor text-2xl">Goals and Victories</span>
          <PartyStatsList />
        </section>
      )}
      {!$partyDataStats.isClosed && $userInfo.isAdmin && (
        <div
          onClick={() =>
            $userInfo.isAdmin &&
            $closePartyStatus.status !== "loading" &&
            closePartyFunction($partyDataStats)
          }
          className="mx-2 md:mx-auto rounded-md bg-lightPrimaryColor hover:bg-primaryColor px-5 mt-8 py-2.5 text-xl font-medium text-backgroundColor hover:text-titleColor shadow text-center"
        >
          {$closePartyStatus.message
            ? $closePartyStatus.message
            : "Close Caima"}
        </div>
      )}
    </>
  );
};

export { PartyPlayersStats };
