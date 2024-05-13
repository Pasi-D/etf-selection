"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AgGridReact, AgGridReactProps, getInstance } from "ag-grid-react";
import dayjs from "dayjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { AssetClass, Security } from "./types/data-types";
import AgGridTable from "./components/AgGridTable";
import DropDownFilter from "./components/filters/dropDownFilter";
import RangeFilter from "./components/filters/rangeFilter";
import { FilterParams } from "./constants/enums";
import { IFilter } from "ag-grid-community";

const Home = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [loading, setLoading] = useState(false);
  const [rowData, setRowData] = useState<Array<Security>>([]);
  const [assetClassFilterOptions, setAssetClassFilterOptions] = useState<
    Array<{ value: string; label: string }>
  >([]);

  const assetClassFilterParam = searchParams.get(FilterParams.ASSET_CLASS);

  const onAssetClassFilterChange = useCallback(
    (code: string | undefined) => {
      const params = new URLSearchParams(searchParams);
      if (code) {
        params.set(FilterParams.ASSET_CLASS, code);
      } else {
        params.delete(FilterParams.ASSET_CLASS);
      }

      replace(`${pathname}?${params.toString()}`);
    },
    [pathname, replace, searchParams],
  );

  const columnDefs: AgGridReactProps<Security>["columnDefs"] = useMemo(() => {
    return [
      {
        headerName: "Name",
        valueGetter: p => p?.data?.Name,
        flex: 2,
      },
      {
        headerName: "Ticker",
        valueGetter: p => p?.data?.Ticker?.data?.attributes?.DisplayName,
        flex: 1,
      },
      {
        headerName: "Asset Class",
        field: "AssetClass",
        valueGetter: p => p?.data?.AssetClass?.data?.attributes?.Name,
        filter: DropDownFilter,
        filterParams: {
          options: assetClassFilterOptions,
          onApplyFilter: onAssetClassFilterChange,
          defaultFilterValue: assetClassFilterParam,
        },
        flex: 2,
      },
      {
        headerName: "Inception Year",
        field: "InceptionYear",
        valueFormatter: p => dayjs(p?.data?.InceptionYear).format("YYYY"),
        filter: RangeFilter,
        filterParams: {
          inputType: "number",
          inputMin: "1990",
          inputMax: "2099",
          inputStep: 1,
        },
        flex: 1,
      },
      {
        headerName: "Expense Ratio",
        field: "ExpenseRatio",
        valueGetter: p => p?.data?.ExpenseRatio + "%",
        filter: RangeFilter,
        filterParams: {
          inputType: "number",
          inputMin: "0",
          inputMax: "1",
          inputStep: 0.01,
        },
        flex: 1,
      },
    ];
  }, [assetClassFilterOptions, assetClassFilterParam, onAssetClassFilterChange]);

  const getAssetClasses = useCallback(() => {
    const path = `/api/asset-class`;
    fetch(path)
      .then(res => res.json())
      .then((data: AssetClass[]) => {
        const assetClassFilters = data.reduce(
          (acc: Array<{ value: string; label: string }>, item) => {
            if (item) {
              acc.push({
                label: item.Name,
                value: item.Code,
              });
            }
            return acc;
          },
          [],
        );
        setAssetClassFilterOptions(assetClassFilters);
      });
  }, []);

  const getSecurities = useCallback(() => {
    setLoading(true);
    let path = `/api/etf`;
    if (assetClassFilterParam) {
      path = `/api/etf?assetClass=${assetClassFilterParam}`;
    }
    fetch(path)
      .then(res => res.json())
      .then((data: Security[]) => {
        setRowData(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [assetClassFilterParam]);

  useEffect(() => {
    getAssetClasses();
    getSecurities();
  }, [getSecurities, getAssetClasses]);

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
