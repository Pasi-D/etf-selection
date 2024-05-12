"use client";
import dayjs from "dayjs";
import { Security } from "./types/data-types";
import AgGridTable from "./components/AgGridTable";
import { AgGridReactProps } from "ag-grid-react";
import { useCallback, useEffect, useState } from "react";
import SetFilter from "./components/filters/dropDownFilter";
import RangeFilter from "./components/filters/rangeFilter";

const columnDefs: AgGridReactProps<Security>["columnDefs"] = [
  {
    headerName: "Name",
    valueGetter: p => p?.data?.Name,
    flex: 2,
  },
  {
    headerName: "Ticker",
    valueGetter: p => p?.data?.Ticker,
    flex: 1,
  },
  {
    headerName: "Asset Class",
    field: "AssetClass",
    filter: SetFilter,
    filterParams: {
      options: [
        { value: "one", label: "Item One" },
        { value: "two", label: "Item two" },
      ],
    },
    flex: 2,
  },
  {
    headerName: "Inception Year",
    field: "InceptionYear",
    valueFormatter: p => dayjs(p?.data?.InceptionYear).format("YYYY"),
    filter: RangeFilter,
    flex: 1,
  },
  {
    headerName: "Expense Ratio",
    field: "ExpenseRatio",
    valueGetter: p => p?.data?.ExpenseRatio + "%",
    filter: RangeFilter,
    flex: 1,
  },
];

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [rowData, setRowData] = useState<Array<Security>>([]);

  const getSecurities = useCallback(() => {
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

  useEffect(() => {
    getSecurities();
  }, [getSecurities]);

  return (
    <main className="flex min-h-screen flex-col justify-between p-6">
      <div className="h-[90vh] w-auto">
        <h1 className="pl-2 text-3xl font-bold">Securities</h1>
        {loading ? (
          <p className="pt-4 pl-2 text-base italic">Loading...</p>
        ) : (
          <AgGridTable rowData={rowData} columnDefs={columnDefs} />
        )}
      </div>
    </main>
  );
};

export default Home;
