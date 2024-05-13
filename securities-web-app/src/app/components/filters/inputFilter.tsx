import { IDoesFilterPassParams } from "ag-grid-community";
import { CustomFilterProps, useGridFilter } from "ag-grid-react";
import dayjs from "dayjs";
import { InputHTMLAttributes, useCallback, useEffect, useRef, useState } from "react";

interface InputFilterProps extends CustomFilterProps {
  inputPlaceholder: string;
  inputType?: InputHTMLAttributes<HTMLInputElement>["type"];
  inputPattern?: InputHTMLAttributes<HTMLInputElement>["pattern"];
  inputMin?: InputHTMLAttributes<HTMLInputElement>["min"];
  inputMax?: InputHTMLAttributes<HTMLInputElement>["max"];
  inputStep?: InputHTMLAttributes<HTMLInputElement>["step"];
  valueDataType: "date" | "number" | "string";
  onApplyFilter?: (value: string | undefined) => void;
  defaultFilterValue: string | null;
}

const InputFilter: React.FC<InputFilterProps> = ({
  model,
  onModelChange,
  inputPlaceholder,
  inputType = "text",
  inputPattern,
  inputMax,
  inputMin,
  inputStep,
  getValue,
  valueDataType,
  onApplyFilter,
  defaultFilterValue,
}) => {
  const doesFilterPass = useCallback(
    (params: IDoesFilterPassParams) => {
      const { node } = params;
      const filterValue = model;

      let value = getValue(node);

      switch (valueDataType) {
        case "date":
          value = dayjs(value).format(inputPattern);
          break;
        case "string":
          value = value.toString();
          break;
        default:
          break;
      }

      if (valueDataType === "string") {
        return value.toLowerCase().includes(filterValue.toLowerCase());
      } else {
        return value === filterValue;
      }
    },
    [model, getValue, valueDataType, inputPattern],
  );

  // Register filter handlers with the grid
  useGridFilter({
    doesFilterPass,
  });

  const refInput = useRef<HTMLInputElement>(null);

  const [inputValue, setInputValue] = useState<string | number | undefined>(
    model === null ? undefined : model,
  );

  const onValueChange = (value: string | number | undefined) => {
    onModelChange(value);
    if (onApplyFilter) {
      if (typeof value === "number") {
        onApplyFilter(`${value}`);
      } else {
        onApplyFilter(value);
      }
    }
  };

  const onClearInput = () => {
    setInputValue(undefined);
    onValueChange(undefined);
  };

  const onClickApply = () => {
    onValueChange(inputValue);
  };

  useEffect(() => {
    if (defaultFilterValue) {
      setInputValue(defaultFilterValue);
    }
  }, [defaultFilterValue]);

  return (
    <div className="p-1 w-50">
      <div>
        <input
          ref={refInput}
          type={inputType}
          pattern={inputPattern}
          min={inputMin}
          max={inputMax}
          step={inputStep}
          value={inputValue}
          onChange={({ target: { value } }) => setInputValue(value)}
          placeholder={inputPlaceholder}
          className="w-[100%] p-1 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div className="pt-2 flex flex-row justify-between">
        <button
          className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={onClearInput}
        >
          Clear
        </button>
        <button
          className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
          disabled={inputValue === undefined}
          onClick={onClickApply}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default InputFilter;
