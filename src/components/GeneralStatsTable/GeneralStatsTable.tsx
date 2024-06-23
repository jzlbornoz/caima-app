import { useEffect, useState } from "react";
import type { GeneralStatsInterface } from "../../typesDefs/party";
import { CustomDataTable } from "../CustomDataTable";
import { generalStatsTableColumns } from "./helpers/generalStatsTableColumns";
import { useStore } from "@nanostores/react";
import { getPartiesListFunction, partyList } from "../../stores/partyStore";
import { getUserList, userList } from "../../stores/userStore";
import { Loader } from "../Loader";

const GeneralStatsTable = () => {
  const [playersData, setPlayersData] = useState<GeneralStatsInterface[]>([]);

  const $userList = useStore(userList);
  const $partyList = useStore(partyList);

  useEffect(() => {
    getUserList();
    getPartiesListFunction();
  }, []);

  useEffect(() => {
    if ($partyList) {
      let playersData: GeneralStatsInterface[] = [];
      const partyListStatsData = Object.values($partyList)
        .filter((item) => item.isClosed)
        .map((party) => party.stats);
      const usersIdList = Object.values($userList).map((user) => user.id);

      playersData = usersIdList.map((user) => {
        //for each user id
        let goals: number = 0;
        let victory: number = 0;
        let partiesPlayed: number = 0;
        let userData: UserInterface = {} as UserInterface;
        partyListStatsData.flat().forEach((stats) => {
          if (stats.userId === user) {
            goals = goals + stats.goals;
            victory = victory + stats.victory;
            partiesPlayed += 1;
            userData = stats?.user as UserInterface;
          }
        });
        return {
          id: user,
          goals: goals,
          victory,
          partiesPlayed,
          userData,
        };
      });

      setPlayersData(playersData.filter((item) => item.partiesPlayed > 1));
    }
  }, [$partyList, $userList]);

  return (
    <>
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 bg-secondBackgroundColor mt-8 p-4 rounded-xl">
        <div className="items-center justify-between flex">
          <div className="max-w-lg">
            <h3 className="text-lightPrimaryColor text-xl font-bold sm:text-2xl">
              Global Stats
            </h3>
          </div>
        </div>
        {playersData.length < 1 ? (
          <Loader />
        ) : (
          <div className="mt-12 relative h-max overflow-auto">
            <CustomDataTable
              columns={generalStatsTableColumns()}
              data={playersData}
            />
          </div>
        )}
      </div>
    </>
  );
};

export { GeneralStatsTable };
