import React from "react";
import { useField, FieldConfig } from "formik";

export interface TextFieldProps extends FieldConfig<any> {
  label: string;
  help?: string;
  className?: string;
  required?: boolean;
  [x: string]: any;
}

const TextField: React.FC<TextFieldProps> = (props) => {
  const [field, meta] = useField(props);
  const { label, help, className, ...rest } = props;
  return (
    <div className="flex flex-col gap-3">
      <label
        htmlFor={props.name}
        className="text-gray-700 text-sm font-bold flex flex-col gap-3"
      >
        {label}
        <small className="text-gray-500 text-sm font-normal">{help}</small>
      </label>
      <input
        className={`py-3 px-6 text-gray-700 bg-gray-300 text-sm rounded-input ${className} ${
          meta.touched && meta.error && "outline outline-red"
        }`}
        {...field}
        {...rest}
        id={props.name}
      />
      {meta.touched && meta.error ? (
        <small className="text-red">{meta.error}</small>
      ) : (
        <small></small>
      )}
    </div>
  );
};
export default TextField;
