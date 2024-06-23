import { useStore } from "@nanostores/react";
import {
  partyDataStats,
  registerGoalsFunction,
  updateCollaboratorsListFunction,
} from "../stores/partyStore";
import { useEffect, useState } from "react";
import { userInfo } from "../stores/userStore";

const PartyStatsList = () => {
  const $partyDataStats = useStore(partyDataStats);
  const $userInfo = useStore(userInfo);

  const [collaboratorsList, setCollaboratorsList] = useState<string[]>([]);

  useEffect(() => {
    setCollaboratorsList($partyDataStats.collaborators);
  }, [$partyDataStats]);

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
  const handleCollaboratorToggle = (playerId: string) => {
    setCollaboratorsList((prev) =>
      prev.includes(playerId)
        ? prev.filter((id) => id !== playerId)
        : [...prev, playerId]
    );
    updateCollaboratorsListFunction($partyDataStats, playerId);
  };

  return (
    <ul className="mt-12 divide-y">
      <li className="py-5 flex items-center justify-around">
        <span className="block text-sm text-lightPrimaryColor font-extrabold w-1/5 overflow-hidden">
          Player
        </span>
        <div className="relative text-lightSecondaryColor w- w-1/4 text-left">
          Goals
        </div>
        <div className="relative  text-lightSecondaryColor w-1/4 text-left">
          Victories
        </div>
        <div className="relative  text-lightSecondaryColor w-1/4 text-left">
          Collaborators
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
          {$userInfo.isAdmin && (
            <div className="relative mt-2  text-gray-500 w-1/4">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={
                    collaboratorsList?.includes(item.userId) ? true : false
                  }
                  className="sr-only peer"
                  onChange={() => handleCollaboratorToggle(item.userId)}
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export { PartyStatsList };
