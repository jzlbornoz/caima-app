import { userInfo } from "../stores/userStore";
import { useStore } from "@nanostores/react";
import type { PartyInformationInterface } from "../typesDefs/party";
import { acceptAdmissionApplicationFunction } from "../stores/partyStore";
import { useState } from "react";

const AdmissionApplicationUsersList = ({
  admissionApplicationsUsers,
  partyData,
}: {
  admissionApplicationsUsers: UserInterface[];
  partyData: PartyInformationInterface;
}) => {
  const $userInfo = useStore(userInfo);
  const [admissionApplicationsUsersData, setAdmissionApplicationsUsers] =
    useState<UserInterface[]>(admissionApplicationsUsers);

  const handleAcceptUser = (userId: string) => {
    acceptAdmissionApplicationFunction(partyData, userId);
    setAdmissionApplicationsUsers(
      admissionApplicationsUsersData.filter((item) => item.id !== userId)
    );
  };

  return (
    <ul className="mt-12 divide-y">
      {admissionApplicationsUsersData?.map((item, idx) => (
        <li className="py-5 flex items-start justify-between">
          <div className="flex gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-ball-football text-textColor"
            >
              <>
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                <path d="M12 7l4.76 3.45l-1.76 5.55h-6l-1.76 -5.55z" />
                <path d="M12 7v-4m3 13l2.5 3m-.74 -8.55l3.74 -1.45m-11.44 7.05l-2.56 2.95m.74 -8.55l-3.74 -1.45" />
              </>
            </svg>
            <div>
              <span className="block text-sm text-lightPrimaryColor font-extrabold">
                {item.name}
              </span>
              <span className="block text-sm text-textColor">{item.email}</span>
            </div>
          </div>
          {$userInfo.id === partyData.createdBy && (
            <span
              className="text-sm font-bold text-backgroundColor  rounded-lg px-3 py-2  bg-lightPrimaryColor hover:bg-textColor cursor-pointer"
              onClick={() => handleAcceptUser(item.id)}
            >
              Accept
            </span>
          )}
        </li>
      ))}
    </ul>
  );
};

export { AdmissionApplicationUsersList };
