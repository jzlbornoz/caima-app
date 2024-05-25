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

export interface PartyInformationInterface extends PartyInterface {
    players: string[];
    goals: PartyInformationGoalInterface[];
    victories: PartyInformationVictoryInterface[];
}