import { useStore } from "@nanostores/react";
import { userInfo } from "../stores/userStore";
import { Loader } from "./Loader";
import type { PartyPlayerInterface } from "../typesDefs/party";

const PartyPlayersTable = ({
  playersItems,
}: {
  playersItems: PartyPlayerInterface[];
}) => {
  const $userInfo = useStore(userInfo);

  return (
    <section>
      {playersItems.length > 0 ? (
        <div className="max-w-screen-2xl mx-auto bg-secondBackgroundColor  rounded-xl">
          <div className="relative h-max overflow-auto">
            <table className="w-full table-auto text-sm text-left">
              <thead className="text-lightPrimaryColor font-medium border-b">
                <tr>
                  <th className="py-3 pr-6">Username</th>
                  <th className="py-3 pr-6">Email</th>
                  <th className="py-3 pr-6 text-center">Goals</th>
                  <th className="py-3 pr-6 text-center">Victories</th>
                </tr>
              </thead>
              <tbody className="text-textColor divide-y">
                {playersItems.map((item, idx) => (
                  <tr key={idx}>
                    <td className="pr-6 py-4 whitespace-nowrap">
                      {item.userName}
                    </td>
                    <td className="pr-6 py-4 whitespace-nowrap">
                      {item.email}
                    </td>
                    <td className="pr-6 py-4 whitespace-nowrap text-center">
                      {item?.stats?.goals || 0}
                    </td>
                    <td className="pr-6 py-4 whitespace-nowrap text-center">
                      {item?.stats?.victory || 0}
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
