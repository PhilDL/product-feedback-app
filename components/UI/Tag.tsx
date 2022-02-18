import React from "react";

type Props = {
  selected?: boolean;
  [x: string]: any;
};

const Tag: React.FC<Props> = (props) => {
  const { children, selected, ...rest } = props;
  return (
    <a
      className={`py-1.5 px-3.5 font-semibold text-sm rounded hover:bg-gray-100-lighter ${
        selected
          ? "text-white bg-blue hover:bg-blue-light"
          : "text-blue bg-gray-100 hover:bg-gray-100-lighter"
      }`}
      {...rest}
    >
      {children}
    </a>
  );
};
export default Tag;
