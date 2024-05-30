import type { GeneralStatsInterface } from "../../../typesDefs/party"

export const generalStatsMapper = (data: GeneralStatsInterface[]) => {
    return data.map((item) => {
        return {
            name: item.userData.name,
            goals: item.goals,
            victories: item.victory,
            goalsPerParty: item.goals / item.partiesPlayed,
            victoriesPerParty: item.victory / item.partiesPlayed
        }
    })
}