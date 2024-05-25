import { atom, map } from "nanostores";
import Firebase from "../services/firebaseConnection/class";
import type { PartyInformationGoalInterface, PartyInformationInterface, PartyInterface } from "../typesDefs/party";

const fb = await new Firebase()
export const partyList = map<Record<string, PartyInformationInterface>>({});
export const partyStatus = atom({ status: '', message: '' });
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
        res.map((item, key) => {
            partyList.setKey(
                item.id || key.toString(),
                item as PartyInformationInterface
            );
        });

    } catch (error: any) {
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
        const updatedParty = await fb.updateParty(partyData, { ...partyData, admissionApplications: newAdmissionApplications, players: newPlayers })
        partyList.setKey(
            partyData.id,
            { ...partyData, admissionApplications: newAdmissionApplications, players: newPlayers }
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

export async function registerGoalsFunction(partyData: PartyInformationInterface, partyGoals: PartyInformationGoalInterface[]): Promise<void> {
    try {
        const updatedParty = await fb.updateParty(partyData, { ...partyData, goals: partyGoals })
        partyList.setKey(
            partyData.id,
            { ...partyData, goals: partyGoals }
        );
        return updatedParty
    } catch (error: any) {
        partyStatus.set({
            status: 'error',
            message: `Error: ${error.code}`,
        })
    }
}
