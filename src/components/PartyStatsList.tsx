import { useStore } from "@nanostores/react";
import { userInfo } from "../stores/userStore";
import type { PartyInformationInterface } from "../typesDefs/party";
import { useState } from "react";

const PartyStatsList = ({
  playersList,
  partyData,
}: {
  playersList: UserInterface[];
  partyData: PartyInformationInterface;
}) => {
  //  const $userInfo = useStore(userInfo);

  return (
    <ul className="mt-12 divide-y">
      {playersList?.map((item, idx) => (
        <li className="py-5 flex items-center justify-around">
          <span className="block text-sm text-lightPrimaryColor font-extrabold w-1/5 overflow-hidden">
            {item.userName}
          </span>

          <div className="relative mt-2  text-gray-500 w- w-1/4">
            <div className="absolute inset-y-0 left-3 flex items-center text-sm">
              Goals
            </div>
            <input
              type="number"
              placeholder="0"
              className="w-full pl-[4.5rem] pr-3 py-2 appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div className="relative mt-2  text-gray-500 w-1/4">
            <div className="absolute inset-y-0 left-3 flex items-center text-sm">
              Victories
            </div>
            <input
              type="number"
              placeholder="0"
              className="w-full pl-[4.5rem] pr-3 py-2 appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export { PartyStatsList };
