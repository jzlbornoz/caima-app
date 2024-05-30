import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";
import { getAccessToken, userInfo } from "../stores/userStore";
import {
  admissionApplicationStatus,
  getPartiesListFunction,
  partyList,
  registerAdmissionApplications,
} from "../stores/partyStore";
import type { PartyInformationInterface } from "../typesDefs/party";

const PartiesList = () => {
  const $userInfo = useStore(userInfo);

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
    <>
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
    </>
  );
};

export { PartiesList };
