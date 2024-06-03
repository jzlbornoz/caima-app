export type SortKey = "goals" | "victory" | "partiesPlayed";

export interface SortConfig {
    key: SortKey;
    direction: "asc" | "desc";
}
