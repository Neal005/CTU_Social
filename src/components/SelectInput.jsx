import React from "react";

const SelectInput = React.forwardRef(
  ({ label, labelStyles, options, value, onChange, styles, error }, ref) => {
    return (
      <div className="w-full flex flex-col mt-2">
        {label && (
          <p className={`text-ascent-2 text-sm mb-2 ${labelStyles}`}>
            {label}
          </p>
        )}

        <div>
          <select
            ref={ref}
            value={value}
            onChange={onChange}
            className={`bg-secondary rounded border border-[#66666690] outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text-[#666] ${styles}`}
            aria-invalid={error ? "true" : "false"}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {error && (
          <span className="text-xs text-[#f64949fe] mt-0.5 ">{error}</span>
        )}
      </div>
    );
  }
);

export default SelectInput;
