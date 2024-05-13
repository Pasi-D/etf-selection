import { IDoesFilterPassParams } from "ag-grid-community";
import { CustomFilterProps, useGridFilter } from "ag-grid-react";
import { useCallback, useEffect, useState } from "react";

interface DropDownFilterProps extends CustomFilterProps {
  options: Array<{ value: string; label: string }>;
  onApplyFilter: (value: string | undefined) => void;
  defaultFilterValue: string | null;
}

const DropDownFilter: React.FC<DropDownFilterProps> = ({
  options,
  model,
  getValue,
  onModelChange,
  onApplyFilter,
  defaultFilterValue,
}) => {
  const doesFilterPass = useCallback(
    (params: IDoesFilterPassParams) => {
      const { node } = params;
      const filterText: string = model;
      const value: string = getValue(node).toString().toLowerCase();

      const target = options.find(({ value }) => value === filterText);
      return target?.label.toLowerCase() === value;
    },
    [model, options, getValue],
  );

  // Register filter handlers with the grid
  useGridFilter({
    doesFilterPass,
  });

  const [inputValue, setInputValue] = useState<string | -1>(model === null ? -1 : model);

  const onValueChange = (value: string | -1 | undefined) => {
    onModelChange(value);
    if (value === -1) {
      onApplyFilter(undefined);
    } else {
      onApplyFilter(value);
    }
  };

  const onClearInput = () => {
    setInputValue(-1);
    onValueChange(undefined);
  };

  const onClickApply = () => {
    onValueChange(inputValue);
  };

  useEffect(() => {
    if (defaultFilterValue && options.length) {
      const isFilterAvailable = options.findIndex(({ value }) => value === defaultFilterValue);
      if (isFilterAvailable) {
        setInputValue(defaultFilterValue);
      } else {
        setInputValue(-1);
      }
    }
  }, [defaultFilterValue, options]);

  return (
    <div className="p-1 w-auto">
      <select
        value={inputValue}
        className="w-[100%] p-1 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
        onChange={({ target: { value } }) => setInputValue(value)}
      >
        <option disabled value={-1}>
          Select an option
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pt-2 flex flex-row justify-between">
        <button
          className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={onClearInput}
        >
          Clear
        </button>
        <button
          className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
          disabled={inputValue === -1}
          onClick={onClickApply}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default DropDownFilter;
