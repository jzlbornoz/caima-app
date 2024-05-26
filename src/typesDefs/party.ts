export interface PartyInterface {
    id: string;
    date: Date;
    createdBy: string;
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