import React, { useState } from "react";
import {
  ListboxInput,
  ListboxButton,
  ListboxPopover,
  ListboxList,
  ListboxOption,
} from "@reach/listbox";

type Props = {
  options: { [key: string]: string };
  defaultValue: string;
  inputName: string;
  [x: string]: any;
  widthClassName?: string;
  help: string;
  label: string;
};

const SelectField: React.FC<Props> = ({
  options,
  defaultValue,
  widthClassName,
  inputName,
  help,
  label,
}) => {
  const [value, setValue] = useState(defaultValue);
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={inputName} className="text-gray-700 text-sm font-bold">
        {label}
      </label>
      <small className="text-gray-500 text-sm font-normal">{help}</small>
      <ListboxInput
        name={inputName}
        id={inputName}
        value={value}
        onChange={(value) => setValue(value)}
      >
        {({ value, valueLabel, isExpanded }) => (
          <>
            <ListboxButton
              className={`
              py-3 px-6 text-gray-700 bg-gray-300 
              text-sm rounded-input 
              flex gap-2 items-center 
              aria-expanded:outline-blue aria-expanded:outline
              ${widthClassName}`}
            >
              <span>{valueLabel}</span>
              <svg
                width="10"
                height="7"
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-blue inline ml-auto"
              >
                <path
                  d={isExpanded ? "M1 6l4-4 4 4" : "M1 1l4 4 4-4"}
                  strokeWidth="2"
                  fill="none"
                  fillRule="evenodd"
                />
              </svg>
            </ListboxButton>

            <ListboxPopover className="rounded shadow-xl mt-4">
              <ListboxList className="bg-white w-full text-gray-500 outline-transparent flex flex-col divide-y divide-gray-100-lighter">
                {Object.keys(options).map((option) => (
                  <ListboxOption
                    key={option}
                    value={option}
                    label={options[option]}
                    className="w-full px-5 py-3 flex justify-between 
                            items-center border-b-light-800 
                            hover:text-fushia aria-selected:text-fushia 
                            cursor-pointer"
                  >
                    <span>{options[option]}</span>{" "}
                    {value === option && <span className="text-fushia">✓</span>}
                  </ListboxOption>
                ))}
              </ListboxList>
            </ListboxPopover>
          </>
        )}
      </ListboxInput>
    </div>
  );
};
export default SelectField;
