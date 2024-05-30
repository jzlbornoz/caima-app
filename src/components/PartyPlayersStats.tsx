import { PartyPlayersTable } from "./PartyPlayersTable";
import { PartyStatsList } from "./PartyStatsList";
import { useStore } from "@nanostores/react";
import { userInfo } from "../stores/userStore";
import { useEffect } from "react";
import { getPartyDataFunction } from "../stores/partyStore";

const PartyPlayersStats = ({ partyId }: { partyId: string }) => {
  const $userInfo = useStore(userInfo);

  useEffect(() => {
    console.log("partyId", partyId);
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
    </>
  );
};

export { PartyPlayersStats };
