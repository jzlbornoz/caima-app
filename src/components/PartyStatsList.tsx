import { useStore } from "@nanostores/react";
import { partyDataStats, registerGoalsFunction } from "../stores/partyStore";

const PartyStatsList = () => {
  const $partyDataStats = useStore(partyDataStats);
  const handleOnChange = (
    playerIndex: number,
    value: number,
    name: string,
    submit: boolean = false
  ) => {
    const newPlayersList = $partyDataStats?.stats?.map((player, index) => {
      if (index === playerIndex) {
        return {
          ...player,
          [name]: value,
        };
      }
      return {
        ...player,
      };
    });
    partyDataStats.set({ ...$partyDataStats, stats: newPlayersList });
    if (submit) {
      registerGoalsFunction($partyDataStats, newPlayersList);
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
      {$partyDataStats?.stats?.map((item, idx) => (
        <li className="py-5 flex items-center justify-around">
          <span className="block text-sm text-lightPrimaryColor font-extrabold w-1/5 overflow-hidden">
            {item?.user?.userName}
          </span>

          <div className="relative mt-2  text-gray-500 w- w-1/4">
            <input
              type="number"
              placeholder="0"
              className="w-full  px-3 py-2 appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              onBlur={(e) =>
                handleOnChange(
                  idx,
                  parseInt(e.target.value || "0"),
                  "goals",
                  true
                )
              }
              onChange={(e) =>
                handleOnChange(idx, parseInt(e.target.value || "0"), "goals")
              }
              value={item?.goals || ""}
            />
          </div>
          <div className="relative mt-2  text-gray-500 w-1/4">
            <input
              type="number"
              placeholder="0"
              className="w-full  px-3 py-2 appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              onChange={(e) =>
                handleOnChange(idx, parseInt(e.target.value || "0"), "victory")
              }
              onBlur={(e) =>
                handleOnChange(
                  idx,
                  parseInt(e.target.value || "0"),
                  "victory",
                  true
                )
              }
              value={item?.victory || ""}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export { PartyStatsList };
