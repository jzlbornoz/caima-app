import DataTable, { createTheme } from "react-data-table-component";
import type { GeneralStatsInterface } from "../typesDefs/party";

const CustomDataTable = ({
  columns,
  data,
  progressPending,
}: {
  columns: any[];
  data: GeneralStatsInterface[];
  progressPending?: boolean;
}) => {
  createTheme(
    "solarized",
    {
      text: {
        primary: "#FFFFFF",
        secondary: "#ff8a50",
      },
      background: {
        default: "#1E1E1E",
      },
      context: {
        background: "#003f8f",
        text: "#e0e0e0",
      },
      divider: {
        default: "#FFFFFF",
      },
      action: {
        button: "rgba(0,0,0,.54)",
        hover: "rgba(0,0,0,.08)",
        disabled: "rgba(0,0,0,.12)",
      },
    },
    "dark"
  );

  return (
    <div>
      <table className="w-full table-auto text-sm text-left">
        <thead className="text-lightPrimaryColor font-medium border-b">
          <tr>
            <th className="py-3 pr-6 ">Player</th>
            <th className="py-3 pr-6 text-center">Goals</th>
            <th className="py-3 pr-6 text-center">Victories</th>
            <th className="py-3 pr-6 text-center">Parties</th>
            <th className="py-3 pr-6 text-center">GoalAverage</th>
            <th className="py-3 pr-6 text-center">VictoryAverage</th>
          </tr>
        </thead>
        <tbody className="text-textColor divide-y">
          {data.map((item, idx) => (
            <tr key={idx}>
              <td className="pr-6 py-4  whitespace-nowrap">
                {item?.userData?.name}
              </td>
              <td className="pr-6 py-4 text-center whitespace-nowrap">
                {item.goals}
              </td>
              <td className="pr-6 py-4 text-center whitespace-nowrap">
                {item.victory}
              </td>
              <td className="pr-6 py-4 text-center whitespace-nowrap">
                {item.partiesPlayed}
              </td>
              <td className="pr-6 py-4 text-center whitespace-nowrap">
                {item.goals / item.partiesPlayed}
              </td>
              <td className="pr-6 py-4 text-center whitespace-nowrap">
                {item.victory / item.partiesPlayed}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { CustomDataTable };
