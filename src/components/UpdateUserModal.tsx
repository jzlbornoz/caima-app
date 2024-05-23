import * as Dialog from "@radix-ui/react-dialog";
import { addUserItem, updateUserItem } from "../stores/userStore";
import { useState } from "react";

const UpdateUserModal = ({ userData }: { userData: UserInfo }) => {
  const [newUserData, setNewUserData] = useState<UserInterface>(
      userData || ({} as UserInterface)
    ),
    [password, setPassword] = useState("");

  const handleSubmit = () => {
    updateUserItem(userData, newUserData);
    setNewUserData({} as UserInterface);
    setPassword("");
  };

  return (
    <div className="bg-white rounded-md shadow-lg px-4 py-6">
      <div className=" flex items-center justify-center w-12 h-12 mx-auto bg-lightPrimaryColor rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="icon icon-tabler icons-tabler-filled icon-tabler-user"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
          <path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" />
        </svg>
      </div>
      <Dialog.Title className="text-lg font-medium text-gray-800 text-center mt-3">
        Registrar Usuario
      </Dialog.Title>
      <Dialog.Description className="mt-1 text-sm leading-relaxed text-start text-gray-500">
        <div className="mt-12 mx-auto px-4 p-8 bg-white sm:max-w-lg sm:px-8 sm:rounded-xl">
          <form className="space-y-5">
            <div>
              <label className="font-medium">Full name</label>
              <input
                type="text"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
                value={newUserData.name}
                onChange={(e) => {
                  setNewUserData({
                    ...newUserData,
                    name: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
                value={newUserData.email}
                onChange={(e) => {
                  setNewUserData({
                    ...newUserData,
                    email: e.target.value,
                  });
                }}
              />
            </div>
            {/* <div>
              <label className="font-medium">Password</label>
              <input
                type="password"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>*/}
          </form>
        </div>
      </Dialog.Description>
      <div className="items-center gap-2 mt-3 text-sm sm:flex">
        <Dialog.Close asChild>
          <button
            type="button"
            className="w-full mt-2 p-2.5 flex-1 text-white bg-lightPrimaryColor rounded-md outline-none ring-offset-2 ring-lightPrimaryColor focus:ring-2 hover:bg-primaryColor"
            onClick={() => handleSubmit()}
          >
            Confirmar
          </button>
        </Dialog.Close>
        <Dialog.Close asChild>
          <button
            className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-lightPrimaryColor focus:ring-2  hover:bg-secondBackgroundColor hover:text-textColor"
            aria-label="Close"
          >
            Cancelar
          </button>
        </Dialog.Close>
      </div>
    </div>
  );
};

export { UpdateUserModal };
