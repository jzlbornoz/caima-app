import { useStore } from "@nanostores/react";
import { Loader } from "../../Loader";
import {
  deletePlayerToPartyFunction,
  partyDataStats,
} from "../../../stores/partyStore";
import type { PartyInformationInterface } from "../../../typesDefs/party";
import { userInfo } from "../../../stores/userStore";

const PartyPlayersTable = ({
  partyData,
}: {
  partyData: PartyInformationInterface;
}) => {
  const $partyDataStats = useStore(partyDataStats);
  const $userInfo = useStore(userInfo);
  const handleDeletePlayer = async (playerId: string) => {
    const res = await deletePlayerToPartyFunction(partyData, playerId);
    res && window.location.reload();
  };

  return (
    <section>
      {$partyDataStats?.stats?.length > 0 ? (
        <div className="max-w-screen-2xl mx-auto bg-secondBackgroundColor  rounded-xl">
          <div className="relative h-max overflow-auto">
            <table className="w-full table-auto text-sm text-left">
              <thead className="text-lightPrimaryColor font-medium border-b">
                <tr>
                  <th className="py-3 pr-6">Player</th>
                  <th className="py-3 pr-6 text-center">Goals</th>
                  <th className="py-3 pr-6 text-center">Victories</th>
                  {$userInfo.isAdmin && (
                    <th className="py-3 pr-6 text-center">Action</th>
                  )}
                </tr>
              </thead>
              <tbody className="text-textColor divide-y">
                {$partyDataStats?.stats?.map((item, idx) => (
                  <tr key={idx}>
                    <td className="pr-6 py-4 whitespace-nowrap">
                      {item?.user?.userName}
                    </td>
                    <td className="pr-6 py-4 whitespace-nowrap text-center">
                      {item?.goals || 0}
                    </td>
                    <td className="pr-6 py-4 whitespace-nowrap text-center">
                      {item?.victory || 0}
                    </td>
                    {$userInfo.isAdmin && (
                      <td
                        className=" py-4 whitespace-nowrap text-center"
                        onClick={() =>
                          handleDeletePlayer(item?.user?.id as string)
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="icon icon-tabler icons-tabler-outline icon-tabler-trash-x text-red-600 hover:text-red-700"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M4 7h16" />
                          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                          <path d="M10 12l4 4m0 -4l-4 4" />
                        </svg>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </section>
  );
};

export { PartyPlayersTable };
