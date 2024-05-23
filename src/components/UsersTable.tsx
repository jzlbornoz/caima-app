import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import * as Dialog from "@radix-ui/react-dialog";
import { getUserList, userList } from "../stores/userStore";
import { RegisterUserModal } from "./RegisterUserModal";
import { UpdateUserModal } from "./UpdateUserModal";

const UsersTable = () => {
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
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 bg-secondBackgroundColor mt-8 p-4 rounded-xl">
          <div className="items-start justify-between md:flex">
            <div className="max-w-lg">
              <h3 className="text-lightPrimaryColor text-xl font-bold sm:text-2xl">
                Usuarios
              </h3>
              <p className="text-textColor mt-2">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>

            <Dialog.Root>
              <Dialog.Trigger className="rounded-md bg-lightPrimaryColor hover:bg-primaryColor px-5 py-2.5 text-sm font-medium text-backgroundColor hover:text-titleColor shadow">
                Registrar Usuario
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40" />
                <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg mx-auto px-4">
                  {/* == REGISTER MODAL */}
                  <RegisterUserModal />
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
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
                      <button
                        //  href="javascript:void()"
                        className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-backgroundColor rounded-lg"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center mt-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="124"
            height="124"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-loader-2 animate-spin text-primaryColor"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 3a9 9 0 1 0 9 9" />
          </svg>
        </div>
      )}
    </section>
  );
};

export default UsersTable;
