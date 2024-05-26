import React, { useEffect, useState } from "react";
import { PartyPlayersTable } from "./PartyPlayersTable";
import { PartyStatsList } from "./PartyStatsList";
import type {
  PartyInformationGoalInterface,
  PartyInformationInterface,
  PartyPlayerInterface,
} from "../typesDefs/party";
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

  const [playersListData, setPlayersListData] = useState(
    playersData as PartyPlayerInterface[]
  );
  const [partyDataToSubmit, setPartyDataToSubmit] = useState(partyData);

  useEffect(() => {
    setPlayersListData(
      playersData.map((player) => {
        const goals =
          partyDataToSubmit?.stats?.find((item) => item.userId === player.id)
            ?.goals || 0;
        const victory =
          partyDataToSubmit?.stats?.find((item) => item.userId === player.id)
            ?.victory || 0;
        return {
          ...player,
          stats: {
            userId: player.id,
            goals: goals,
            victory: victory,
          },
        } as PartyPlayerInterface;
      })
    );
  }, [partyDataToSubmit]);

  return (
    <>
      <section className="max-w-screen-2xl md:mx-auto px-4 md:px-8 bg-secondBackgroundColor mt-8 p-4 rounded-xl mx-2">
        <span className="text-titleColor text-2xl">Caima players</span>
        <PartyPlayersTable playersItems={playersListData} />
      </section>
      {$userInfo.isAdmin && (
        <section className="max-w-screen-2xl md:mx-auto px-4 md:px-8 bg-secondBackgroundColor mt-8 p-4 rounded-xl mx-2">
          <span className="text-titleColor text-2xl">Goals and Victories</span>
          <PartyStatsList
            playersList={playersListData}
            partyData={partyData}
            setPlayersListData={setPlayersListData}
            setPartyDataToSubmit={setPartyDataToSubmit}
          />
        </section>
      )}
    </>
  );
};

export { PartyPlayersStats };
