import { userInfo } from "../stores/userStore";
import { useStore } from "@nanostores/react";
import {
  acceptAdmissionApplicationFunction,
  admissionApplicationStatus,
  getAdmissionApplicationsUsersListFunction,
  partyAdmissionList,
  partyDataStats,
} from "../stores/partyStore";
import { useEffect, useState } from "react";

const AdmissionApplicationUsersList = ({ partyId }: { partyId: string }) => {
  const $userInfo = useStore(userInfo);
  const $partyAdmissionList = useStore(partyAdmissionList);
  const $partyDataStats = useStore(partyDataStats);
  const $admissionApplicationStatus = useStore(admissionApplicationStatus);

  const [userIsAcceptingId, setUserIsAcceptingId] = useState("");

  useEffect(() => {
    getAdmissionApplicationsUsersListFunction(
      $partyDataStats.admissionApplications
    );
  }, [$partyDataStats, partyId]);

  const handleAcceptUser = (userId: string) => {
    setUserIsAcceptingId(userId);
    acceptAdmissionApplicationFunction($partyDataStats, userId);
    const newList = Object.values($partyAdmissionList)?.filter(
      (item) => item.id !== userId
    );
    newList.map((item) => {
      partyAdmissionList.setKey(item.id, item);
    });
  };

  return (
    <>
      {Object.values($partyAdmissionList).length > 0 && (
        <section className="max-w-screen-2xl md:mx-auto px-4 md:px-8 bg-secondBackgroundColor mt-8 p-4 rounded-xl mx-2">
          <span className="text-titleColor text-2xl">Users Requests</span>
          <ul className="mt-12 divide-y">
            {Object.values($partyAdmissionList).map((item) => (
              <li
                className="py-5 flex items-start justify-between"
                key={item.id}
              >
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
                    <span className="block text-sm text-textColor">
                      {item.email}
                    </span>
                  </div>
                </div>
                {($userInfo.id === $partyDataStats?.createdBy ||
                  $userInfo.isAdmin) && (
                  <span
                    className="text-sm font-bold text-backgroundColor  rounded-lg px-3 py-2  bg-lightPrimaryColor hover:bg-textColor cursor-pointer"
                    onClick={() => handleAcceptUser(item.id)}
                  >
                    {$admissionApplicationStatus.message &&
                    userIsAcceptingId === item.id
                      ? $admissionApplicationStatus.message
                      : "Accept"}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
};

export { AdmissionApplicationUsersList };
