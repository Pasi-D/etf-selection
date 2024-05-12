import { CustomFilterProps } from "ag-grid-react";
import { useRef } from "react";

interface TextFilterProps extends CustomFilterProps {
  inputPlaceholder: string;
}

const TextFilter: React.FC<TextFilterProps> = ({ model, onModelChange, inputPlaceholder }) => {
  const refInput = useRef<HTMLInputElement>(null);

  return (
    <div className="p-1 w-50">
      <div>
        <input
          ref={refInput}
          type="text"
          value={model || ""}
          onChange={({ target: { value } }) => onModelChange(value === "" ? null : value)}
          placeholder={inputPlaceholder}
        />
      </div>
      <div>
        <button>Cancel</button>
        <button>Apply</button>
      </div>
    </div>
  );
};

export default TextFilter;
