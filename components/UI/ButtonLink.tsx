import React from "react";
export type Ref = HTMLAnchorElement;
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

const ButtonLink: React.FC<Props> = React.forwardRef<Ref, Props>(
  function ButtonLink(props, ref) {
    const { children, role, className, onClick, href, ...rest } = props;
    const color = COLOR_ROLES[role] || COLOR_ROLES.default;
    return (
      <a
        href={href}
        onClick={onClick}
        ref={ref}
        className={`py-2.5 px-6 text-white font-bold text-sm rounded ${color} ${className}`}
        {...rest}
      >
        {children}
      </a>
    );
  }
);
export default ButtonLink;
