import React, { useState } from "react";
import { PartyPlayersTable } from "./PartyPlayersTable";
import { PartyStatsList } from "./PartyStatsList";
import type { PartyInformationInterface } from "../typesDefs/party";
import { useStore } from "@nanostores/react";
import { userInfo } from "../stores/userStore";

const PartyPlayersStats = ({
  playersData,
  partyData,
}: {
  playersData: UserInterface[];
  partyData: PartyInformationInterface;
}) => {
  const $userInfo = useStore(userInfo);

  const [playersListData, setPlayersListData] = useState(playersData);

  return (
    <>
      <section className="max-w-screen-2xl md:mx-auto px-4 md:px-8 bg-secondBackgroundColor mt-8 p-4 rounded-xl mx-2">
        <span className="text-titleColor text-2xl">Caima players</span>
        <PartyPlayersTable playersItems={playersData} />
      </section>
      {$userInfo.isAdmin && (
        <section className="max-w-screen-2xl md:mx-auto px-4 md:px-8 bg-secondBackgroundColor mt-8 p-4 rounded-xl mx-2">
          <span className="text-titleColor text-2xl">Goals and Victories</span>
          <PartyStatsList playersList={playersListData} partyData={partyData} />
        </section>
      )}
    </>
  );
};

export { PartyPlayersStats };
