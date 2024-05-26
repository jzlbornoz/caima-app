import { registerGoalsFunction } from "../stores/partyStore";
import type {
  PartyInformationInterface,
  PartyInformationStatsInterface,
  PartyPlayerInterface,
} from "../typesDefs/party";

const PartyStatsList = ({
  playersList,
  partyData,
  setPlayersListData,
  setPartyDataToSubmit,
}: {
  playersList: PartyPlayerInterface[];
  partyData: PartyInformationInterface;
  setPlayersListData: React.Dispatch<
    React.SetStateAction<PartyPlayerInterface[]>
  >;
  setPartyDataToSubmit: React.Dispatch<
    React.SetStateAction<PartyInformationInterface>
  >;
}) => {
  const handleOnChange = (
    playerIndex: number,
    value: PartyInformationStatsInterface,
    submit: boolean = false
  ) => {
    const newPlayersList = playersList.map((player, index) => {
      if (index === playerIndex) {
        return {
          ...player,
          stats: value,
        } as PartyPlayerInterface;
      }
      return {
        ...player,
      } as PartyPlayerInterface;
    });

    const statsToSubmit = newPlayersList.map((player) => ({
      userId: player.id,
      goals: player.stats.goals,
      victory: player.stats.victory,
    }));
    setPlayersListData(newPlayersList);
    setPartyDataToSubmit({
      ...partyData,
      stats: statsToSubmit,
    });

    if (submit) {
      registerGoalsFunction(partyData, statsToSubmit);
    }
  };

  return (
    <ul className="mt-12 divide-y">
      <li className="py-5 flex items-center justify-around">
        <span className="block text-sm text-lightPrimaryColor font-extrabold w-1/5 overflow-hidden">
          Player
        </span>
        <div className="relative text-lightSecondaryColor w- w-1/4 text-center">
          Goals
        </div>
        <div className="relative  text-lightSecondaryColor w-1/4 text-center">
          Victories
        </div>
      </li>
      {playersList?.map((item, idx) => (
        <li className="py-5 flex items-center justify-around">
          <span className="block text-sm text-lightPrimaryColor font-extrabold w-1/5 overflow-hidden">
            {item.userName}
          </span>

          <div className="relative mt-2  text-gray-500 w- w-1/4">
            <input
              type="number"
              placeholder="0"
              className="w-full  px-3 py-2 appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              onBlur={(e) =>
                handleOnChange(
                  idx,
                  {
                    goals: parseInt(e.target.value) || 0,
                    victory: item?.stats?.victory || 0,
                  } as PartyInformationStatsInterface,
                  true
                )
              }
              onChange={(e) =>
                handleOnChange(
                  idx,
                  {
                    goals: parseInt(e.target.value) || 0,
                    victory: item?.stats?.victory || 0,
                  } as PartyInformationStatsInterface,
                  false
                )
              }
              value={item?.stats?.goals || ""}
            />
          </div>
          <div className="relative mt-2  text-gray-500 w-1/4">
            <input
              type="number"
              placeholder="0"
              className="w-full  px-3 py-2 appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              onChange={(e) =>
                handleOnChange(
                  idx,
                  {
                    victory: parseInt(e.target.value) || 0,
                    goals: item?.stats?.goals || 0,
                  } as PartyInformationStatsInterface,
                  false
                )
              }
              onBlur={(e) =>
                handleOnChange(
                  idx,
                  {
                    victory: parseInt(e.target.value) || 0,
                    goals: item?.stats?.goals || 0,
                  } as PartyInformationStatsInterface,
                  true
                )
              }
              value={item?.stats?.victory || ""}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export { PartyStatsList };
