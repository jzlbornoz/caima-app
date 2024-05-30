export const generalStatsTableColumns = () => {
    return [
        {
            name: "Player",
            selector: (row: { name: any }) => row.name,
            sortable: true,
        },
        {
            name: "Goals",
            selector: (row: { goals: any }) => row.goals,
            sortable: true,
        },
        {
            name: "Victories",
            selector: (row: { victories: any }) => row.victories,
            sortable: true,
        },
        {
            name: "G/P",
            selector: (row: { goalsPerParty: any }) => row.goalsPerParty,
            sortable: true,
        },
        {
            name: "V/P",
            selector: (row: { victoriesPerParty: any }) => row.victoriesPerParty,
            sortable: true,
        }
    ]
}