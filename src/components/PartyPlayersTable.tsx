import { useStore } from "@nanostores/react";
import { Loader } from "./Loader";
import { partyDataStats } from "../stores/partyStore";

const PartyPlayersTable = () => {
  const $partyDataStats = useStore(partyDataStats);

  return (
    <section>
      {$partyDataStats?.stats?.length > 0 ? (
        <div className="max-w-screen-2xl mx-auto bg-secondBackgroundColor  rounded-xl">
          <div className="relative h-max overflow-auto">
            <table className="w-full table-auto text-sm text-left">
              <thead className="text-lightPrimaryColor font-medium border-b">
                <tr>
                  <th className="py-3 pr-6">Username</th>
                  <th className="py-3 pr-6 text-center">Goals</th>
                  <th className="py-3 pr-6 text-center">Victories</th>
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
