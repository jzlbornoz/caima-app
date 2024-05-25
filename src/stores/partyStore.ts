import { atom, map } from "nanostores";
import Firebase from "../services/firebaseConnection/class";
import type { PartyInformationInterface, PartyInterface } from "../typesDefs/party";

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
        console.log('Application already sent');
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
        console.log('EEEEEEEEE', error)
        admissionApplicationStatus.set({
            status: 'error',
            message: `Error: ${error.code}`,
        })
    }
}
