import { userInfo } from './../stores/userStore';
export interface PartyInterface {
    id: string;
    date: Date;
    createdBy: string;
    isClosed?: boolean;
    stats?: PartyInformationStatsInterface[]
    players?: string[];
}

export interface PartyInformationGoalInterface {
    userId: string;
    goals: number;
}
export interface PartyInformationVictoryInterface {
    userId: string;
    victory: number;
}
export interface PartyInformationStatsInterface {
    userId: string;
    victory: number;
    goals: number,
    user?: UserInterface
}

export interface PartyInformationInterface extends PartyInterface {
    players: string[];
    goals: PartyInformationGoalInterface[];
    victories: PartyInformationVictoryInterface[];
    admissionApplications: string[];
    stats: PartyInformationStatsInterface[]
}

export interface PartyPlayerInterface extends UserInterface {
    stats: PartyInformationStatsInterface
}

export interface GeneralStatsInterface {
    userData: UserInterface;
    victory: number;
    goals: number
    partiesPlayed: number
    id: string
}