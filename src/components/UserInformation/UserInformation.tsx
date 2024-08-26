import React, { useEffect, useState } from "react";
import {
  getAccessToken,
  getUserInformationAndStatsById,
} from "../../stores/userStore";
import { Loader } from "../Loader";

interface PlayerData extends UserInterface {
  email: string;
  goalsByPartyAverage: number;
  id: string;
  name: string;
  partiesPlayed: number;
  stats: Array<{ [key: string]: any }>;
  totalGoals: number;
  totalVictories: number;
  uid: string;
  userName: string;
  victoriesByPartyAverage: number;
}
const UserInformation = ({ userId }: { userId: string }) => {
  const [userData, setUserData] = useState({} as PlayerData);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    getAccessToken();
    getUserInformationAndStatsById(userId).then((res) => {
      setUserData(res);
      setLoadingData(false);
    });
  }, [userId]);

  return (
    <>
      {loadingData ? (
        <Loader />
      ) : (
        <>
          <section className="bg-backgroundColor flex flex-col items-center p-6">
            <div className="bg-secondBackgroundColor rounded-lg shadow-md p-6 w-full max-w-3xl">
              <h1 className="text-titleColor text-3xl font-bold mb-4">
                {userData.name}
              </h1>
              <div className="text-textColor">
                <p className="mb-2">
                  <span className="font-semibold">Username:</span>{" "}
                  {userData.userName}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Email:</span> {userData.email}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Total Goals:</span>{" "}
                  {userData.totalGoals}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Total Victories:</span>{" "}
                  {userData.totalVictories}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Parties Played:</span>{" "}
                  {userData.partiesPlayed}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Goals average:</span>{" "}
                  {userData.goalsByPartyAverage}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Victories average:</span>{" "}
                  {userData.victoriesByPartyAverage}
                </p>
              </div>
            </div>
          </section>
          <section className="bg-backgroundColor flex flex-col items-center p-6">
            <ul className="bg-secondBackgroundColor rounded-lg shadow-md p-6 w-full max-w-3xl ">
              {userData.stats.map((stat) => (
                <li
                  key={stat.id}
                  className="text-textColor flex content-center justify-between mb-6"
                >
                  <span>Caima: {new Date(stat.date).toDateString()}</span>
                  <span>Goals: {stat.goals}</span>
                  <span>Victories: {stat.victory}</span>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </>
  );
};

export { UserInformation };
