import { useStore } from "@nanostores/react";
import * as Dialog from "@radix-ui/react-dialog";
import { userInfo } from "../stores/userStore";
import { UpdateUserModal } from "./UpdateUserModal";
import { Loader } from "./Loader";

const PartyPlayersTable = ({
  playersItems,
}: {
  playersItems: UserInterface[];
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
                      0
                    </td>
                    <td className="pr-6 py-4 whitespace-nowrap text-center">
                      0
                    </td>
                    {$userInfo.isAdmin && (
                      <td className="text-right px-6 whitespace-nowrap">
                        <Dialog.Root>
                          <Dialog.Trigger className="py-2 px-3 font-medium text-secondaryColor hover:text-lightSecondaryColor duration-150 hover:bg-backgroundColor rounded-lg">
                            Editar
                          </Dialog.Trigger>
                          <Dialog.Portal>
                            <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40" />
                            <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg mx-auto px-4">
                              {/* == EDIT MODAL */}
                              <UpdateUserModal userData={item} />
                            </Dialog.Content>
                          </Dialog.Portal>
                        </Dialog.Root>
                        <button className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-backgroundColor rounded-lg">
                          Delete
                        </button>
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
