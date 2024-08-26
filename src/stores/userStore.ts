import { atom, map } from "nanostores";
import Firebase from "../services/firebaseConnection/class";
import type { User } from "firebase/auth";

const fb = await new Firebase();

export const userInfo = atom({} as UserInterface);
export const userInfoLoading = atom(true);
export const loginStatus = atom({ status: "", message: "" });
export const registerStatus = atom({ status: "", message: "" });
export const sendResetPasswordStatus = atom({ status: "", message: "" });
export const userList = map<Record<string, UserInterface>>({});
/**
 * Retrieves the list of users from the Firebase service and updates the userList store.
 *
 * @return {Promise<void>} A Promise that resolves when the userList store has been updated.
 */
export async function getUserList(): Promise<void> {
    try {
        const res = await fb.getUsersList();
        res.map((item, key) => {
            userList.setKey(item.id || key.toString(), item);
        });
    } catch (error: any) {
        loginStatus.set({
            status: "error",
            message: `Error: ${error.code}`,
        });
    }
}
/**
 * Adds a new user item to the user list.
 *
 * @param {UserInterface} data - The user data to be added.
 * @param {string} password - The password for the user.
 * @return {Promise<void>} A promise that resolves when the user item is added successfully.
 */
export async function addUserItem(
    data: UserInterface,
    password: string
): Promise<void> {
    try {
        registerStatus.set({ status: "loading", message: "Cargando..." });
        const newUser = await fb.registerUser(data, password);
        if (newUser) {
            userList.setKey(newUser, { ...data, id: newUser });
            loginStatus.set({ status: "success", message: "register success" });
        }
    } catch (error: any) {
        registerStatus.set({
            status: "error",
            message: `Error: ${error.code}`,
        });
    }
}

export async function updateUserItem(
    data: UserInfo,
    payload: UserInfo
): Promise<void> {
    await fb.updateUser(data, payload);
    userList.setKey(data.id, { ...data, ...payload });
}

export interface userLogged extends User {
    accessToken?: string;
}

export async function getAccessToken() {
    const res = JSON.parse(localStorage.getItem("userLogged") as string);
    userInfo.set(res as UserInterface);
    userInfoLoading.set(false);
}

export async function setUserLoggedInfo(user: userLogged) {
    const res = await fb.getUserFromUId(user.uid, user.accessToken || "");
    //Aca solo debe ir accessToken
    localStorage.setItem(
        "userLogged",
        JSON.stringify({ ...res, accessToken: user.accessToken })
    );
    userInfo.set({ ...res, accessToken: user.accessToken } as UserInterface);
    userInfoLoading.set(false);
}

export async function logInUser(email: string, password: string) {
    try {
        loginStatus.set({ status: "loading", message: "Cargando..." });
        const { user }: { user: userLogged } = await fb.loginUser(email, password);

        if (user.accessToken) {
            const res = await fb.getUserFromUId(user.uid, user.accessToken);
            setUserLoggedInfo(user);
            loginStatus.set({ status: "success", message: "Login exitoso" });
            return res;
        }
    } catch (error: any) {
        loginStatus.set({
            status: "error",
            message: `Error: ${error.code}`,
        });
    }
}

export async function logOutUser() {
    localStorage.removeItem("userLogged");
    userInfo.set({} as UserInterface);
    loginStatus.set({ status: "", message: "" });
    userList.set({});
}

export async function sendRecoveryPasswordEmailUser(email: string) {
    try {
        sendResetPasswordStatus.set({
            status: "",
            message: "",
        });
        await fb.sendEmailToRecoveryPassword(email);
        sendResetPasswordStatus.set({
            status: "success",
            message: "Email enviado exitosamente",
        });
    } catch (error: any) {
        sendResetPasswordStatus.set({
            status: "error",
            message: `Error: ${error.code}`,
        });
    }
}

export async function getUserInformationAndStatsById(userId: string) {
    const userData = await fb.getUserById(userId);
    const partiesList = await fb.getPartyByUserId(userId);
    const stats = partiesList?.map((party) => {
        const userStats = party?.stats?.find(
            (stat: { userId: string }) => stat.userId === userId
        );
        const goalsPerVictory = userStats?.goals / userStats?.victory;
        return {
            goals: userStats.goals,
            victory: userStats.victory,
            goalsPerVictory: Number(goalsPerVictory.toFixed(1)),
            partyId: party.id,
            date: party.date.seconds * 1000,
        };
    });
    const totalGoals =
        stats?.reduce(
            (acc: number, curr: { goals: number }) => acc + curr.goals,
            0
        ) || 0;
    const totalVictories =
        stats?.reduce(
            (acc: number, curr: { victory: number }) => acc + curr.victory,
            0
        ) || 0;
    const partiesPlayed = stats?.length || 0;
    const goalsByPartyAverage = Number((totalGoals / partiesPlayed).toFixed(2));
    const victoriesByPartyAverage = Number(
        (totalVictories / partiesPlayed).toFixed(2)
    );

    return {
        ...userData as UserInterface,
        totalGoals,
        totalVictories,
        partiesPlayed,
        goalsByPartyAverage,
        victoriesByPartyAverage,
        stats: stats?.sort((a, b) => b.date - a.date) || [],
    };
}
