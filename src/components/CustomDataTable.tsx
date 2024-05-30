import React from "react";
import DataTable, { createTheme } from "react-data-table-component";

const CustomDataTable = ({
  columns,
  data,
}: {
  columns: any[];
  data: any[];
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

  return <DataTable columns={columns} data={data} theme="solarized" />;
};

export { CustomDataTable };
