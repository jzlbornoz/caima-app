import { useEffect, useMemo, useState } from "react";
import type { GeneralStatsInterface } from "../typesDefs/party";
import type { SortConfig } from "../typesDefs/table";

const CustomDataTable = ({
  data,
}: {
  columns: any[];
  data: GeneralStatsInterface[];
  progressPending?: boolean;
}) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "goals",
    direction: "asc",
  });
  const [tableData, setTableData] = useState<GeneralStatsInterface[]>(
    data || []
  );

  /**
   * `sortedData` is a memoized state that keeps the sorted data based on the
   * `sortConfig` and `tableData`. The `sortConfig` and `tableData` are the
   * dependencies of this memoization.
   *
   * The sorting is done by creating a copy of the `tableData` array and then
   * sorting it based on the `sortConfig.key` and `sortConfig.direction`.
   * If `sortConfig.key` is not defined, the sorting is not done.
   *
   * The sorting function compares the values of `a[sortConfig.key]` and
   * `b[sortConfig.key]` and returns -1, 1 or 0 based on the comparison and
   * `sortConfig.direction`.
   *
   * The sorted data is then returned.
   */

  const sortedData = useMemo(() => {
    // Create a copy of the table data.
    let sortableData = [...tableData];

    // Sort the data based on the sortConfig and direction.
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        const aKey = a[sortConfig.key];
        const bKey = b[sortConfig.key];

        // Compare the values and return the result based on the direction.
        if (aKey < bKey) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aKey > bKey) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    // Return the sorted data.
    return sortableData;
  }, [data, sortConfig]);

  useEffect(() => {
    if (sortedData) {
      setTableData(sortedData);
    }
  }, [sortedData]);

  const requestSort = (key: "goals" | "victory" | "partiesPlayed") => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };
  return (
    <div>
      <table className="w-full table-auto text-sm text-left ">
        <thead className="text-lightPrimaryColor font-medium border-b bg-backgroundColor ">
          <tr>
            <th className="py-3 pl-4 w-1/5">Player</th>
            <th
              className="py-3 text-center cursor-pointer"
              onClick={() => requestSort("goals")}
            >
              Goals
            </th>
            <th
              className="py-3 text-center  cursor-pointer"
              onClick={() => requestSort("victory")}
            >
              Victories
            </th>
            <th
              className="py-3 text-center  cursor-pointer"
              onClick={() => requestSort("partiesPlayed")}
            >
              Parties
            </th>
            <th className="py-3 text-center">G/P</th>
            <th className="py-3 text-center">V/P</th>
          </tr>
        </thead>
        <tbody className="text-textColor divide-y divide-gray-200">
          {tableData.map((item, idx) => (
            <tr
              key={idx}
              className={
                idx % 2 === 0
                  ? "bg-secondBackgroundColor hover:bg-gray-800"
                  : "bg-backgroundColor hover:bg-gray-800"
              }
            >
              <td className="pr-6 pl-4 py-4 border-r border-gray-200">
                {item?.userData?.name}
              </td>
              <td className="py-3  text-center border-r border-gray-200">
                {item.goals}
              </td>
              <td className=" py-4 text-center border-r border-gray-200">
                {item.victory}
              </td>
              <td className=" py-4 text-center border-r border-gray-200">
                {item.partiesPlayed}
              </td>
              <td className=" py-4 text-center border-r border-gray-200">
                {(item.goals / item.partiesPlayed).toFixed(2)}
              </td>
              <td className=" py-4 text-center">
                {(item.victory / item.partiesPlayed).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { CustomDataTable };
