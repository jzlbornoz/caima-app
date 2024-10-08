import { PartyPlayersTable } from "./components/PartyPlayersTable";
import { PartyStatsList } from "./components/PartyStatsList";
import { useStore } from "@nanostores/react";
import { userInfo } from "../../stores/userStore";
import { useEffect, useState } from "react";
import {
  getPartyDataFunction,
  closePartyFunction,
  partyDataStats,
  closePartyStatus,
} from "../../stores/partyStore";
import type { PartyInformationInterface } from "../../typesDefs/party";

const PartyPlayersStats = ({ partyId }: { partyId: string }) => {
  const [partyData, setPartyData] = useState({} as PartyInformationInterface);
  const $userInfo = useStore(userInfo);
  const $partyDataStats = useStore(partyDataStats);
  const $closePartyStatus = useStore(closePartyStatus);

  useEffect(() => {
    if (partyId) {
      getPartyDataFunction(partyId).then((data) => {
        setPartyData(data);
      });
    }
  }, [partyId]);

  return (
    <>
      <section className="max-w-screen-2xl md:mx-auto px-4 md:px-8 bg-secondBackgroundColor mt-8 p-4 rounded-xl mx-2">
        <span className="text-titleColor text-2xl">Caima players</span>
        <PartyPlayersTable partyData={partyData} />
      </section>
      {($userInfo.isAdmin ||
        ($partyDataStats?.collaborators?.includes($userInfo.id) &&
          !$partyDataStats?.isClosed)) && (
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
