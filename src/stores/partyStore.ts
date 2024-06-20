import { atom, map } from "nanostores";
import Firebase from "../services/firebaseConnection/class";
import type { PartyInformationGoalInterface, PartyInformationInterface, PartyInformationStatsInterface, PartyInterface } from "../typesDefs/party";

const fb = await new Firebase()
export const partyList = map<Record<string, PartyInformationInterface>>({});
export const partyAdmissionList = map<Record<string, UserInterface>>({});
export const partyDataStats = atom({} as PartyInformationInterface);
export const partyStatus = atom({ status: '', message: '' });
export const isLoadingPartyList = atom(true)
export const admissionApplicationStatus = atom({ status: '', message: '' });

export async function createPartyFunction(data: PartyInterface): Promise<void> {
    try {
        const newParty = await fb.registerParty(data)
        if (newParty) {
            partyList.setKey(
                newParty,
                { ...data, id: newParty } as PartyInformationInterface
            );
        }
    } catch (error: any) {
        partyStatus.set({
            status: 'error',
            message: `Error: ${error.code}`,
        })
    }
}

export async function getPartiesListFunction(): Promise<void> {
    try {
        const res = await fb.getPartiesList();
        res.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((item, key) => {
            partyList.setKey(
                item.id || key.toString(),
                item as PartyInformationInterface
            );
        });
        isLoadingPartyList.set(false)
    } catch (error: any) {
        isLoadingPartyList.set(false)
        partyStatus.set({
            status: 'error',
            message: `Error: ${error.code}`,
        })
    }
}

export async function registerAdmissionApplications(partyData: PartyInformationInterface, newUserId: string) {

    if (partyData?.admissionApplications?.some(userId => userId === newUserId)) {
        throw new Error('Application already sent');
    }
    admissionApplicationStatus.set({
        status: 'loading',
        message: `Sending application...`,
    })
    try {
        const newAdmissionApplications = partyData?.admissionApplications?.length ? [...partyData?.admissionApplications, newUserId] : [newUserId]
        const updatedParty = await fb.updateParty(partyData, { ...partyData, admissionApplications: newAdmissionApplications })
        partyList.setKey(
            partyData.id,
            { ...partyData, admissionApplications: newAdmissionApplications }
        );
        admissionApplicationStatus.set({
            status: 'success',
            message: `Application sent successfully. Waiting for approval...`,
        })
        return updatedParty
    } catch (error: any) {

        admissionApplicationStatus.set({
            status: 'error',
            message: `Error: ${error.code}`,
        })
    }
}

export async function acceptAdmissionApplicationFunction(partyData: PartyInformationInterface, userIdToAccept: string): Promise<void> {
    admissionApplicationStatus.set({
        status: 'loading',
        message: `Accepting user...`,
    })

    try {

        const newAdmissionApplications = partyData?.admissionApplications?.filter(userId => userId !== userIdToAccept)
        const newPlayers = partyData?.players ? [...partyData?.players, userIdToAccept] : [userIdToAccept]
        const updatedParty = await fb.updateParty(partyData, {
            ...partyData,
            admissionApplications: newAdmissionApplications,
            players: newPlayers,
            stats: [...partyData.stats, { userId: userIdToAccept, goals: 0, victory: 0 }]
        })
        partyList.setKey(
            partyData.id,
            {
                ...partyData,
                admissionApplications: newAdmissionApplications,
                players: newPlayers,
                stats: [...partyData.stats, { userId: userIdToAccept, goals: 0, victory: 0 }]
            }
        );

        admissionApplicationStatus.set({
            status: 'success',
            message: `User accepted successfully.`,
        })
        return updatedParty
    } catch (error: any) {
        partyStatus.set({
            status: 'error',
            message: `Error: ${error.code}`,
        })
    }
}

export async function registerGoalsFunction(partyData: PartyInformationInterface, partyStats: PartyInformationStatsInterface[]): Promise<void> {
    try {
        const updatedParty = await fb.updateParty(partyData, { ...partyData, stats: partyStats })
        partyList.setKey(
            partyData.id,
            { ...partyData, stats: partyStats }
        );

        return updatedParty
    } catch (error: any) {
        partyStatus.set({
            status: 'error',
            message: `Error: ${error.code}`,
        })
    }
}

export async function getPartyDataFunction(id: string) {
    const partyInformation = await fb.getPartyById(id) as PartyInformationInterface;
    if (!partyInformation) {
        throw new Error('Party not found');
    }
    const usersInformation = await getPartyPlayersDataFunction(partyInformation.players);
    if (!usersInformation) {
        throw new Error('users not found');
    }

    const statsWithInformation = partyInformation.stats.map(stat => {
        const user = usersInformation.find(user => user.id === stat.userId);
        if (!user) {
            throw new Error('user not found');
        }
        return { ...stat, user: user }
    })

    partyDataStats.set({ ...partyInformation, stats: statsWithInformation })
    return { ...partyInformation, stats: statsWithInformation }
}
export async function getPartyPlayersDataFunction(playersIds: string[]) {
    const res = await Promise.all(
        playersIds.map(async (playerId) => await fb.getUserFromId(playerId))
    );

    return res as UserInterface[];
}
export async function getAdmissionApplicationsUsersListFunction(ids: string[]) {
    const usersInformation = await getPartyPlayersDataFunction(ids);
    if (!usersInformation) {
        throw new Error('users not found');
    }

    usersInformation?.map((item, key) => {
        partyAdmissionList.setKey(
            item.id || key.toString(),
            item as UserInterface
        );
    });


    return usersInformation
}