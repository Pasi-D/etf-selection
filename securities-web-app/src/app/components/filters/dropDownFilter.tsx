import { CustomFilterProps } from "ag-grid-react";

interface SetFilterProps extends CustomFilterProps {
  options: Array<{ value: string; label: string }>;
}

const SetFilter: React.FC<SetFilterProps> = ({ options, model }) => {
  return (
    <div className="p-1 w-auto">
      <select
        value={model}
        className="w-[100%] p-1 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
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

export default SetFilter;
