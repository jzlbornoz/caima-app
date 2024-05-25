import { useStore } from "@nanostores/react";
import { LogInForm } from "./LogInForm";
import { getAccessToken, userInfo, userInfoLoading } from "../stores/userStore";
import UsersTable from "./UsersTable";
import { useEffect, useState } from "react";
import { Loader } from "./Loader";
import * as Dialog from "@radix-ui/react-dialog";
import { RegisterPartyModal } from "./RegisterPartyModal";
import { getPartiesListFunction, partyList } from "../stores/partyStore";
import type { PartyInterface } from "../typesDefs/party";

const Landing = () => {
  const $userInfo = useStore(userInfo);
  const $userInfoLoading = useStore(userInfoLoading);
  const $partyList = useStore(partyList);

  const [partyListData, setPartyListData] = useState<PartyInterface[]>([]);

  useEffect(() => {
    getAccessToken();
    getPartiesListFunction();
  }, []);
  useEffect(() => {
    if ($partyList) {
      setPartyListData(Object.values($partyList));
    }
  }, [$partyList]);

  return (
    <main className="w-full h-85vh flex flex-col items-center justify-center px-4">
      {$userInfo?.accessToken ? (
        <div className="max-w-full w-full text-textColor">
          {$userInfo.isAdmin && (
            <div className="text-center">
              <Dialog.Root>
                <Dialog.Trigger className="rounded-md bg-lightPrimaryColor hover:bg-primaryColor px-5 py-2.5 text-sm font-medium text-backgroundColor hover:text-titleColor shadow mt-5">
                  Register New Caima
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40" />
                  <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg mx-auto px-4">
                    {/* == REGISTER Party MODAL */}
                    <RegisterPartyModal />
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </div>
          )}
          {partyListData?.map((party) => (
            <div
              key={party.id}
              className="max-w-screen-2xl mx-auto px-4 md:px-8 bg-secondBackgroundColor mt-8 p-4 rounded-xl"
            >
              <div className="items-center justify-between flex">
                <div className="max-w-lg flex justify-center items-start flex-col">
                  <h3 className="text-lightPrimaryColor text-xl font-bold sm:text-2xl">
                    Caima: {party.date.toDateString()}
                  </h3>
                  {$userInfo.isAdmin && (
                    <span className="text-textColor">add users</span>
                  )}
                </div>
              </div>
            </div>
          ))}
          <UsersTable />
        </div>
      ) : (
        <>
          {$userInfoLoading ? (
            <Loader />
          ) : (
            <div className="max-w-sm w-full text-textColor">
              <div className="text-center">
                <div className="mt-5 space-y-2">
                  <h3 className="text-lightPrimaryColor text-2xl font-bold sm:text-3xl">
                    Log in to your account
                  </h3>
                  <p className="">
                    Don't have an account?{" "}
                    <a
                      className="font-medium text-lightPrimaryColor hover:text-lightSecondaryColor"
                      href="/sign-in"
                    >
                      Sign up
                    </a>
                  </p>
                </div>
              </div>
              <LogInForm />
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default Landing;
