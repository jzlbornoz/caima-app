import { atom, map } from "nanostores";
import Firebase from "../services/firebaseConnection/class";
import type { PartyInterface } from "../typesDefs/party";

const fb = await new Firebase()
export const partyList = map<Record<string, PartyInterface>>({});
export const partyStatus = atom({ status: '', message: '' });

export async function createPartyFunction(data: PartyInterface): Promise<void> {
    try {
        const newParty = await fb.registerParty(data)
        if (newParty) {
            partyList.setKey(
                newParty,
                { ...data, id: newParty }
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
                item
            );
        });

    } catch (error: any) {
        partyStatus.set({
            status: 'error',
            message: `Error: ${error.code}`,
        })
    }
}

