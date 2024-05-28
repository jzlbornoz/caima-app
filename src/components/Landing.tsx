import { useStore } from "@nanostores/react";
import { LogInForm } from "./LogInForm";
import { getAccessToken, userInfo, userInfoLoading } from "../stores/userStore";
import UsersTable from "./UsersTable";
import { useEffect, useState } from "react";
import { Loader } from "./Loader";
import * as Dialog from "@radix-ui/react-dialog";
import { RegisterPartyModal } from "./RegisterPartyModal";
import {
  admissionApplicationStatus,
  getPartiesListFunction,
  partyList,
  registerAdmissionApplications,
} from "../stores/partyStore";
import type { PartyInformationInterface } from "../typesDefs/party";

const Landing = () => {
  const $userInfo = useStore(userInfo);
  const $userInfoLoading = useStore(userInfoLoading);
  const $partyList = useStore(partyList);
  const $admissionApplicationStatus = useStore(admissionApplicationStatus);

  const [partyListData, setPartyListData] = useState<
    PartyInformationInterface[]
  >([]);

  useEffect(() => {
    getAccessToken();
    getPartiesListFunction();
  }, []);
  useEffect(() => {
    if ($partyList) {
      setPartyListData(
        Object.values($partyList) as PartyInformationInterface[]
      );
    }
  }, [$partyList]);

  const handleAdmissionApplication = (party: PartyInformationInterface) => {
    registerAdmissionApplications(party, $userInfo.id);
  };

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
                  <a
                    className="text-lightPrimaryColor text-xl font-bold sm:text-2xl"
                    href={`/party/${party.id}`}
                  >
                    Caima: {party.date.toDateString()}
                  </a>

                  <div className="mt-2">
                    <div
                      className={`flex items-center text-sm font-medium cursor-pointer ${
                        party?.admissionApplications?.some(
                          (userId) => userId === $userInfo?.id
                        ) && "text-primaryColor"
                      }`}
                    >
                      {party.isClosed ? (
                        <span className="text-lightSecondaryColor font-bold">
                          Caima finished
                        </span>
                      ) : party?.players?.some(
                          (userId) => userId === $userInfo?.id
                        ) ? (
                        <a href={`/party/${party.id}`}>You are participating</a>
                      ) : (
                        <span
                          onClick={() => {
                            if (
                              !party?.admissionApplications?.some(
                                (userId) => userId === $userInfo?.id
                              )
                            )
                              handleAdmissionApplication(party);
                          }}
                        >
                          {$admissionApplicationStatus.status
                            ? `${$admissionApplicationStatus.message}`
                            : party?.admissionApplications?.some(
                                (userId) => userId === $userInfo?.id
                              )
                            ? "Waiting for approval"
                            : "Request participation"}
                        </span>
                      )}
                      {!party.isClosed && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5 ml-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {$userInfo.isAdmin && <UsersTable />}
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
                      data-astro-reload
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
