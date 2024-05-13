"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AgGridReactProps } from "ag-grid-react";
import dayjs from "dayjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import AgGridTable from "./components/AgGridTable";
import DropDownFilter from "./components/filters/dropDownFilter";
import InputFilter from "./components/filters/inputFilter";
import { AssetClass, Security } from "./types/data-types";
import { FilterParams } from "./constants/enums";

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
  const inceptionYearFilterParam = searchParams.get(FilterParams.INCEPTION_YEAR);
  const expenseRatioFilterParam = searchParams.get(FilterParams.EXPENSE_RATIO);

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

  const onInceptionFilterChange = useCallback(
    (year: string | undefined) => {
      const params = new URLSearchParams(searchParams);
      if (year) {
        params.set(FilterParams.INCEPTION_YEAR, year);
      } else {
        params.delete(FilterParams.INCEPTION_YEAR);
      }

      replace(`${pathname}?${params.toString()}`);
    },
    [pathname, replace, searchParams],
  );

  const onExpenseRatioFilterChange = useCallback(
    (ratio: string | undefined) => {
      const params = new URLSearchParams(searchParams);
      if (ratio) {
        params.set(FilterParams.EXPENSE_RATIO, ratio);
      } else {
        params.delete(FilterParams.EXPENSE_RATIO);
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
        filter: InputFilter,
        filterParams: {
          inputType: "number",
          inputMin: "1990",
          inputMax: "2099",
          inputStep: 1,
          inputPattern: "YYYY",
          valueDataType: "date",
          onApplyFilter: onInceptionFilterChange,
          defaultFilterValue: inceptionYearFilterParam,
        },
        flex: 1,
      },
      {
        headerName: "Expense Ratio",
        field: "ExpenseRatio",
        valueGetter: p => p?.data?.ExpenseRatio + "%",
        filter: InputFilter,
        filterParams: {
          inputType: "number",
          inputMin: "0",
          inputMax: "1",
          inputStep: 0.01,
          valueDataType: "number",
          onApplyFilter: onExpenseRatioFilterChange,
          defaultFilterValue: expenseRatioFilterParam
        },
        flex: 1,
      },
    ];
  }, [
    assetClassFilterOptions,
    assetClassFilterParam,
    inceptionYearFilterParam,
    onAssetClassFilterChange,
    onInceptionFilterChange,
    expenseRatioFilterParam,
    onExpenseRatioFilterChange,
  ]);

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
    if (assetClassFilterParam || inceptionYearFilterParam || expenseRatioFilterParam) {
      let filterParams = "";

      if (assetClassFilterParam) {
        filterParams += `${FilterParams.ASSET_CLASS}=${assetClassFilterParam}`;
      }

      if (inceptionYearFilterParam) {
        filterParams += `${filterParams ? "&" : ""}${FilterParams.INCEPTION_YEAR}=${inceptionYearFilterParam}`;
      }

      if (expenseRatioFilterParam) {
        filterParams += `${filterParams ? "&" : ""}${FilterParams.EXPENSE_RATIO}=${expenseRatioFilterParam}`;
      }

      path = `/api/etf?${filterParams}`;
    }
    fetch(path)
      .then(res => res.json())
      .then((data: Security[]) => {
        setRowData(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [assetClassFilterParam, expenseRatioFilterParam, inceptionYearFilterParam]);

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
