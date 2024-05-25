import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import * as Dialog from "@radix-ui/react-dialog";
import { getUserList, userInfo, userList } from "../stores/userStore";
import { RegisterUserModal } from "./RegisterUserModal";
import { UpdateUserModal } from "./UpdateUserModal";
import { Loader } from "./Loader";

const UsersTable = () => {
  const $userInfo = useStore(userInfo);

  const [tableItems, setTableItems] = useState<UserInterface[]>([]),
    [loading, setLoading] = useState(true);

  const $userList = useStore(userList);

  useEffect(() => {
    getUserList();
  }, []);

  useEffect(() => {
    if ($userList) {
      setTableItems(Object.values($userList));
      setLoading(false);
    }
  }, [$userList]);

  return (
    <section>
      {!loading && tableItems.length > 0 ? (
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8 bg-secondBackgroundColor mt-8 p-4 rounded-xl">
          <div className="items-center justify-between flex">
            <div className="max-w-lg">
              <h3 className="text-lightPrimaryColor text-xl font-bold sm:text-2xl">
                Users
              </h3>
            </div>

            {$userInfo.isAdmin && (
              <Dialog.Root>
                <Dialog.Trigger className="rounded-md bg-lightPrimaryColor hover:bg-primaryColor px-5 py-2.5 text-sm font-medium text-backgroundColor hover:text-titleColor shadow ">
                  Register User
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40" />
                  <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg mx-auto px-4">
                    {/* == REGISTER MODAL */}
                    <RegisterUserModal />
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            )}
          </div>
          <div className="mt-12 relative h-max overflow-auto">
            <table className="w-full table-auto text-sm text-left">
              <thead className="text-lightPrimaryColor font-medium border-b">
                <tr>
                  <th className="py-3 pr-6">ID</th>
                  <th className="py-3 pr-6">Name</th>
                  <th className="py-3 pr-6">Email</th>
                </tr>
              </thead>
              <tbody className="text-textColor divide-y">
                {tableItems.map((item, idx) => (
                  <tr key={idx}>
                    <td className="pr-6 py-4 whitespace-nowrap">{item.id}</td>
                    <td className="pr-6 py-4 whitespace-nowrap">{item.name}</td>
                    <td className="pr-6 py-4 whitespace-nowrap">
                      {item.email}
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

export default UsersTable;
