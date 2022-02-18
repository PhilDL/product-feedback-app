import React from "react";

type Props = {
  role: string;
  className?: string;
  [x: string]: any;
};

const COLOR_ROLES: { [key: string]: string } = {
  primary: "bg-fushia hover:bg-fushia-light",
  secondary: "bg-blue hover:bg-blue-light",
  default: "bg-gray-700 hover:bg-gray-700-lighter",
  danger: "bg-red hover:bg-red-lighter",
};

const Button: React.FC<Props> = (props) => {
  const { children, role, className, ...rest } = props;
  const color = COLOR_ROLES[role] || COLOR_ROLES.default;
  return (
    <button
      className={`py-2.5 px-6 text-white font-bold text-sm rounded ${color} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
export default Button;
