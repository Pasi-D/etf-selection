"use client";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";

interface AgGridTableProps<T> {
  rowData: Array<T>;
  columnDefs: AgGridReactProps<T>["columnDefs"];
}

const AgGridTable: <T extends object>(props: AgGridTableProps<T>) => React.ReactElement = <
  T extends object,
>({
  rowData,
  columnDefs,
}: AgGridTableProps<T>) => {
  return (
    <div className="w-[100%] h-[100%] p-2">
      <div className="w-[100%] h-[100%] ag-theme-quartz">
        <AgGridReact rowData={rowData} columnDefs={columnDefs} />
      </div>
    </div>
  );
};

export default AgGridTable;
