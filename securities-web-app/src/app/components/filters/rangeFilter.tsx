import { CustomFilterProps } from "ag-grid-react";
import { InputHTMLAttributes } from "react";

interface RangeFilterProps extends CustomFilterProps {
  inputType?: InputHTMLAttributes<HTMLInputElement>["type"];
  inputPattern?: InputHTMLAttributes<HTMLInputElement>["pattern"];
  inputMin?: InputHTMLAttributes<HTMLInputElement>["min"];
  inputMax?: InputHTMLAttributes<HTMLInputElement>["max"];
  inputStep?: InputHTMLAttributes<HTMLInputElement>["step"];
}

const RangeFilter: React.FC<RangeFilterProps> = ({
  inputType = "text",
  inputPattern,
  inputMax,
  inputMin,
  inputStep,
}) => {
  return (
    <div className="p-2 w-52">
      <div className="flex flex-row justify-between">
        <input
          type={inputType}
          pattern={inputPattern}
          min={inputMin}
          step={inputStep}
          className="w-[45%] p-1 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <span>-</span>
        <input
          type={inputType}
          pattern={inputPattern}
          max={inputMax}
          step={inputStep}
          className="w-[45%] p-1 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div className="pt-2 flex flex-row justify-between">
        <button className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Clear
        </button>
        <button className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Apply
        </button>
      </div>
    </div>
  );
};

export default RangeFilter;
