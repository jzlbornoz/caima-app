import { useState } from "react";
import { useStore } from "@nanostores/react";
import * as Dialog from "@radix-ui/react-dialog";
import { userList } from "../stores/userStore";
import { RegisterUserModal } from "./RegisterUserModal";

const UsersTable = () => {
  const [tableItems, setTableItems] = useState<UserInterface[]>([]);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);

  useStore(userList).then((res) => {
    setTableItems(res);
  });

  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 bg-secondBackgroundColor">
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              All products
            </h3>
            <p className="text-gray-600 mt-2">
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
                  <td className="pr-6 py-4 whitespace-nowrap">{item.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UsersTable;
