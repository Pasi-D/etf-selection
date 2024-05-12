"use client";
import dayjs from "dayjs";
import { Security } from "./types/data-types";
import AgGridTable from "./components/AgGridTable";
import { AgGridReactProps } from "ag-grid-react";
import { useEffect, useState } from "react";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [rowData, setRowData] = useState<Array<Security>>([]);

  const [columnDefs, setColumnDefs] = useState<AgGridReactProps<Security>["columnDefs"]>([
    {
      headerName: "Name",
      valueGetter: p => p?.data?.Name,
      flex: 2,
      filter: true,
    },
    {
      headerName: "Ticker",
      valueGetter: p => p?.data?.Ticker,
      flex: 1,
    },
    {
      headerName: "Asset Class",
      valueGetter: p => p?.data?.AssetClass,
      flex: 2,
    },
    {
      field: "InceptionYear",
      valueFormatter: p => dayjs(p?.data?.InceptionYear).format("YYYY"),
      flex: 1,
    },
    {
      field: "ExpenseRatio",
      valueGetter: p => p?.data?.ExpenseRatio + "%",
      flex: 1,
    },
  ]);

  useEffect(() => {
    setLoading(true);
    fetch("/api/etf")
      .then(res => res.json())
      .then(data => {
        setRowData(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main className="flex min-h-screen flex-col justify-between p-6">
      <div className="h-[90vh] w-auto">
        <h1 className="pl-2 text-3xl font-bold">Securities</h1>
        <AgGridTable rowData={rowData} columnDefs={columnDefs} />
      </div>
    </main>
  );
};

export default Home;
