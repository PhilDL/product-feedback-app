import React from "react";

type Props = {
  label: string;
  help: string;
  inputName: string;
  className: string;
  required?: boolean;
  errors: string[];
  [x: string]: any;
};

const TextField: React.FC<Props> = ({
  required = false,
  label,
  help,
  inputName,
  className,
  errors = [],
  ...rest
}) => {
  return (
    <div className="flex flex-col gap-3">
      <label
        htmlFor={inputName}
        className="text-gray-700 text-sm font-bold flex flex-col gap-3"
      >
        {label}
        <small className="text-gray-500 text-sm font-normal">{help}</small>
      </label>
      <input
        name={inputName}
        id={inputName}
        className={`py-3 px-6 text-gray-700 bg-gray-300 text-sm rounded-input ${className} ${
          errors.length > 0 && "outline outline-red"
        }`}
        required={required}
        {...rest}
      />
      <small className="text-red">{errors.join(",")}</small>
    </div>
  );
};
export default TextField;
